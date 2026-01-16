
import { GoogleGenAI, Type } from "@google/genai";

// Always initialize with an object containing apiKey from process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getProcurementInsights = async (context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional procurement consultant. Based on the following procurement data, provide 3 actionable insights for cost reduction or efficiency improvement. Format as JSON.
      
      Data Context: ${context}`,
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
                  impact: { type: Type.STRING, description: 'High, Medium, or Low' }
                },
                required: ['title', 'description', 'impact']
              }
            }
          },
          required: ['insights']
        }
      }
    });

    // Use .text property directly to access the response string.
    return JSON.parse(response.text || '{"insights": []}');
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return { insights: [{ title: "Error", description: "Failed to load AI insights.", impact: "N/A" }] };
  }
};

export const chatWithAssistant = async (history: { role: string, parts: { text: string }[] }[], message: string) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: 'You are ProcureSmart AI, a specialist in supply chain management and procurement. Help the user with vendor selection, cost analysis, and procurement workflows. Be concise and professional.',
    }
  });

  // chat.sendMessage returns a GenerateContentResponse object.
  const response = await chat.sendMessage({ message });
  return response.text;
};
