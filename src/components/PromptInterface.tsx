import React, { useState } from 'react';
import { Send, Scissors, Zap, Palette, VolumeX } from 'lucide-react';

interface PromptInterfaceProps {
  onPromptSubmit: (prompt: string) => void;
  isProcessing: boolean;
}

const suggestedPrompts = [
  { icon: Scissors, text: "Trim the video from 0:30 to 1:45" },
  { icon: Zap, text: "Speed up the video by 2x" },
  { icon: Palette, text: "Slow down the video by 0.5x" },
  { icon: VolumeX, text: "Mute the audio" }
];

export const PromptInterface: React.FC<PromptInterfaceProps> = ({ 
  onPromptSubmit, 
  isProcessing 
}) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isProcessing) {
      onPromptSubmit(prompt.trim());
      setPrompt('');
    }
  };

  const handleSuggestedPrompt = (suggestedText: string) => {
    if (!isProcessing) {
      setPrompt(suggestedText);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Suggested Prompts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {suggestedPrompts.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                onClick={() => handleSuggestedPrompt(item.text)}
                disabled={isProcessing}
                className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="p-2 bg-blue-100 rounded-lg">
                  <IconComponent className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{item.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Prompt Input */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Prompt</h3>
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to do with your video..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={!prompt.trim() || isProcessing}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
            <span>{isProcessing ? 'Processing...' : 'Apply'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};