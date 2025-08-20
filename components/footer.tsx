"use client"

import { motion } from "framer-motion"
import { Heart, Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="bg-white dark:bg-gray-900 border-t border-peach-200 dark:border-gray-700 mt-16"
      id="contact"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-charcoal dark:text-white mb-4">Smart Recipe Generator</h3>
            <p className="text-charcoal/70 dark:text-gray-300 mb-4">
              Transform your ingredients into delicious recipes with AI-powered suggestions. Get step-by-step
              instructions, cooking tips, and video tutorials for amazing meals.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/70 dark:text-gray-300 hover:text-green-500 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-charcoal/70 dark:text-gray-300 hover:text-green-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Features Section */}
          <div id="features">
            <h4 className="text-lg font-semibold text-charcoal dark:text-white mb-4">Features</h4>
            <ul className="space-y-2 text-charcoal/70 dark:text-gray-300">
              <li>🤖 AI-Powered Recipe Generation</li>
              <li>🎤 Voice Input & Assistant</li>
              <li>📱 Mobile Responsive Design</li>
              <li>📄 PDF Recipe Downloads</li>
              <li>🎥 YouTube Tutorial Links</li>
              <li>🌙 Dark Mode Support</li>
            </ul>
          </div>

          {/* How It Works Section */}
          <div id="how-it-works">
            <h4 className="text-lg font-semibold text-charcoal dark:text-white mb-4">How It Works</h4>
            <ol className="space-y-2 text-charcoal/70 dark:text-gray-300">
              <li>1. Add your ingredients</li>
              <li>2. Generate AI recipes</li>
              <li>3. Follow step-by-step instructions</li>
              <li>4. Watch tutorial videos</li>
              <li>5. Download recipes as PDF</li>
            </ol>
          </div>
        </div>

        <div className="border-t border-peach-200 dark:border-gray-700 mt-8 pt-8 text-center" id="about">
          <p className="text-charcoal/70 dark:text-gray-300 mb-4">
            Made with <Heart className="inline h-4 w-4 text-red-500 mx-1" /> for food lovers everywhere
          </p>
          <p className="text-sm text-charcoal/50 dark:text-gray-400">
            © 2024 Smart Recipe Generator. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
