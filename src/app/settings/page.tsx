"use client"

import { MainLayout } from "@/components/main-layout"
import { Linkedin, Twitter, Globe, Bell, User, Shield } from "lucide-react"

// Mock data for settings
const mockSettings = {
  profile: {
    name: "John Doe",
    title: "CEO & Founder",
    company: "TechCorp",
    bio: "Building the future of social media management"
  },
  socialConnections: [
    {
      platform: "LinkedIn",
      icon: Linkedin,
      connected: true,
      username: "johndoe"
    },
    {
      platform: "Twitter",
      icon: Twitter,
      connected: true,
      username: "@johndoe"
    }
  ],
  preferences: {
    defaultPlatforms: ["LinkedIn", "Twitter"],
    notifications: true,
    autoSave: true,
    theme: "dark"
  }
}

export default function Settings() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Settings</h1>
        
        {/* Profile Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold dark:text-white">{mockSettings.profile.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">{mockSettings.profile.title} at {mockSettings.profile.company}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                defaultValue={mockSettings.profile.bio}
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows={3}
              />
            </div>
          </div>
        </div>
        
        {/* Social Media Connections */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Social Media Connections</h2>
          <div className="space-y-4">
            {mockSettings.socialConnections.map((connection) => {
              const Icon = connection.icon
              return (
                <div
                  key={connection.platform}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium dark:text-white">{connection.platform}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{connection.username}</div>
                    </div>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg ${
                      connection.connected
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {connection.connected ? "Connected" : "Connect"}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="font-medium dark:text-white">Notifications</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Get notified about post status</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={mockSettings.preferences.notifications} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-500"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="font-medium dark:text-white">Auto-save Drafts</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Automatically save your work</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={mockSettings.preferences.autoSave} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 