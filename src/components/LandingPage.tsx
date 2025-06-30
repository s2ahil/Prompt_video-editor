import React from 'react';
import { ArrowRight, Zap, Scissors, Sparkles, Clock } from 'lucide-react';

interface LandingPageProps {
  onNavigateToEditor: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToEditor }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-white">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Fuck Video Editing
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Stop wrestling with timelines and confusing interfaces. Just tell us what you want, and we'll make it happen.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
            <Scissors className="w-8 h-8 text-blue-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Smart Trimming</h3>
            <p className="text-sm text-gray-300">Precise cuts with simple commands</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
            <Zap className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Speed Control</h3>
            <p className="text-sm text-gray-300">Speed up or slow down instantly</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-pink-400/50 transition-all duration-300 hover:scale-105">
            <Sparkles className="w-8 h-8 text-pink-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Audio Magic</h3>
            <p className="text-sm text-gray-300">Mute, enhance, or replace audio</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
            <Clock className="w-8 h-8 text-green-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold mb-2">Instant Export</h3>
            <p className="text-sm text-gray-300">MP4 ready in seconds</p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onNavigateToEditor}
          className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Start Editing Now
          <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
    </div>
  );
};

export default LandingPage;