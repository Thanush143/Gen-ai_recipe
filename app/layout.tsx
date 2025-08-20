import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { RecipeProvider } from "@/contexts/recipe-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Recipe Generator - AI-Powered Cooking Assistant",
  description:
    "Generate delicious recipes from your ingredients using AI. Get step-by-step instructions, images, and voice assistance.",
  keywords: "recipe generator, AI cooking, ingredients, food, cooking assistant",
  authors: [{ name: "Smart Recipe Generator" }],
  openGraph: {
    title: "Smart Recipe Generator - AI-Powered Cooking Assistant",
    description: "Generate delicious recipes from your ingredients using AI",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Recipe Generator",
    description: "AI-powered recipe generation from your ingredients",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <RecipeProvider>
            {children}
            <Toaster />
          </RecipeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
