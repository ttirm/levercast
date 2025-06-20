"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LayoutTemplate,
  ChevronLeft,
  ChevronRight,
  User
} from "lucide-react"
import { UserButton, SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs"

const navigation = [
  { name: "New Post", href: "/new", icon: FileText },
  { name: "Recent Posts", href: "/posts", icon: LayoutDashboard },
  { name: "Templates", href: "/templates", icon: LayoutTemplate },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={`flex flex-col h-full bg-gray-900 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} border-r border-gray-800`}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && <h1 className="text-xl font-bold">Levercast</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <SignedIn>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-2 py-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-yellow-500 text-gray-900' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="w-6 h-6" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            )
          })}
        </nav>
      </SignedIn>

      <div className="p-4 border-t border-gray-800">
        <SignedIn>
          <div className="flex items-center">
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonBox: "flex items-center w-full",
                  userButtonTrigger: "flex items-center w-full px-2 py-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white",
                  userButtonAvatarBox: "w-6 h-6",
                  userButtonPopoverCard: "bg-gray-900 border border-gray-800",
                  userButtonPopoverActionButton: "text-gray-300 hover:bg-gray-800 hover:text-white",
                  userButtonPopoverActionButtonText: "text-gray-300",
                  userButtonPopoverFooter: "border-t border-gray-800"
                }
              }}
            />
            {!collapsed && <span className="ml-3 text-gray-300">Profile</span>}
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex flex-col gap-2">
            <SignInButton mode="modal">
              <button className="flex items-center w-full px-2 py-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                <User className="w-6 h-6" />
                {!collapsed && <span className="ml-3">Sign In</span>}
              </button>
            </SignInButton>
            {!collapsed && (
              <SignUpButton mode="modal">
                <button className="flex items-center w-full px-2 py-2 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white">
                  <span className="ml-9">Sign Up</span>
                </button>
              </SignUpButton>
            )}
          </div>
        </SignedOut>
      </div>
    </div>
  )
} 