import jsPDF from "jspdf"
import type { Recipe } from "@/types/recipe"

export async function downloadRecipePDF(recipe: Recipe) {
  try {
    const pdf = new jsPDF()
    const pageWidth = pdf.internal.pageSize.getWidth()
    const margin = 20
    let yPosition = margin

    // Title
    pdf.setFontSize(20)
    pdf.setFont("helvetica", "bold")
    pdf.text(recipe.title, margin, yPosition)
    yPosition += 15

    // Basic info
    pdf.setFontSize(12)
    pdf.setFont("helvetica", "normal")
    pdf.text(`Cooking Time: ${recipe.cookingTime}`, margin, yPosition)
    yPosition += 8
    pdf.text(`Servings: ${recipe.servings}`, margin, yPosition)
    yPosition += 15

    // Instructions
    pdf.setFontSize(14)
    pdf.setFont("helvetica", "bold")
    pdf.text("Instructions:", margin, yPosition)
    yPosition += 10

    pdf.setFontSize(11)
    pdf.setFont("helvetica", "normal")
    recipe.instructions.forEach((instruction, index) => {
      const text = `${index + 1}. ${instruction}`
      const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin)

      if (yPosition + lines.length * 6 > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage()
        yPosition = margin
      }

      pdf.text(lines, margin, yPosition)
      yPosition += lines.length * 6 + 5
    })

    // Precautions
    if (recipe.precautions) {
      yPosition += 10
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Precautions:", margin, yPosition)
      yPosition += 8

      pdf.setFontSize(11)
      pdf.setFont("helvetica", "normal")
      const precautionLines = pdf.splitTextToSize(recipe.precautions, pageWidth - 2 * margin)
      pdf.text(precautionLines, margin, yPosition)
      yPosition += precautionLines.length * 6
    }

    // Serving suggestions
    if (recipe.servingSuggestions) {
      yPosition += 10
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Serving Suggestions:", margin, yPosition)
      yPosition += 8

      pdf.setFontSize(11)
      pdf.setFont("helvetica", "normal")
      const servingLines = pdf.splitTextToSize(recipe.servingSuggestions, pageWidth - 2 * margin)
      pdf.text(servingLines, margin, yPosition)
    }

    pdf.save(`${recipe.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_recipe.pdf`)
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}
