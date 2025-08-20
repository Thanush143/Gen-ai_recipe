"use client"

import { useState, useEffect, useCallback } from "react"

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const updateVoices = () => {
        setVoices(window.speechSynthesis.getVoices())
      }

      updateVoices()
      window.speechSynthesis.addEventListener("voiceschanged", updateVoices)

      return () => {
        window.speechSynthesis.removeEventListener("voiceschanged", updateVoices)
      }
    }
  }, [])

  const speak = useCallback(
    (text: string) => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        // Stop any ongoing speech
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)

        // Find a good voice (prefer English voices)
        const englishVoice =
          voices.find((voice) => voice.lang.startsWith("en") && voice.name.includes("Female")) ||
          voices.find((voice) => voice.lang.startsWith("en")) ||
          voices[0]

        if (englishVoice) {
          utterance.voice = englishVoice
        }

        utterance.rate = 0.9
        utterance.pitch = 1
        utterance.volume = 1

        utterance.onstart = () => setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        utterance.onerror = () => setIsSpeaking(false)

        window.speechSynthesis.speak(utterance)
      }
    },
    [voices],
  )

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }, [])

  return { speak, stop, isSpeaking, voices }
}
