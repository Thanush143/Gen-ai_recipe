"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, Users, Download, Volume2, VolumeX, ChefHat, Play, Eye, EyeOff, Star, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Recipe } from "@/types/recipe"
import { useSpeechSynthesis } from "@/hooks/use-speech-synthesis"
import { downloadRecipePDF } from "@/utils/download"
import { useToast } from "@/hooks/use-toast"

interface RecipeCardProps {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)
  const { speak, stop, isSpeaking } = useSpeechSynthesis()
  const { toast } = useToast()

  const handleVoiceAssistant = () => {
    if (isSpeaking) {
      stop()
    } else {
      const textToSpeak = `Recipe: ${recipe.title}. 
        Cooking time: ${recipe.cookingTime}. 
        Serves: ${recipe.servings}. 
        ${recipe.difficulty ? `Difficulty: ${recipe.difficulty}.` : ""}
        ${recipe.cuisine ? `Cuisine: ${recipe.cuisine}.` : ""}
        Instructions: ${recipe.instructions.join(". ")}.
        ${recipe.precautions ? `Precautions: ${recipe.precautions}` : ""}
        ${recipe.servingSuggestions ? `Serving suggestions: ${recipe.servingSuggestions}` : ""}`

      speak(textToSpeak)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      await downloadRecipePDF(recipe)
      toast({
        title: "PDF Downloaded!",
        description: `${recipe.title} recipe has been saved as PDF.`,
      })
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download PDF. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getYouTubeSearchUrl = () => {
    const searchQuery = `how to make ${recipe.title} recipe cooking tutorial`
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`
  }

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "text-green-600 bg-green-50 dark:bg-green-900/20"
      case "medium":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
      case "hard":
        return "text-red-600 bg-red-50 dark:bg-red-900/20"
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden bg-white dark:bg-gray-800 border-2 border-peach-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative">
          {/* Recipe Image */}
          <div className="relative h-48 md:h-56 overflow-hidden">
            <img
              src={recipe.imageUrl || "/placeholder.svg?height=300&width=400&text=Delicious Recipe"}
              alt={recipe.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => setShowFullImage(!showFullImage)}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=300&width=400&text=Delicious Recipe"
              }}
            />

            {/* Image overlay controls */}
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setShowFullImage(!showFullImage)}
                className="bg-white/90 hover:bg-white text-charcoal backdrop-blur-sm"
              >
                {showFullImage ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>

            {/* Voice control button */}
            <div className="absolute top-2 left-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleVoiceAssistant}
                className={`backdrop-blur-sm transition-all duration-300 ${
                  isSpeaking
                    ? "bg-red-500/90 hover:bg-red-600 text-white animate-pulse"
                    : "bg-white/90 hover:bg-white text-charcoal"
                }`}
              >
                {isSpeaking ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                  >
                    <VolumeX className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Difficulty Badge */}
            {recipe.difficulty && (
              <div className="absolute bottom-2 left-2">
                <Badge className={`${getDifficultyColor(recipe.difficulty)} border-0`}>
                  <Star className="h-3 w-3 mr-1" />
                  {recipe.difficulty}
                </Badge>
              </div>
            )}

            {/* Cuisine Badge */}
            {recipe.cuisine && (
              <div className="absolute bottom-2 right-2">
                <Badge className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 border-0">
                  <Globe className="h-3 w-3 mr-1" />
                  {recipe.cuisine}
                </Badge>
              </div>
            )}
          </div>

          {/* Full Image Modal */}
          <AnimatePresence>
            {showFullImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                onClick={() => setShowFullImage(false)}
              >
                <motion.img
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  src={recipe.imageUrl || "/placeholder.svg?height=600&width=800&text=Delicious Recipe"}
                  alt={recipe.title}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <h3 className="text-lg md:text-xl font-bold text-charcoal dark:text-white line-clamp-2">{recipe.title}</h3>
            <ChefHat className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />
          </div>

          <div className="flex items-center gap-4 text-sm text-charcoal/70 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{recipe.cookingTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{recipe.servings}</span>
            </div>
          </div>

          {/* Dietary Info Tags */}
          {recipe.dietaryInfo && recipe.dietaryInfo.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {recipe.dietaryInfo.map((info, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {info}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-charcoal dark:text-white mb-2">Instructions:</h4>
              <div className="space-y-2">
                {recipe.instructions.slice(0, isExpanded ? undefined : 3).map((step, index) => (
                  <div key={index} className="flex gap-2">
                    <Badge variant="outline" className="min-w-[24px] h-6 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <p className="text-sm text-charcoal/80 dark:text-gray-300">{step}</p>
                  </div>
                ))}
              </div>

              {recipe.instructions.length > 3 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 text-green-600 hover:text-green-700"
                >
                  {isExpanded ? "Show Less" : `Show ${recipe.instructions.length - 3} More Steps`}
                </Button>
              )}
            </div>

            {recipe.precautions && (
              <div>
                <h4 className="font-semibold text-charcoal dark:text-white mb-2">⚠️ Precautions:</h4>
                <p className="text-sm text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 p-2 rounded">
                  {recipe.precautions}
                </p>
              </div>
            )}

            {recipe.servingSuggestions && (
              <div>
                <h4 className="font-semibold text-charcoal dark:text-white mb-2">🍽️ Serving Suggestions:</h4>
                <p className="text-sm text-charcoal/80 dark:text-gray-300 bg-green-50 dark:bg-green-900/20 p-2 rounded">
                  {recipe.servingSuggestions}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <Button
                onClick={handleDownloadPDF}
                size="sm"
                variant="outline"
                className="flex-1 border-green-300 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 bg-transparent"
              >
                <Download className="h-4 w-4 mr-1" />
                Download PDF
              </Button>

              <Button
                onClick={() => window.open(getYouTubeSearchUrl(), "_blank")}
                size="sm"
                variant="outline"
                className="flex-1 border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 bg-transparent"
              >
                <Play className="h-4 w-4 mr-1" />
                Watch Tutorial
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
