"use client"

import { MainLayout } from "@/components/main-layout"
import { Clock, CheckCircle2, FileText, Image as ImageIcon } from "lucide-react"

// Mock data for posts
const mockPosts = [
  {
    id: 1,
    content: "Just launched our new product! Check out the amazing features...",
    platforms: ["LinkedIn", "Twitter"],
    status: "published",
    date: "2024-03-15T10:30:00Z",
    image: true
  },
  {
    id: 2,
    content: "Excited to share our latest industry insights...",
    platforms: ["LinkedIn"],
    status: "draft",
    date: "2024-03-14T15:45:00Z",
    image: false
  },
  {
    id: 3,
    content: "Join us for our upcoming webinar on AI and business...",
    platforms: ["LinkedIn", "Twitter"],
    status: "pending",
    date: "2024-03-13T09:15:00Z",
    image: true
  }
]

const statusColors = {
  published: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
}

const statusIcons = {
  published: CheckCircle2,
  draft: FileText,
  pending: Clock
}

export default function RecentPosts() {
  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Recent Posts</h1>
        
        <div className="space-y-4">
          {mockPosts.map((post) => {
            const StatusIcon = statusIcons[post.status as keyof typeof statusIcons]
            return (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      {post.content}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <StatusIcon className="w-4 h-4" />
                        <span className={`px-2 py-1 rounded-full ${statusColors[post.status as keyof typeof statusColors]}`}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        {post.platforms.map((platform) => (
                          <span key={platform} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                            {platform}
                          </span>
                        ))}
                      </div>
                      {post.image && (
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                          <ImageIcon className="w-4 h-4" />
                          <span>Has image</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toISOString().split('T')[0]}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </MainLayout>
  )
} 