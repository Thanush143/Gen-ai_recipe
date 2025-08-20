"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X, Sparkles, Mic, MicOff, Search, ChefHat, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useRecipe } from "@/contexts/recipe-context"
import { useToast } from "@/hooks/use-toast"
import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { INGREDIENT_LIST } from "@/data/ingredients"
import AIStatusIndicator from "./ai-status-indicator"

export default function IngredientInput() {
  const [currentIngredient, setCurrentIngredient] = useState("")
  const [ingredients, setIngredients] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [showCategoryIngredients, setShowCategoryIngredients] = useState(false)
  const { generateRecipes, isLoading } = useRecipe()
  const { toast } = useToast()
  const inputRef = useRef<HTMLInputElement>(null)

  const { isListening, transcript, startListening, stopListening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition()

  // Get unique categories
  const categories = Array.from(new Set(INGREDIENT_LIST.map((item) => item.category)))

  // Filter ingredients by search and category
  const getFilteredIngredients = () => {
    let filtered = INGREDIENT_LIST

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) => selectedCategories.includes(item.category))
    }

    if (currentIngredient.trim()) {
      const searchTerm = currentIngredient.toLowerCase()
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.aliases?.some((alias) => alias.toLowerCase().includes(searchTerm)) ||
          item.category.toLowerCase().includes(searchTerm),
      )
    }

    return filtered.slice(0, 12)
  }

  // Get ingredients for selected categories
  const getCategoryIngredients = () => {
    if (selectedCategories.length === 0) return []
    return INGREDIENT_LIST.filter((item) => selectedCategories.includes(item.category)).slice(0, 24)
  }

  // Update suggestions when input changes
  useEffect(() => {
    if (currentIngredient.trim().length > 0) {
      const filtered = getFilteredIngredients()
      setSuggestions(filtered.map((item) => item.name))
      setShowSuggestions(true)
      setShowCategoryIngredients(false)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
      setShowCategoryIngredients(selectedCategories.length > 0)
    }
  }, [currentIngredient, selectedCategories])

  // Handle voice recognition
  useEffect(() => {
    if (transcript && transcript !== currentIngredient) {
      setCurrentIngredient(transcript)
    }
  }, [transcript, currentIngredient])

  const addIngredient = (ingredient?: string) => {
    const ingredientToAdd = ingredient || currentIngredient.trim()
    if (ingredientToAdd && !ingredients.includes(ingredientToAdd)) {
      setIngredients([...ingredients, ingredientToAdd])
      setCurrentIngredient("")
      setSuggestions([])
      setShowSuggestions(false)
      resetTranscript()

      toast({
        title: "Ingredient added!",
        description: `${ingredientToAdd} has been added to your list.`,
      })
    }
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((i) => i !== ingredient))
    toast({
      title: "Ingredient removed",
      description: `${ingredient} has been removed from your list.`,
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (suggestions.length > 0) {
        addIngredient(suggestions[0])
      } else {
        addIngredient()
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
      setCurrentIngredient("")
    }
  }

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
      toast({
        title: "Voice recognition started",
        description: "Speak the ingredient name clearly.",
      })
    }
  }

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(newCategories)
    setShowCategoryIngredients(newCategories.length > 0 && !currentIngredient.trim())
  }

  const getPopularIngredients = () => {
    return INGREDIENT_LIST.filter((item) => item.popular).slice(0, 12)
  }

  const handleGenerateRecipes = async () => {
    if (ingredients.length === 0) {
      toast({
        title: "No ingredients added",
        description: "Please add at least one ingredient to generate recipes.",
        variant: "destructive",
      })
      return
    }

    try {
      await generateRecipes(ingredients)
      toast({
        title: "Recipes generated!",
        description: `Found delicious recipes using your ${ingredients.length} ingredients.`,
      })
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate recipes. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="max-w-6xl mx-auto" id="ingredients">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-white to-peach-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl p-6 md:p-8 border-2 border-peach-200 dark:border-gray-700 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 dark:bg-green-900/20 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-peach-200 dark:bg-peach-900/20 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl mb-4 shadow-lg"
            >
              <ChefHat className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-charcoal to-green-600 dark:from-white dark:to-green-400 bg-clip-text text-transparent mb-2">
              What's in your kitchen?
            </h2>
            <p className="text-charcoal/70 dark:text-gray-300 text-base md:text-lg mb-4">
              Select ingredients or type to search our extensive database
            </p>

            {/* AI Status Indicator */}
            <div className="flex justify-center">
              <AIStatusIndicator />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal/40 dark:text-gray-400 w-5 h-5" />
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search ingredients..."
                  value={currentIngredient}
                  onChange={(e) => setCurrentIngredient(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onFocus={() => {
                    if (currentIngredient.trim()) {
                      setShowSuggestions(true)
                      setShowCategoryIngredients(false)
                    }
                  }}
                  className="pl-12 pr-4 py-3 md:py-4 text-base md:text-lg border-2 border-peach-300 dark:border-gray-600 focus:border-green-400 dark:focus:border-green-400 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg"
                />

                {/* Voice Recognition Indicator */}
                {isListening && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                    className="absolute right-4 sm:right-16 top-1/2 transform -translate-y-1/2"
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  </motion.div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => addIngredient()}
                  disabled={!currentIngredient.trim()}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Plus className="h-5 w-5" />
                </Button>

                {browserSupportsSpeechRecognition && (
                  <Button
                    onClick={handleVoiceToggle}
                    variant={isListening ? "destructive" : "outline"}
                    className={`px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-lg flex-shrink-0 ${
                      isListening
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "border-2 border-peach-300 dark:border-gray-600 hover:bg-peach-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                )}
              </div>
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-peach-200 dark:border-gray-700 z-50 max-h-80 overflow-y-auto"
                >
                  <div className="p-2">
                    <div className="text-xs text-charcoal/60 dark:text-gray-400 px-4 py-2 font-medium">
                      Found {suggestions.length} ingredients
                    </div>
                    {suggestions.map((suggestion, index) => {
                      const ingredient = INGREDIENT_LIST.find((item) => item.name === suggestion)
                      return (
                        <motion.button
                          key={suggestion}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          onClick={() => addIngredient(suggestion)}
                          disabled={ingredients.includes(suggestion)}
                          className={`w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center gap-3 ${
                            ingredients.includes(suggestion)
                              ? "bg-green-50 dark:bg-green-900/20 opacity-75"
                              : "hover:bg-peach-50 dark:hover:bg-gray-700"
                          }`}
                        >
                          <span className="text-2xl">{ingredient?.emoji || "🥘"}</span>
                          <div>
                            <span className="text-charcoal dark:text-white font-medium">{suggestion}</span>
                            <div className="text-xs text-charcoal/60 dark:text-gray-400">{ingredient?.category}</div>
                          </div>
                          {ingredients.includes(suggestion) && (
                            <span className="ml-auto text-green-500 text-sm">✓ Added</span>
                          )}
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Category Filters */}
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-5 h-5 text-charcoal dark:text-white" />
              <h3 className="text-lg font-semibold text-charcoal dark:text-white">Filter by Category:</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  setSelectedCategories([])
                  setShowCategoryIngredients(false)
                }}
                variant={selectedCategories.length === 0 ? "default" : "outline"}
                size="sm"
                className={`rounded-full transition-all duration-300 ${
                  selectedCategories.length === 0
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105"
                    : "border-2 border-peach-300 dark:border-gray-600 hover:bg-peach-50 dark:hover:bg-gray-700"
                }`}
              >
                All Ingredients
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full transition-all duration-300 ${
                    selectedCategories.includes(category)
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg scale-105"
                      : "border-2 border-peach-300 dark:border-gray-600 hover:bg-peach-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Category Ingredients Display */}
          <AnimatePresence>
            {showCategoryIngredients && selectedCategories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-charcoal dark:text-white mb-3">
                  {selectedCategories.join(", ")} Ingredients - Click to Add:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-96 overflow-y-auto p-2 bg-white/50 dark:bg-gray-800/50 rounded-2xl">
                  {getCategoryIngredients().map((ingredient, index) => (
                    <motion.button
                      key={ingredient.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => addIngredient(ingredient.name)}
                      disabled={ingredients.includes(ingredient.name)}
                      className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-3 md:p-4 shadow-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                        ingredients.includes(ingredient.name)
                          ? "border-green-400 bg-green-50 dark:bg-green-900/20 opacity-75"
                          : "border-peach-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-400"
                      }`}
                    >
                      <div className="text-2xl md:text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {ingredient.emoji}
                      </div>
                      <div className="text-xs md:text-sm font-medium text-charcoal dark:text-white text-center">
                        {ingredient.name}
                      </div>
                      {ingredients.includes(ingredient.name) && (
                        <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Popular Ingredients */}
          <AnimatePresence>
            {!currentIngredient.trim() && selectedCategories.length === 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-charcoal dark:text-white mb-3">Popular Ingredients:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {getPopularIngredients().map((ingredient, index) => (
                    <motion.button
                      key={ingredient.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => addIngredient(ingredient.name)}
                      disabled={ingredients.includes(ingredient.name)}
                      className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-3 md:p-4 shadow-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                        ingredients.includes(ingredient.name)
                          ? "border-green-400 bg-green-50 dark:bg-green-900/20 opacity-75"
                          : "border-peach-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-400"
                      }`}
                    >
                      <div className="text-2xl md:text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {ingredient.emoji}
                      </div>
                      <div className="text-xs md:text-sm font-medium text-charcoal dark:text-white text-center">
                        {ingredient.name}
                      </div>
                      {ingredients.includes(ingredient.name) && (
                        <div className="absolute top-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Selected Ingredients */}
          {ingredients.length > 0 && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-charcoal dark:text-white">
                  Your Ingredients ({ingredients.length})
                </h3>
                <Button
                  onClick={() => setIngredients([])}
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Clear All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {ingredients.map((ingredient, index) => (
                  <motion.div
                    key={ingredient}
                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <Badge
                      variant="secondary"
                      className="text-sm md:text-base py-2 md:py-3 px-3 md:px-4 bg-gradient-to-r from-peach-100 to-peach-200 dark:from-gray-700 dark:to-gray-600 text-charcoal dark:text-white border-2 border-peach-300 dark:border-gray-600 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                    >
                      <span className="mr-2">
                        {INGREDIENT_LIST.find((item) => item.name === ingredient)?.emoji || "🥘"}
                      </span>
                      {ingredient}
                      <button
                        onClick={() => removeIngredient(ingredient)}
                        className="ml-2 md:ml-3 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30"
                      >
                        <X className="h-3 w-3 md:h-4 md:w-4" />
                      </button>
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Generate Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Button
              onClick={handleGenerateRecipes}
              disabled={isLoading || ingredients.length === 0}
              className="w-full bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white text-lg md:text-xl py-4 md:py-6 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 md:h-6 md:w-6 border-b-2 border-white"></div>
                  <span>Generating Amazing Recipes...</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 md:h-6 md:w-6" />
                  <span>Generate AI-Powered Recipes</span>
                  <Sparkles className="h-5 w-5 md:h-6 md:w-6" />
                </div>
              )}
            </Button>
          </motion.div>

          {/* Voice Recognition Status */}
          {isListening && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-full border border-red-200 dark:border-red-800">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Listening... Speak clearly</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
