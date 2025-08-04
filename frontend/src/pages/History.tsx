import { useState } from "react";
import { Upload, Download, Clock, CheckCircle, XCircle, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoryItem {
  id: string;
  name: string;
  type: 'upload' | 'download';
  size: string;
  status: 'completed' | 'failed' | 'paused' | 'active';
  progress: number;
  timestamp: string;
  speed?: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    name: "Linux_Distribution.iso",
    type: "download",
    size: "4.2 GB",
    status: "completed",
    progress: 100,
    timestamp: "2024-01-15 14:32",
    speed: "5.2 MB/s"
  },
  {
    id: "2",
    name: "My_Document_Collection.zip",
    type: "upload",
    size: "856 MB",
    status: "completed",
    progress: 100,
    timestamp: "2024-01-15 12:15"
  },
  {
    id: "3",
    name: "Movie_Archive.mkv",
    type: "download",
    size: "8.9 GB",
    status: "active",
    progress: 67,
    timestamp: "2024-01-15 13:45",
    speed: "3.1 MB/s"
  },
  {
    id: "4",
    name: "Software_Package.deb",
    type: "download",
    size: "245 MB",
    status: "paused",
    progress: 34,
    timestamp: "2024-01-14 18:20"
  },
  {
    id: "5",
    name: "Photo_Album.tar.gz",
    type: "upload",
    size: "1.2 GB",
    status: "failed",
    progress: 0,
    timestamp: "2024-01-14 16:08"
  }
];

export default function History() {
  const [filter, setFilter] = useState<'all' | 'upload' | 'download'>('all');
  const [history] = useState(mockHistory);

  const filteredHistory = history.filter(item => 
    filter === 'all' || item.type === filter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-warning" />;
      case 'active':
        return <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      case 'paused':
        return 'Paused';
      case 'active':
        return 'Active';
      default:
        return 'Unknown';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'failed':
        return 'text-destructive';
      case 'paused':
        return 'text-warning';
      case 'active':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Activity History</h1>
        <p className="text-muted-foreground">
          Track all your uploads and downloads on the Torrentium network.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All Activity
          </Button>
          <Button
            variant={filter === 'upload' ? 'default' : 'outline'}
            onClick={() => setFilter('upload')}
          >
            <Upload className="w-4 h-4 mr-2" />
            Uploads
          </Button>
          <Button
            variant={filter === 'download' ? 'default' : 'outline'}
            onClick={() => setFilter('download')}
          >
            <Download className="w-4 h-4 mr-2" />
            Downloads
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredHistory.map((item) => (
          <div key={item.id} className="bg-card rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {item.type === 'upload' ? (
                  <Upload className="w-5 h-5 text-primary" />
                ) : (
                  <Download className="w-5 h-5 text-primary" />
                )}
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.size}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  {getStatusIcon(item.status)}
                  <span className={getStatusClass(item.status)}>
                    {getStatusText(item.status)}
                  </span>
                </div>
                
                <span className="text-muted-foreground">{item.timestamp}</span>
                
                {item.speed && (
                  <span className="text-primary font-medium">{item.speed}</span>
                )}
              </div>
            </div>
            
            {item.status !== 'completed' && item.status !== 'failed' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{item.progress}%</span>
                </div>
                <div className="progress-bar h-2">
                  <div 
                    className="progress-fill"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            )}
            
            {item.status === 'paused' && (
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  Resume
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No activity yet</h3>
          <p className="text-muted-foreground">
            Start uploading or downloading files to see your activity history.
          </p>
        </div>
      )}
    </div>
  );
}