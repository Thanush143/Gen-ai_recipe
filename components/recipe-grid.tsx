"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import RecipeCard from "./recipe-card"
import type { Recipe } from "@/types/recipe"

interface RecipeGridProps {
  recipes: Recipe[]
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  const [showAll, setShowAll] = useState(false)
  const displayedRecipes = showAll ? recipes : recipes.slice(0, 6)

  return (
    <div className="max-w-7xl mx-auto" id="recipes">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-charcoal dark:text-white mb-4">
          Your AI-Generated Recipes ({recipes.length})
        </h2>
        <p className="text-charcoal/70 dark:text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
          Discover amazing recipes crafted specifically for your ingredients. Each recipe includes detailed
          instructions, cooking tips, and video tutorials to help you create delicious meals.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {displayedRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <RecipeCard recipe={recipe} />
          </motion.div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {recipes.length > 6 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            size="lg"
            className="border-2 border-green-300 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 px-8 py-3 rounded-2xl font-semibold"
          >
            {showAll ? (
              <>
                <ChevronUp className="h-5 w-5 mr-2" />
                Show Less Recipes
              </>
            ) : (
              <>
                <ChevronDown className="h-5 w-5 mr-2" />
                Show {recipes.length - 6} More Recipes
              </>
            )}
          </Button>
        </motion.div>
      )}
    </div>
  )
}
