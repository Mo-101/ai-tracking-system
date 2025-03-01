import "@/styles/globals.css"
import { NavHeader } from "../components/nav-header"
import React from "react";

export default function RootLayout({
    children,
    }: {
      children: React.ReactNode;
    }) {
return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-[#050c0d] text-white font-mono antialiased flex flex-col min-h-screen">
        <NavHeader />  {/* ✅ Ensure this is at the top */}

        <main className="flex-1 overflow-hidden">{children}</main>  {/* ✅ This allows content to expand */}

        <footer className="w-full bg-[#0a0a0a] text-yellow p-2 text-center fixed bottom-0 left-0 right-0">
          <p className="text-xs">© 2025 MoStar Industries. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
