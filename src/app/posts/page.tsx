"use client"

import { MainLayout } from "@/components/main-layout"
import { Clock, CheckCircle2, FileText, Image as ImageIcon } from "lucide-react"
import { mockPosts } from '@/lib/mockData';
import { PostCard } from '@/components/PostCard';

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

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Posts</h1>
        <p className="text-muted-foreground">Manage your content posts</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
} 