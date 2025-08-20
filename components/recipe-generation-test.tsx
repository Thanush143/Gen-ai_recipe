"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TestTube, Play, CheckCircle, XCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RecipeGenerationTest() {
  const [isTestRunning, setIsTestRunning] = useState(false)
  const [testResults, setTestResults] = useState<any>(null)
  const [testError, setTestError] = useState<string | null>(null)

  const runAITest = async () => {
    setIsTestRunning(true)
    setTestError(null)
    setTestResults(null)

    try {
      const testIngredients = ["chicken", "garlic", "tomatoes"]

      const startTime = Date.now()
      const response = await fetch("/api/generate-recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: testIngredients }),
      })

      const endTime = Date.now()
      const responseTime = endTime - startTime

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      setTestResults({
        success: true,
        responseTime,
        recipesGenerated: data.recipes?.length || 0,
        firstRecipeTitle: data.recipes?.[0]?.title || "No title",
        isAIGenerated: data.recipes?.[0]?.id?.includes("ai-recipe") || false,
        timestamp: new Date().toISOString(),
      })
    } catch (error) {
      setTestError(error instanceof Error ? error.message : "Unknown error occurred")
      setTestResults({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsTestRunning(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="h-5 w-5" />
          AI Generation Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={runAITest}
          disabled={isTestRunning}
          className="w-full"
          variant={testResults?.success ? "default" : "outline"}
        >
          {isTestRunning ? (
            <>
              <Clock className="h-4 w-4 mr-2 animate-spin" />
              Testing AI...
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Test AI Generation
            </>
          )}
        </Button>

        {testResults && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <div className="flex items-center gap-2">
              {testResults.success ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className={`font-medium ${testResults.success ? "text-green-600" : "text-red-600"}`}>
                {testResults.success ? "Test Passed!" : "Test Failed"}
              </span>
            </div>

            {testResults.success && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Response Time:</span>
                  <Badge variant="outline">{testResults.responseTime}ms</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Recipes Generated:</span>
                  <Badge variant="outline">{testResults.recipesGenerated}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>AI Generated:</span>
                  <Badge variant={testResults.isAIGenerated ? "default" : "secondary"}>
                    {testResults.isAIGenerated ? "Yes" : "Mock"}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 mt-2">Sample: "{testResults.firstRecipeTitle}"</div>
              </div>
            )}

            {testError && (
              <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded">Error: {testError}</div>
            )}

            <div className="text-xs text-gray-400">
              Tested at: {new Date(testResults.timestamp).toLocaleTimeString()}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
