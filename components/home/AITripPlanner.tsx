
import React, { useState } from 'react';
import { getTripSuggestion } from '../../services/geminiService';
import { TripSuggestion } from '../../types';

interface AITripPlannerProps {
    onSuggestionSelect: (from: string, to: string) => void;
}

export const AITripPlanner: React.FC<AITripPlannerProps> = ({ onSuggestionSelect }) => {
    const [prompt, setPrompt] = useState('');
    const [suggestion, setSuggestion] = useState<TripSuggestion | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGetSuggestion = async () => {
        if (!prompt.trim()) return;
        setIsLoading(true);
        setError(null);
        setSuggestion(null);

        const result = await getTripSuggestion(prompt);

        if (result) {
            setSuggestion(result);
        } else {
            setError("Sorry, I couldn't find a suitable route for your request. Please try being more specific.");
        }
        setIsLoading(false);
    };

    const handleUseRoute = () => {
        if (suggestion) {
            onSuggestionSelect(suggestion.from, suggestion.to);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 mb-6 animate-fade-in-down">
            <div className="flex items-center gap-4 mb-4">
                 <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-brand-light text-brand-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor"><path d="M15 15.25a3.25 3.25 0 1 0 0-6.5a3.25 3.25 0 0 0 0 6.5ZM10.5 6a2 2 0 1 0 0-4a2 2 0 0 0 0 4ZM6 10.5a2 2 0 1 0-4 0a2 2 0 0 0 4 0ZM19.5 10.5a2 2 0 1 0-4 0a2 2 0 0 0 4 0ZM10.5 18a2 2 0 1 0 0 4a2 2 0 0 0 0-4Z"/></svg>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-gray-800">AI Trip Planner</h3>
                    <p className="text-gray-500">Describe your ideal trip and let our AI suggest a route for you!</p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., a quiet weekend getaway from Delhi"
                    className="w-full px-4 py-3 border border-gray-200 bg-gray-50 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
                    disabled={isLoading}
                />
                <button
                    onClick={handleGetSuggestion}
                    disabled={isLoading || !prompt.trim()}
                    className="flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-md disabled:bg-gray-300 disabled:scale-100 disabled:shadow-none"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Thinking...
                        </>
                    ) : (
                        <span>Get Suggestion</span>
                    )}
                </button>
            </div>

            {suggestion && !isLoading && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                    <p className="text-sm font-semibold text-green-800">Here's my suggestion:</p>
                    <p className="text-gray-700 mt-1">{suggestion.reasoning}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3">
                        <div className="font-mono text-lg py-2 px-3 bg-white rounded-md border border-gray-200">
                            {suggestion.from} → {suggestion.to}
                        </div>
                        <button onClick={handleUseRoute} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition">
                            Use this Route
                        </button>
                    </div>
                </div>
            )}

            {error && !isLoading && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 animate-fade-in">
                    {error}
                </div>
            )}
        </div>
    );
};
