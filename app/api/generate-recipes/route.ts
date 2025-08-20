import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { Recipe } from "@/types/recipe"

export async function POST(request: NextRequest) {
  try {
    const { ingredients } = await request.json()

    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ error: "Ingredients array is required" }, { status: 400 })
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log("No OpenAI API key found, using enhanced mock recipes")
      return generateEnhancedMockRecipes(ingredients)
    }

    // Validate API key format
    if (!process.env.OPENAI_API_KEY.startsWith("sk-")) {
      console.log("Invalid API key format, using enhanced mock recipes")
      return generateEnhancedMockRecipes(ingredients)
    }

    try {
      console.log("Generating recipes with AI for ingredients:", ingredients)

      // Generate recipes using AI with text generation
      const { text } = await generateText({
        model: openai("gpt-3.5-turbo"), // Using a more reliable model
        prompt: `You are a professional chef and recipe creator. Create 4-6 diverse and delicious recipes using these ingredients: ${ingredients.join(", ")}.

IMPORTANT: Respond with ONLY a valid JSON object in this exact format (no markdown, no extra text):

{
  "recipes": [
    {
      "title": "Creative Recipe Name",
      "cookingTime": "X minutes",
      "servings": "X people", 
      "instructions": [
        "Detailed step 1",
        "Detailed step 2",
        "Detailed step 3",
        "Continue with 8-12 clear steps"
      ],
      "precautions": "Important safety tips and cooking warnings",
      "servingSuggestions": "How to serve and what pairs well with this dish",
      "difficulty": "Easy",
      "cuisine": "Italian",
      "dietaryInfo": ["Vegetarian", "Gluten-Free"]
    }
  ]
}

Requirements:
- Each recipe must use at least 3 of the provided ingredients: ${ingredients.join(", ")}
- Include recipes from different cuisines (Italian, Asian, Mexican, Mediterranean, etc.)
- Provide 8-12 detailed, easy-to-follow cooking steps for each recipe
- Include specific cooking times, temperatures, and techniques
- Add safety precautions where relevant (especially for meat, eggs, or high-heat cooking)
- Suggest creative serving ideas and food pairings
- Vary difficulty levels: Easy, Medium, Hard
- Consider dietary restrictions and add appropriate tags
- Make recipes practical for home cooking with common kitchen equipment
- Be creative but ensure recipes are achievable for home cooks

Focus on creating unique, flavorful recipes that make the most of the available ingredients.`,
        temperature: 0.7,
        maxTokens: 4000,
      })

      console.log("AI Response received, length:", text.length)

      // Parse the AI response
      let aiResponse
      try {
        // Clean the response - remove any markdown formatting or extra text
        let cleanedText = text.trim()

        // Remove markdown code blocks if present
        cleanedText = cleanedText.replace(/```json\s*/g, "").replace(/```\s*/g, "")

        // Find the JSON object in the response
        const jsonStart = cleanedText.indexOf("{")
        const jsonEnd = cleanedText.lastIndexOf("}") + 1

        if (jsonStart !== -1 && jsonEnd > jsonStart) {
          cleanedText = cleanedText.substring(jsonStart, jsonEnd)
        }

        console.log("Parsing cleaned JSON response...")
        aiResponse = JSON.parse(cleanedText)
        console.log("Successfully parsed AI response with", aiResponse.recipes?.length || 0, "recipes")
      } catch (parseError) {
        console.error("Failed to parse AI response:", parseError)
        console.log("Raw AI Response:", text.substring(0, 500) + "...")
        throw new Error("Invalid AI response format")
      }

      // Validate and transform AI response to match our Recipe interface
      if (!aiResponse.recipes || !Array.isArray(aiResponse.recipes)) {
        console.error("Invalid recipe format from AI:", aiResponse)
        throw new Error("Invalid recipe format from AI")
      }

      const recipes: Recipe[] = aiResponse.recipes.map((recipe: any, index: number) => {
        // Ensure all required fields have fallback values
        return {
          id: `ai-recipe-${Date.now()}-${index}`,
          title: recipe.title || `${ingredients[0]} Recipe ${index + 1}`,
          cookingTime: recipe.cookingTime || "30 minutes",
          servings: recipe.servings || "4 people",
          instructions:
            Array.isArray(recipe.instructions) && recipe.instructions.length > 0
              ? recipe.instructions
              : ["Prepare ingredients", "Cook according to recipe", "Season to taste", "Serve hot"],
          precautions:
            recipe.precautions ||
            "Follow standard cooking safety practices. Wash hands before and after handling ingredients.",
          servingSuggestions: recipe.servingSuggestions || "Serve hot and enjoy with your favorite sides!",
          ingredients: ingredients,
          imageUrl: `https://picsum.photos/400/300?random=${Date.now() + index}&blur=0`,
          difficulty: recipe.difficulty || "Medium",
          cuisine: recipe.cuisine || "International",
          dietaryInfo: Array.isArray(recipe.dietaryInfo) ? recipe.dietaryInfo : ["Homestyle"],
        }
      })

      console.log("Successfully generated", recipes.length, "AI recipes")
      return NextResponse.json({ recipes })
    } catch (aiError) {
      console.error("AI generation failed:", {
        error: aiError instanceof Error ? aiError.message : aiError,
        ingredients,
        timestamp: new Date().toISOString(),
      })
      console.log("Falling back to enhanced mock recipes")
      return generateEnhancedMockRecipes(ingredients)
    }
  } catch (error) {
    console.error("Error in recipe generation:", error)
    return NextResponse.json({ error: "Failed to generate recipes" }, { status: 500 })
  }
}

