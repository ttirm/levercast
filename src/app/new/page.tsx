"use client"

import { MainLayout } from "@/components/main-layout"
import { useState, useEffect } from "react"
import { ImagePlus, Send } from "lucide-react"

export default function NewPost() {
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

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

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Create New Post</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Creation Panel */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                className="w-full h-48 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              
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
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  <span>Generate Previews</span>
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
                  {content || "Your post content will appear here..."}
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
                  {content || "Your tweet content will appear here..."}
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