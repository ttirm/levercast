"use client"

import { MainLayout } from "@/components/main-layout"
import { useState, useEffect } from "react"
import { ImagePlus, Send, Sparkles } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Template } from '@/lib/types'
import { useToast } from "@/hooks/use-toast"

export default function NewPost() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [rawContent, setRawContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<{
    linkedin?: string;
    twitter?: string;
  }>({})

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

  const handleTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const templateId = e.target.value
    setSelectedTemplate(templateId)
    // Clear generated content when template changes
    setGeneratedContent({})
  }

  const generateContent = async () => {
    if (!selectedTemplate || !rawContent.trim()) {
      toast({
        title: "Missing Information",
        description: "Please select a template and enter some content.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    const template = templates.find(t => t.id === selectedTemplate);
    
    if (!template) {
      toast({
        title: "Error",
        description: "Selected template not found.",
        variant: "destructive",
      });
      setIsGenerating(false);
      return;
    }

    try {
      const newGeneratedContent: { linkedin?: string; twitter?: string } = {};

      // Generate content for each platform
      for (const platformTemplate of template.platformTemplates) {
        const response = await fetch('/api/generate-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            templateId: selectedTemplate,
            platform: platformTemplate.platform,
            rawContent: rawContent,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to generate content for ${platformTemplate.platform}`);
        }

        const data = await response.json();
        if (platformTemplate.platform === 'LINKEDIN') {
          newGeneratedContent.linkedin = data.generatedContent;
        } else if (platformTemplate.platform === 'TWITTER') {
          newGeneratedContent.twitter = data.generatedContent;
        }
      }

      setGeneratedContent(newGeneratedContent);
      toast({
        title: "Content Generated",
        description: "Your content has been generated using the selected template.",
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }

  if (!isLoaded || !isSignedIn) {
    return null
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Create New Post</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Creation Panel */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              {/* Template Selector */}
              <div className="mb-4">
                <label htmlFor="template" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Template
                </label>
                <select
                  id="template"
                  value={selectedTemplate || ""}
                  onChange={handleTemplateChange}
                  className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 [&>option]:bg-gray-800 [&>option]:text-white"
                  disabled={isLoading}
                >
                  <option value="">Choose a template...</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.name} - {template.description || 'No description'}
                    </option>
                  ))}
                </select>
              </div>

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
                
                <button
                  onClick={generateContent}
                  disabled={isGenerating || !selectedTemplate || !rawContent.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Content</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            {/* LinkedIn Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">LinkedIn Preview</h2>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div>
                    <div className="font-medium dark:text-white">Your Name</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Your Title</div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {generatedContent.linkedin || "Generated LinkedIn content will appear here..."}
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

            {/* Twitter Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Twitter Preview</h2>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div>
                    <div className="font-medium dark:text-white">Your Name</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">@yourhandle</div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {generatedContent.twitter || "Generated Twitter content will appear here..."}
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
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 