// Enhanced fallback function with more realistic recipes
function generateEnhancedMockRecipes(ingredients: string[]) {
  console.log("Using enhanced mock recipes for ingredients:", ingredients)

  const cuisineTypes = ["Italian", "Asian", "Mexican", "Mediterranean", "American", "Indian", "French"]
  const cookingMethods = ["Stir-fry", "Baked", "Grilled", "Sautéed", "Roasted", "Braised"]
  const difficulties = ["Easy", "Medium", "Hard"]

  const recipeTemplates = [
    {
      titleTemplate: (ingredient: string, method: string) => `${method} ${ingredient} with Herbs`,
      cuisineType: "Mediterranean",
      baseInstructions: [
        "Preheat your oven to 400°F (200°C) and line a baking sheet with parchment paper",
        "Wash and prepare all vegetables by cutting them into uniform pieces for even cooking",
        "In a large mixing bowl, toss the main ingredients with olive oil, salt, and pepper",
        "Add minced garlic, fresh herbs, and any additional seasonings to enhance flavor",
        "Arrange ingredients in a single layer on the prepared baking sheet, ensuring they don't overlap",
        "Roast in the preheated oven for 20-25 minutes, turning once halfway through cooking",
        "Check for doneness by testing with a fork - ingredients should be tender and lightly golden",
        "Remove from oven and let rest for 5 minutes before serving",
        "Garnish with fresh herbs and a drizzle of high-quality olive oil",
        "Serve immediately while hot, accompanied by your choice of sides",
      ],
    },
    {
      titleTemplate: (ingredient: string, method: string) => `Spicy ${ingredient} ${method}`,
      cuisineType: "Asian",
      baseInstructions: [
        "Heat a large wok or heavy-bottomed skillet over high heat until smoking",
        "Add oil and swirl to coat the entire surface of the pan evenly",
        "Add aromatics like ginger, garlic, and chilies, stir-frying for 30 seconds until fragrant",
        "Add the main protein or vegetables, cooking without stirring for 2-3 minutes to develop color",
        "Stir-fry ingredients rapidly, keeping them moving to prevent burning",
        "Create a sauce by combining soy sauce, rice wine, and seasonings in a small bowl",
        "Push ingredients to one side of the wok and pour in the sauce mixture",
        "Toss everything together, ensuring all ingredients are well-coated with sauce",
        "Add any quick-cooking vegetables or garnishes in the final minute",
        "Taste and adjust seasoning with salt, pepper, or additional sauce as needed",
        "Serve immediately over steamed rice or noodles while piping hot",
      ],
    },
    {
      titleTemplate: (ingredient: string, method: string) => `Rustic ${ingredient} Skillet`,
      cuisineType: "American",
      baseInstructions: [
        "Heat a large cast-iron skillet over medium-high heat until hot but not smoking",
        "Add a generous amount of oil or butter, allowing it to heat until shimmering",
        "Season the main ingredients generously with salt, pepper, and your favorite spices",
        "Carefully place ingredients in the hot skillet, leaving space between pieces",
        "Cook without moving for 4-5 minutes to develop a beautiful golden crust",
        "Flip or stir ingredients and continue cooking until evenly browned on all sides",
        "Add aromatics like onions, garlic, or herbs to build layers of flavor",
        "Deglaze the pan with wine, broth, or citrus juice, scraping up any browned bits",
        "Reduce heat to medium-low and simmer until ingredients are tender and sauce thickens",
        "Finish with fresh herbs, a pat of butter, or a splash of cream for richness",
        "Serve directly from the skillet for a rustic, homestyle presentation",
      ],
    },
    {
      titleTemplate: (ingredient: string, method: string) => `Creamy ${ingredient} Pasta`,
      cuisineType: "Italian",
      baseInstructions: [
        "Bring a large pot of salted water to a rolling boil for cooking pasta",
        "Add pasta to boiling water and cook according to package directions until al dente",
        "While pasta cooks, heat olive oil in a large skillet over medium heat",
        "Sauté garlic and onions until fragrant and translucent, about 3-4 minutes",
        "Add the main ingredients and cook until they begin to soften and release flavors",
        "Pour in cream or milk, bringing the mixture to a gentle simmer",
        "Season with salt, pepper, and Italian herbs like basil or oregano",
        "Reserve 1 cup of pasta cooking water before draining the pasta",
        "Add drained pasta to the skillet with the sauce, tossing to combine",
        "Use pasta water to adjust consistency, adding gradually until sauce coats pasta",
        "Remove from heat and stir in fresh herbs and grated Parmesan cheese",
        "Serve immediately in warmed bowls with additional cheese on the side",
      ],
    },
    {
      titleTemplate: (ingredient: string, method: string) => `Healthy ${ingredient} Bowl`,
      cuisineType: "Modern",
      baseInstructions: [
        "Prepare a base of quinoa or brown rice according to package instructions",
        "While grains cook, wash and chop all fresh vegetables into bite-sized pieces",
        "Heat a large skillet with a small amount of olive oil over medium-high heat",
        "Season the main ingredients with salt, pepper, and your favorite spices",
        "Cook the main ingredients until tender and lightly caramelized, about 8-10 minutes",
        "In a small bowl, whisk together a simple dressing with lemon juice and olive oil",
        "Add fresh herbs, minced garlic, and a touch of honey to the dressing",
        "Arrange the cooked grains in serving bowls as the base",
        "Top with the cooked ingredients and fresh vegetables in colorful sections",
        "Drizzle with the prepared dressing and add any desired toppings",
        "Garnish with seeds, nuts, or fresh herbs for extra texture and flavor",
        "Serve immediately while warm, or chill for a refreshing cold bowl",
      ],
    },
    {
      titleTemplate: (ingredient: string, method: string) => `Classic ${ingredient} Soup`,
      cuisineType: "Comfort Food",
      baseInstructions: [
        "In a large heavy-bottomed pot, heat olive oil over medium heat",
        "Add diced onions, carrots, and celery, cooking until softened, about 5-7 minutes",
        "Add minced garlic and cook for another minute until fragrant",
        "Add the main ingredients and cook, stirring occasionally, for 5 minutes",
        "Pour in enough broth to cover ingredients by 2 inches",
        "Add bay leaves, thyme, and other herbs, then bring to a boil",
        "Reduce heat to low and simmer partially covered for 25-30 minutes",
        "Taste and season with salt and pepper as needed",
        "For a thicker soup, mash some ingredients against the side of the pot",
        "Remove bay leaves and adjust consistency with more broth if needed",
        "Ladle into bowls and garnish with fresh herbs or a dollop of cream",
        "Serve hot with crusty bread or crackers on the side",
      ],
    },
  ]

  const recipes: Recipe[] = recipeTemplates.map((template, index) => {
    const mainIngredient = ingredients[index % ingredients.length]
    const method = cookingMethods[index % cookingMethods.length]
    const cuisine = template.cuisineType
    const difficulty = difficulties[index % difficulties.length]

    // Customize instructions based on ingredients
    const customizedInstructions = template.baseInstructions.map((instruction) => {
      return instruction
        .replace(/main ingredients?/gi, mainIngredient)
        .replace(/ingredients/gi, ingredients.slice(0, 3).join(", "))
    })

    return {
      id: `enhanced-recipe-${Date.now()}-${index}`,
      title: template.titleTemplate(mainIngredient, method),
      cookingTime: `${25 + index * 5} minutes`,
      servings: `${3 + (index % 3)} people`,
      instructions: customizedInstructions,
      precautions: generatePrecautions(mainIngredient, method),
      servingSuggestions: generateServingSuggestions(cuisine, mainIngredient),
      ingredients: ingredients,
      imageUrl: `https://picsum.photos/400/300?random=${Date.now() + index}&blur=0`,
      difficulty,
      cuisine,
      dietaryInfo: generateDietaryInfo(ingredients, cuisine),
    }
  })

  return NextResponse.json({ recipes })
}

