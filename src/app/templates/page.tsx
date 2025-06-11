"use client"

import { MainLayout } from "@/components/main-layout"
import { Copy, Star } from "lucide-react"

// Mock data for templates
const mockTemplates = [
  {
    id: 1,
    name: "Product Launch",
    description: "Perfect for announcing new products or features",
    platforms: ["LinkedIn", "Twitter"],
    content: "🎉 Exciting news! We're thrilled to announce our latest [product/feature] that will revolutionize [industry/problem].\n\nKey benefits:\n• [Benefit 1]\n• [Benefit 2]\n• [Benefit 3]\n\nLearn more: [link]",
    isFavorite: true
  },
  {
    id: 2,
    name: "Industry Insights",
    description: "Share your expertise and thought leadership",
    platforms: ["LinkedIn"],
    content: "💡 Industry Insight: [Topic]\n\nIn today's rapidly evolving [industry], [observation/trend]. Here's why this matters:\n\n1. [Point 1]\n2. [Point 2]\n3. [Point 3]\n\nWhat are your thoughts on this? Let's discuss in the comments!",
    isFavorite: false
  },
  {
    id: 3,
    name: "Event Promotion",
    description: "Promote webinars, conferences, or meetups",
    platforms: ["LinkedIn", "Twitter"],
    content: "📅 Save the date! Join us for [Event Name] on [Date]\n\nWhat to expect:\n• [Highlight 1]\n• [Highlight 2]\n• [Highlight 3]\n\nRegister now: [link]\n\n#EventHashtag #IndustryHashtag",
    isFavorite: false
  }
]

export default function Templates() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Content Templates</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold dark:text-white">{template.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-yellow-500 transition-colors">
                  <Star className={`w-5 h-5 ${template.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                </button>
              </div>
              
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {template.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <pre className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {template.content}
                </pre>
                <button className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
} 