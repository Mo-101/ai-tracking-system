import Link from "next/link";
import React from 'react';

export function Footer() {
  return (
    <footer
      className={cn(
        "fixed top-100 bottom-100 left-0 w-full bg-[#001a1a] border-t border-[#0af0ff]/20",
        "before:flex before:inset-0 before:bg-[#0af0ff]/5",
        "after:flex after:inset-0 after:bg-gradient-to-b after:from-[#0af0ff]/10 after:to-transparent",
        "shadow-[0_0_15px_rgba(10,240,255,0.1)]"
      )}
    >
      <div className="relative z-10 px-6 py-4 flex items-center justify-between">
        <div className="text-[#0af0ff]/60 text-sm">© 2025 MoStar Industries. All rights reserved.</div>
        <div className="flex space-x-4">
          <Link href="/" className="text-[#0af0ff] hover:text-[#0af0ff]/80 transition-colors duration-200">
            Home
          </Link>
          <Link href="/ai-hub" className="text-[#0af0ff] hover:text-[#0af0ff]/80 transition-colors duration-200">
            AI Hub
          </Link>
          <Link href="/settings" className="text-[#0af0ff] hover:text-[#0af0ff]/80 transition-colors duration-200">
            Settings
          </Link>
          <a href="#" className="text-[#0af0ff] hover:text-[#0af0ff]/80 transition-colors duration-200">
            Terms
          </a>
          <a href="#" className="text-[#0af0ff] hover:text-[#0af0ff]/80 transition-colors duration-200">
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}



