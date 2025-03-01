"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../lib/utils";
import React from "react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "AI Hub", href: "/ai-hub" },
  { name: "Settings", href: "/settings" },
]

export function NavHeader() {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "relative bg-[#001a1a] border border-[#0af0ff]/20",
        "before:absolute before:inset-0 before:bg-[#0af0ff]/5",
        "after:absolute after:inset-0 after:bg-gradient-to-b after:from-[#0af0ff]/10 after:to-transparent",
        "shadow-[0_0_15px_rgba(10,240,255,0.1)]",
        "mb-1",
      )}
    >
      <div className="relative z-5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold text-[#0af0ff]">
            API Hub
          </Link>
          <div className="h-6 w-px bg-[#0af0ff]/20" />
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-[#0af0ff] hover:text-[#0af0ff]/80 transition-colors duration-200",
                  pathname === item.href && "underline",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-[#0af0ff] hover:text-[#0af0ff]/80 transition-colors duration-200">
            Notifications
          </button>
          <div className="h-6 w-px bg-[#0af0ff]/20" />
          <button className="text-[#0af0ff] hover:text-[#0af0ff]/80 transition-colors duration-200">Profile</button>
        </div>
      </div>
    </nav>
  )
}

