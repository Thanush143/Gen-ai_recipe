export interface Recipe {
  id: string
  title: string
  imageUrl?: string
  cookingTime: string
  servings: string
  instructions: string[]
  precautions?: string
  servingSuggestions?: string
  ingredients: string[]
  difficulty?: string
  cuisine?: string
  dietaryInfo?: string[]
}
