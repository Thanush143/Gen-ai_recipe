import { NextResponse } from "next/server"

export async function GET() {
  // Check if OpenAI API key is configured
  const hasOpenAI = !!process.env.OPENAI_API_KEY

  // Additional validation - check if the key looks valid
  const keyIsValid = hasOpenAI && process.env.OPENAI_API_KEY!.startsWith("sk-")

  return NextResponse.json({
    available: keyIsValid,
    provider: keyIsValid ? "OpenAI GPT-4" : "Enhanced Mock",
    message: keyIsValid
      ? "Real AI recipe generation is active with OpenAI GPT-4"
      : hasOpenAI
        ? "Invalid API key format - should start with 'sk-'"
        : "Add OPENAI_API_KEY environment variable to enable real AI generation",
    timestamp: new Date().toISOString(),
    keyPresent: hasOpenAI,
    keyValid: keyIsValid,
  })
}
