import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { QueryProvider } from "@/components/query-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dynamic Analytics",
  description: "A dashboard for Analytics data",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      className={`${inter.className} dark bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950 min-h-screen`}
      style={{ colorScheme: "dark" }}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <footer className="border-t bg-white/50 dark:bg-gray-900/50 py-4 text-center text-sm text-muted-foreground">
                <div className="container">
                  <p>
                    Dynamic Analytics - Data from{" "}
                    <a
                      href="https://jsonplaceholder.typicode.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      JSON Placeholder
                    </a>
                  </p>
                </div>
              </footer>
            </div>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
