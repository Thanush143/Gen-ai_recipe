"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Zap, ZapOff, AlertCircle, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AIStatusIndicator() {
  const [aiStatus, setAiStatus] = useState<"checking" | "available" | "unavailable">("checking")
  const [lastChecked, setLastChecked] = useState<Date | null>(null)

  useEffect(() => {
    // Check if AI is available by testing the API
    const checkAIStatus = async () => {
      try {
        const response = await fetch("/api/ai-status")
        if (response.ok) {
          const data = await response.json()
          setAiStatus(data.available ? "available" : "unavailable")
          setLastChecked(new Date())
        } else {
          setAiStatus("unavailable")
          setLastChecked(new Date())
        }
      } catch (error) {
        console.error("Failed to check AI status:", error)
        setAiStatus("unavailable")
        setLastChecked(new Date())
      }
    }

    checkAIStatus()

    // Check status every 5 minutes
    const interval = setInterval(checkAIStatus, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getStatusConfig = () => {
    switch (aiStatus) {
      case "available":
        return {
          icon: Zap,
          text: "AI Powered",
          color: "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/20 dark:text-green-400",
          description: "Real AI recipe generation active",
          pulse: true,
        }
      case "unavailable":
        return {
          icon: ZapOff,
          text: "Demo Mode",
          color: "bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400",
          description: "Using enhanced mock recipes",
          pulse: false,
        }
      default:
        return {
          icon: AlertCircle,
          text: "Checking...",
          color: "bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400",
          description: "Verifying AI availability",
          pulse: true,
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-2"
    >
      <motion.div
        animate={config.pulse ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: config.pulse ? Number.POSITIVE_INFINITY : 0 }}
      >
        <Badge className={`${config.color} border flex items-center gap-1 px-3 py-1`}>
          <Icon className="h-3 w-3" />
          {config.text}
          {aiStatus === "available" && <CheckCircle className="h-3 w-3 ml-1" />}
        </Badge>
      </motion.div>

      <div className="text-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">{config.description}</span>
        {lastChecked && (
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Last checked: {lastChecked.toLocaleTimeString()}
          </div>
        )}
      </div>
    </motion.div>
  )
}
