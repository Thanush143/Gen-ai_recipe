import type { Recipe } from "@/types/recipe"

export async function generateRecipesFromIngredients(ingredients: string[]): Promise<Recipe[]> {
  try {
    const response = await fetch("/api/generate-recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    })

    if (!response.ok) {
      throw new Error("Failed to generate recipes")
    }

    const data = await response.json()
    return data.recipes
  } catch (error) {
    console.error("Error generating recipes:", error)
    throw error
  }
}