function generatePrecautions(ingredient: string, method: string): string {
  const precautionMap: Record<string, string> = {
    chicken:
      "Ensure chicken reaches internal temperature of 165°F (74°C). Wash hands and surfaces after handling raw chicken.",
    beef: "Cook to desired doneness but ensure minimum internal temperature of 145°F (63°C) for safety.",
    fish: "Cook until fish flakes easily with a fork. Fresh fish should smell like the ocean, not 'fishy'.",
    eggs: "Use fresh eggs and cook thoroughly. Avoid cross-contamination with other ingredients.",
    mushrooms: "Clean mushrooms gently with a damp cloth. Never eat wild mushrooms unless identified by an expert.",
    default:
      "Always wash hands before cooking. Keep hot foods hot and cold foods cold. Taste and adjust seasoning gradually.",
  }

  const key = Object.keys(precautionMap).find((key) => ingredient.toLowerCase().includes(key)) || "default"

  return precautionMap[key]
}

function generateServingSuggestions(cuisine: string, ingredient: string): string {
  const suggestions: Record<string, string> = {
    Italian: `Serve with crusty Italian bread and a glass of Chianti. Garnish with fresh basil and extra Parmesan cheese.`,
    Asian: `Perfect with steamed jasmine rice and a side of pickled vegetables. Garnish with sesame seeds and green onions.`,
    Mexican: `Serve with warm tortillas, lime wedges, and fresh cilantro. Add avocado slices and hot sauce on the side.`,
    Mediterranean: `Pair with warm pita bread, olives, and a Greek salad. Drizzle with extra virgin olive oil and lemon juice.`,
    American: `Great with mashed potatoes or roasted vegetables. Serve with a crisp green salad and dinner rolls.`,
    Indian: `Serve with basmati rice and naan bread. Accompany with yogurt raita and mango chutney.`,
    French: `Pair with a crusty baguette and a glass of French wine. Serve with a simple green salad dressed with vinaigrette.`,
    Modern: `Serve in a bowl with additional toppings like avocado, nuts, or seeds. Perfect for meal prep and healthy eating.`,
    "Comfort Food": `Serve hot with crusty bread or crackers. Perfect for cold days and pairs well with a warm beverage.`,
  }

  return suggestions[cuisine] || suggestions["American"]
}

