
import { GoogleGenAI, Type } from "@google/genai";
import { TripSuggestion } from '../types';

// This is a placeholder for the actual API key which is expected to be in the environment variables
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    console.warn("API_KEY environment variable not set. Using a placeholder. AI features will not work.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY_HERE" });

const availableCities = ['Mumbai', 'Pune', 'Bangalore', 'Chennai', 'Delhi', 'Jaipur', 'Hyderabad', 'Manali', 'Goa', 'Bhopal'];

export const getTripSuggestion = async (prompt: string): Promise<TripSuggestion | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Based on the following user request, suggest a bus trip route. The user is looking for a trip between two cities from this list: ${availableCities.join(', ')}.
            User request: "${prompt}"
            
            Your response must be a JSON object with the following structure: { "from": "string", "to": "string", "reasoning": "string" }.
            The "from" and "to" fields must be one of the available cities. The "reasoning" should be a short, friendly explanation of why this route fits the user's request.
            If you cannot determine a suitable route from the request, respond with a JSON object where "from", "to", and "reasoning" are all null.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        from: { type: Type.STRING, description: 'The starting city for the trip.' },
                        to: { type: Type.STRING, description: 'The destination city for the trip.' },
                        reasoning: { type: Type.STRING, description: 'A brief explanation for the suggestion.' }
                    },
                    required: ['from', 'to', 'reasoning']
                }
            }
        });

        const jsonStr = response.text.trim();
        const suggestion = JSON.parse(jsonStr) as TripSuggestion;
        
        // Final check to ensure cities are valid and not null
        if (suggestion.from && suggestion.to && availableCities.includes(suggestion.from) && availableCities.includes(suggestion.to)) {
            return suggestion;
        }

        return null;

    } catch (error) {
        console.error("Error fetching trip suggestion from Gemini:", error);
        return null;
    }
}
