import { useState } from "react";
import { Download as DownloadIcon, FileText, Link, FolderOpen, Pause, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
export default function Download() {
  const [torrentFile, setTorrentFile] = useState<File | null>(null);
  const [magnetUri, setMagnetUri] = useState("");
  const [activeTab, setActiveTab] = useState<"file" | "magnet">("magnet");
  const [saveLocation, setSaveLocation] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState("0");
  const [fileName, setFileName] = useState("example-file.zip");
  const [fileSize, setFileSize] = useState("500 MB");
  const [isPaused, setIsPaused] = useState(false);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setTorrentFile(e.target.files[0]);
    }
  };
  const handleDownload = () => {
    if (activeTab === "file" && torrentFile) {
      console.log("Starting download from torrent file:", torrentFile.name);
      startDownloadSimulation();
    } else if (activeTab === "magnet" && magnetUri) {
      console.log("Starting download from magnet URI:", magnetUri);
      startDownloadSimulation();
    }
  };
  const startDownloadSimulation = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setIsPaused(false);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          return 100;
        }
        if (isPaused) return prev;
        const newProgress = prev + Math.random() * 5;
        setDownloadSpeed((Math.random() * 20 + 5).toFixed(1));
        return Math.min(newProgress, 100);
      });
    }, 500);
  };

  const pauseDownload = () => {
    setIsPaused(!isPaused);
  };

  const cancelDownload = () => {
    setIsDownloading(false);
    setDownloadProgress(0);
    setIsPaused(false);
  };
  const isValidMagnet = magnetUri.startsWith("magnet:?");
  return <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Download Files</h1>
        <p className="text-muted-foreground">Download files from the network using torrent files.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-card rounded-xl border p-6">
          <div className="flex gap-4 mb-6">
            
            <button onClick={() => setActiveTab("file")} className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "file" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
              <FileText className="w-4 h-4 inline mr-2" />
              Torrent File
            </button>
          </div>

          {activeTab === "magnet" && <div className="space-y-4">
              <div>
                
                <Textarea placeholder="" value={magnetUri} onChange={e => setMagnetUri(e.target.value)} className="min-h-[80px] font-mono text-sm" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Save Location (Optional)
                </label>
                <div className="flex gap-2">
                  <Input placeholder="/home/user/downloads" value={saveLocation} onChange={e => setSaveLocation(e.target.value)} className="font-mono text-sm flex-1" />
                  <Button variant="outline" size="sm">
                    <FolderOpen className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <Button onClick={handleDownload} disabled={!isValidMagnet} className="btn-primary">
                <DownloadIcon className="w-4 h-4 mr-2" />
                Start Download
              </Button>
            </div>}

          {activeTab === "file" && <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Select Torrent File
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <input type="file" accept=".torrent" onChange={handleFileSelect} className="hidden" id="torrent-file" />
                  <label htmlFor="torrent-file" className="cursor-pointer">
                    <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    {torrentFile ? <div>
                        <p className="font-medium">{torrentFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(torrentFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div> : <div>
                        <p className="font-medium mb-2">Click to select torrent file</p>
                        <p className="text-sm text-muted-foreground">
                          Supports .torrent files only
                        </p>
                      </div>}
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Save Location (Optional)
                </label>
                <div className="flex gap-2">
                  <Input placeholder="/home/user/downloads" value={saveLocation} onChange={e => setSaveLocation(e.target.value)} className="font-mono text-sm flex-1" />
                  <Button variant="outline" size="sm">
                    <FolderOpen className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <Button onClick={handleDownload} disabled={!torrentFile} className="btn-primary">
                <DownloadIcon className="w-4 h-4 mr-2" />
                Start Download
              </Button>
            </div>}
            
            {(isDownloading || downloadProgress > 0) && <div className="mt-6 pt-6 border-t border-border">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Downloading</span>
                      <div className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded border">
                        {fileName}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={pauseDownload}
                        disabled={!isDownloading}
                      >
                        {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={cancelDownload}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4 text-muted-foreground font-mono">
                      <span>{fileSize}</span>
                      <span>•</span>
                      <span>{downloadSpeed} MB/s</span>
                    </div>
                    <span className="font-medium">{downloadProgress.toFixed(1)}%</span>
                  </div>
                  
                  <Progress value={downloadProgress} className="h-2" />
                  
                  {isPaused && (
                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Pause className="w-3 h-3" />
                      Download paused
                    </div>
                  )}
                </div>
              </div>}
        </div>
      </div>
    </div>;
}