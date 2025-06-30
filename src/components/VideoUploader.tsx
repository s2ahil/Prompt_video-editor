import React from 'react';
import { Upload, Video } from 'lucide-react';

interface VideoUploaderProps {
  onVideoSelect: (file: File) => void;
  isLoading: boolean;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoSelect, isLoading }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      onVideoSelect(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors duration-200">
        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-blue-50 rounded-full">
            <Video className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Upload Your Video
            </h3>
            <p className="text-gray-600 mb-4">
              Select a video file to start editing with AI prompts
            </p>
          </div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isLoading}
            />
            <div className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50">
              <Upload className="w-5 h-5" />
              <span>{isLoading ? 'Loading...' : 'Choose Video File'}</span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};