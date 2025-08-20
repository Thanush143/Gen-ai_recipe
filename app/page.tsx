"use client"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import IngredientInput from "@/components/ingredient-input"
import RecipeGrid from "@/components/recipe-grid"
import LoadingSkeleton from "@/components/loading-skeleton"
import RecipeGenerationTest from "@/components/recipe-generation-test"
import { useRecipe } from "@/contexts/recipe-context"

export default function Home() {
  const { recipes, isLoading } = useRecipe()

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 relative"
        >
          {/* Floating background elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-1/4 w-16 h-16 md:w-20 md:h-20 bg-green-200 dark:bg-green-800/30 rounded-full opacity-20 -z-10"
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-10 right-1/3 w-12 h-12 md:w-16 md:h-16 bg-peach-300 dark:bg-peach-800/30 rounded-full opacity-20 -z-10"
          />

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-7xl font-black bg-gradient-to-r from-green-600 via-green-500 to-peach-500 dark:from-green-400 dark:via-green-300 dark:to-peach-400 bg-clip-text text-transparent mb-4 md:mb-6 leading-tight"
          >
            Smart Recipe Generator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-xl lg:text-2xl text-charcoal/80 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Transform your ingredients into{" "}
            <span className="font-bold text-green-600 dark:text-green-400">delicious recipes</span> with AI-powered
            suggestions, complete with <span className="font-bold text-peach-600 dark:text-peach-400">images</span> and
            <span className="font-bold text-green-600 dark:text-green-400"> voice assistance</span>.
          </motion.p>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6 md:mt-8 px-4"
          >
            {["🎤 Voice Input", "📱 Mobile Friendly", "🤖 AI Powered", "📄 PDF Export", "🎥 Video Tutorials"].map(
              (feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 md:px-4 py-2 rounded-full border border-peach-200 dark:border-gray-600 shadow-lg"
                >
                  <span className="text-xs md:text-sm font-medium text-charcoal dark:text-white">{feature}</span>
                </motion.div>
              ),
            )}
          </motion.div>
        </motion.div>

        {/* Ingredient Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <IngredientInput />
        </motion.div>

        {/* AI Test Component - Only show when no recipes are generated */}
        {!isLoading && recipes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8 md:mb-12 flex justify-center"
          >
            <RecipeGenerationTest />
          </motion.div>
        )}

        {/* Recipe Results */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : recipes.length > 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
            <RecipeGrid recipes={recipes} />
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8 md:py-12">
            <div className="text-4xl md:text-6xl mb-4">🍳</div>
            <h3 className="text-lg md:text-xl font-semibold text-charcoal dark:text-white mb-2">
              Ready to Cook Something Amazing?
            </h3>
            <p className="text-charcoal/70 dark:text-gray-300 px-4">
              Enter your ingredients above to get started with AI-powered recipe suggestions!
            </p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}