function generateDietaryInfo(ingredients: string[], cuisine: string): string[] {
  const info: string[] = []

  const vegetarianIngredients = [
    "vegetables",
    "cheese",
    "eggs",
    "milk",
    "pasta",
    "rice",
    "beans",
    "lentils",
    "quinoa",
    "tofu",
  ]
  const glutenFreeIngredients = ["rice", "quinoa", "vegetables", "meat", "fish", "eggs", "potatoes"]

  const hasVegetarian = ingredients.some((ing) =>
    vegetarianIngredients.some((vegIng) => ing.toLowerCase().includes(vegIng)),
  )

  const hasGlutenFree = ingredients.some((ing) =>
    glutenFreeIngredients.some((gfIng) => ing.toLowerCase().includes(gfIng)),
  )

  const hasMeat = ingredients.some((ing) =>
    ["chicken", "beef", "pork", "fish", "meat", "turkey", "lamb"].some((meat) => ing.toLowerCase().includes(meat)),
  )

  if (hasVegetarian && !hasMeat) {
    info.push("Vegetarian")
  }

  if (
    hasGlutenFree &&
    !ingredients.some((ing) =>
      ["wheat", "flour", "pasta", "bread"].some((gluten) => ing.toLowerCase().includes(gluten)),
    )
  ) {
    info.push("Gluten-Free")
  }

  if (cuisine === "Mediterranean" || cuisine === "Modern") {
    info.push("Heart Healthy")
  }

  if (
    ingredients.some((ing) => ["spicy", "chili", "pepper", "hot"].some((spice) => ing.toLowerCase().includes(spice)))
  ) {
    info.push("Spicy")
  }

  if (cuisine === "Modern") {
    info.push("Nutritious")
  }

  return info.length > 0 ? info : ["Homestyle"]
}
