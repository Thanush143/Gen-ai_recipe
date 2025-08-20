"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Recipe } from "@/types/recipe"
import { generateRecipesFromIngredients } from "@/lib/ai-service"

interface RecipeContextType {
  recipes: Recipe[]
  isLoading: boolean
  generateRecipes: (ingredients: string[]) => Promise<void>
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export function RecipeProvider({ children }: { children: ReactNode }) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const generateRecipes = async (ingredients: string[]) => {
    setIsLoading(true)
    try {
      const generatedRecipes = await generateRecipesFromIngredients(ingredients)
      setRecipes(generatedRecipes)
    } catch (error) {
      console.error("Failed to generate recipes:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return <RecipeContext.Provider value={{ recipes, isLoading, generateRecipes }}>{children}</RecipeContext.Provider>
}

export function useRecipe() {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error("useRecipe must be used within a RecipeProvider")
  }
  return context
}
