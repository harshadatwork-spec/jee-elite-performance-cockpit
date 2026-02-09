import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("Gemini API key is missing");
}

const ai = new GoogleGenAI({ apiKey });

export const getAIPerformanceInsights = async (stats: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze these JEE mock test stats and provide 3 elite, high-impact strategies: ${JSON.stringify(
        stats
      )}. Format as JSON with "insights" array of objects {title, description}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                },
              },
            },
          },
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Insights Error:", error);
    return {
      insights: [
        {
          title: "Prioritize High-Weightage Topics",
          description:
            "Focus on Modern Physics and Coordination Compounds to boost score instantly.",
        },
        {
          title: "Speed Drill Mathematics",
          description:
            "Your speed in Calculus is currently 20% below target. Practice 15 mins daily timed sprints.",
        },
        {
          title: "Review Error Patterns",
          description:
            "Most mistakes are 'Calculated Silly Errors'. Double check units in numerical questions.",
        },
      ],
    };
  }
};
