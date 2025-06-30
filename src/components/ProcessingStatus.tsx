import React from 'react';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface ProcessingStatusProps {
  isProcessing: boolean;
  currentOperation?: string;
  error?: string;
  success?: string;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  isProcessing,
  currentOperation,
  error,
  success
}) => {
  if (!isProcessing && !error && !success) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {isProcessing && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
            <div>
              <p className="font-medium text-blue-900">Processing Video</p>
              {currentOperation && (
                <p className="text-sm text-blue-700">{currentOperation}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Error</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Success</p>
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};