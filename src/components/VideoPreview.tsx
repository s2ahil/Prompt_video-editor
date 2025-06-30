import React from 'react';
import { Download, Play } from 'lucide-react';

interface VideoPreviewProps {
  videoUrl: string;
  title: string;
  onDownload?: () => void;
  isProcessed?: boolean;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ 
  videoUrl, 
  title, 
  onDownload, 
  isProcessed = false 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Play className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">{title}</h3>
          </div>
          {isProcessed && onDownload && (
            <button
              onClick={onDownload}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          )}
        </div>
      </div>
      <div className="p-4">
        <video
          controls
          className="w-full rounded-lg"
          src={videoUrl}
          style={{ maxHeight: '400px' }}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};