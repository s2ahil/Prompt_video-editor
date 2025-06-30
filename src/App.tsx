import React, { useState, useEffect } from 'react';
import { VideoUploader } from './components/VideoUploader';
import { VideoPreview } from './components/VideoPreview';
import { PromptInterface } from './components/PromptInterface';
import { ProcessingStatus } from './components/ProcessingStatus';
import { VideoProcessor } from './utils/ffmpegUtils';
import { Film, Sparkles } from 'lucide-react';
import LandingPage from './components/LandingPage';

function App() {
  const [videoProcessor] = useState(() => new VideoProcessor());
  const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
  const [originalVideo, setOriginalVideo] = useState<File | null>(null);
  const [originalVideoUrl, setOriginalVideoUrl] = useState<string>('');
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<'landing' | 'editor'>('landing');

  useEffect(() => {
    const initializeFFmpeg = async () => {
      try {
        await videoProcessor.initialize();
        setIsFFmpegLoaded(true);
      } catch (err) {
        setError('Failed to initialize video processor. Please refresh the page.');
        console.error('FFmpeg initialization error:', err);
      }
    };
    initializeFFmpeg();
  }, [videoProcessor]);

  const handleVideoSelect = (file: File) => {
    setOriginalVideo(file);
    setOriginalVideoUrl(URL.createObjectURL(file));
    setProcessedVideoUrl('');
    setError('');
    setSuccess('');
  };

  const handlePromptSubmit = async (prompt: string) => {
    if (!originalVideo || !isFFmpegLoaded) return;
    setIsProcessing(true);
    setError('');
    setSuccess('');
    setCurrentOperation('Initializing...');
    try {
      const processedBlob = await videoProcessor.processVideo(
        originalVideo,
        prompt,
        (message) => setCurrentOperation(message)
      );
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedVideoUrl(processedUrl);
      setSuccess('Video processed successfully!');
    } catch (err) {
      setError(`Processing failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      console.error('Video processing error:', err);
    } finally {
      setIsProcessing(false);
      setCurrentOperation('');
    }
  };

  const handleDownload = () => {
    if (processedVideoUrl) {
      const a = document.createElement('a');
      a.href = processedVideoUrl;
      a.download = 'edited-video.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <a href="https://bolt.new" target="_blank" rel="noopener noreferrer">
<img 
  src="https://raw.githubusercontent.com/kickiniteasy/bolt-hackathon-badge/main/src/public/bolt-badge/white_circle_360x360/white_circle_360x360.png"
  alt="Built with Bolt"
  className="fixed top-4 right-4 w-14 h-14 z-50 shadow-lg rounded-full"

  style={{ background: 'white' }} // optional: helps on dark backgrounds new 
/>
</a>
      {currentPage === 'landing' ? (
        <LandingPage onNavigateToEditor={() => setCurrentPage('editor')} />
      ) : (
        // EDITOR PAGE CONTENT (NO OUTER GRADIENT WRAPPER)
        <>
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                  <Film className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">F*ck Video Editors</h1>
                  <p className="text-gray-600">Not sh*t only vibes</p>
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-8">
              {/* Loading State */}
              {!isFFmpegLoaded && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center space-x-3 bg-blue-50 px-6 py-4 rounded-xl">
                    <Sparkles className="w-6 h-6 text-blue-600 animate-pulse" />
                    <span className="text-blue-900 font-medium">Loading Video Processor...</span>
                  </div>
                </div>
              )}

              {/* Video Upload */}
              {isFFmpegLoaded && !originalVideo && (
                <VideoUploader onVideoSelect={handleVideoSelect} isLoading={!isFFmpegLoaded} />
              )}

              {/* Processing Status */}
              <ProcessingStatus
                isProcessing={isProcessing}
                currentOperation={currentOperation}
                error={error}
                success={success}
              />

              {/* Video Previews and Controls */}
              {originalVideo && (
                <div className="space-y-8">
                  {/* Prompt Interface */}
                  <PromptInterface
                    onPromptSubmit={handlePromptSubmit}
                    isProcessing={isProcessing}
                  />

                  {/* Video Previews */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <VideoPreview
                      videoUrl={originalVideoUrl}
                      title="Original Video"
                    />
                    {processedVideoUrl && (
                      <VideoPreview
                        videoUrl={processedVideoUrl}
                        title="Edited Video"
                        onDownload={handleDownload}
                        isProcessed={true}
                      />
                    )}
                  </div>

                  {/* Upload New Video Button */}
                  <div className="text-center">
                    <button
                      onClick={() => {
                        setOriginalVideo(null);
                        setOriginalVideoUrl('');
                        setProcessedVideoUrl('');
                        setError('');
                        setSuccess('');
                      }}
                      className="inline-flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                    >
                      <Film className="w-5 h-5" />
                      <span>Upload New Video</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
