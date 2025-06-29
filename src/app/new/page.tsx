"use client"

import { MainLayout } from "@/components/main-layout"
import { useState, useEffect } from "react"
import { ImagePlus, Send, Sparkles, AlertCircle } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Template, Platform } from '@/lib/types'
import { useToast } from "@/hooks/use-toast"
import { useContentGeneration } from "@/hooks/useContentGeneration"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

const PLATFORM_OPTIONS: { label: string; value: Platform }[] = [
  { label: "LinkedIn", value: "LINKEDIN" },
  { label: "Twitter", value: "TWITTER" },
];

export default function NewPost() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { generateContent, isLoading: isGenerating, error, clearError } = useContentGeneration()
  const [rawContent, setRawContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [generatingPlatform, setGeneratingPlatform] = useState<Platform | null>(null)
  const [selectedTemplates, setSelectedTemplates] = useState<{ [platform in Platform]?: string }>({})
  const [generatedContent, setGeneratedContent] = useState<{ [platform in Platform]?: string }>({})

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in')
    }
  }, [isLoaded, isSignedIn, router])

  // Fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/templates');
        if (!response.ok) throw new Error('Failed to fetch templates');
        const data = await response.json();
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
        toast({
          title: "Error",
          description: "Failed to load templates. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isSignedIn) {
      fetchTemplates();
    }
  }, [isSignedIn, toast]);

  useEffect(() => {
    if (image) {
      const url = URL.createObjectURL(image)
      setImagePreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [image])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleTemplateChange = (platform: Platform, templateId: string) => {
    setSelectedTemplates((prev) => ({ ...prev, [platform]: templateId }))
    setGeneratedContent((prev) => ({ ...prev, [platform]: undefined }))
    clearError() // Clear any previous errors when template changes
  }

  const handleGenerateContent = async (platform: Platform) => {
    const templateId = selectedTemplates[platform];
    if (!templateId || !rawContent.trim()) {
      toast({
        title: "Missing Information",
        description: `Please select a template for ${platform} and enter some content.`,
        variant: "destructive",
      });
      return;
    }

    setGeneratingPlatform(platform);
    clearError();

    try {
      const generatedContent = await generateContent({
        templateId,
        platform,
        rawContent,
      });
      
      setGeneratedContent((prev) => ({ ...prev, [platform]: generatedContent }));
      toast({
        title: "Content Generated",
        description: `Your content has been generated for ${platform}.`,
      });
    } catch (error) {
      console.error('Error generating content:', error);
      // Error is already handled by the hook and displayed via the error state
    } finally {
      setGeneratingPlatform(null);
    }
  }

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Create New Post</h1>
        
        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Creation Panel */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              {/* Template Selectors for each platform */}
              {PLATFORM_OPTIONS.map(({ label, value }) => (
                <div className="mb-4" key={value}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {label} Template
                  </label>
                  <Select
                    value={selectedTemplates[value] || ""}
                    onValueChange={(templateId) => handleTemplateChange(value, templateId)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={`Choose a ${label} template...`} />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.filter(t => t.platform === value).map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name} - {template.description || 'No description'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
              <div className="mb-4">
                <label htmlFor="raw-content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Raw Content
                </label>
                <textarea
                  id="raw-content"
                  value={rawContent}
                  onChange={(e) => setRawContent(e.target.value)}
                  placeholder="Write your raw content here... This will be transformed using your selected template."
                  className="w-full h-48 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center gap-2 text-gray-600 dark:text-gray-300 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <ImagePlus className="w-5 h-5" />
                  <span>Add Image</span>
                </label>
                <div className="flex gap-2">
                  {PLATFORM_OPTIONS.map(({ label, value }) => (
                    <button
                      key={value}
                      onClick={() => handleGenerateContent(value)}
                      disabled={isGenerating || generatingPlatform === value || !selectedTemplates[value] || !rawContent.trim()}
                      className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {generatingPlatform === value ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                          <span>Generating {label}...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Generate {label}</span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Preview Panel */}
          <div className="space-y-6">
            {PLATFORM_OPTIONS.map(({ label, value }) => (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4" key={value}>
                <h2 className="text-lg font-semibold mb-4 dark:text-white">{label} Preview</h2>
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div>
                      <div className="font-medium dark:text-white">Your Name</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{label === 'Twitter' ? '@yourhandle' : 'Your Title'}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {generatedContent[value] || `Generated ${label} content will appear here...`}
                  </p>
                  {imagePreview && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 