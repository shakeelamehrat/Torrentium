import { X } from "lucide-react";

interface ProgressIndicatorProps {
  type: 'upload' | 'download';
  filename: string;
  progress: number;
  onClose: () => void;
}

export const ProgressIndicator = ({ type, filename, progress, onClose }: ProgressIndicatorProps) => {
  return (
    <div className="bg-card border-b border-border px-6 py-3 animate-slide-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              type === 'upload' ? 'bg-success' : 'bg-primary'
            }`} />
            <span className="text-sm font-medium">
              {type === 'upload' ? 'Uploading' : 'Downloading'}: {filename}
            </span>
          </div>
          
          <div className="flex-1 max-w-md">
            <div className="progress-bar h-2">
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">
              {progress.toFixed(1)}%
            </span>
          </div>
        </div>
        
        <button 
          onClick={onClose}
          className="p-1 hover:bg-accent rounded-md ml-4"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};