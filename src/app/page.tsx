import { MainLayout } from "@/components/main-layout"

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 dark:text-white">
          Welcome to Levercast
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Effortlessly capture, format, and share your content ideas across multiple social media platforms.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Quick Start</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Click "New Post" to create content</li>
              <li>• Use templates to format your posts</li>
              <li>• Preview how your content will look</li>
              <li>• Publish to multiple platforms</li>
            </ul>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Features</h2>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Multi-platform content creation</li>
              <li>• Smart templates powered by AI</li>
              <li>• Real-time previews</li>
              <li>• One-click publishing</li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
