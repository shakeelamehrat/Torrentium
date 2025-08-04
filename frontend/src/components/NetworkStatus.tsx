import { useState, useEffect } from "react";
import { Wifi, ArrowUp, ArrowDown, Activity } from "lucide-react";

export const NetworkStatus = () => {
  const [stats, setStats] = useState({
    peerConnections: 42,
    uploadSpeed: "15.3",
    downloadSpeed: "8.7",
    activeSessions: 3
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        peerConnections: Math.floor(Math.random() * 20) + 35,
        uploadSpeed: (Math.random() * 10 + 10).toFixed(1),
        downloadSpeed: (Math.random() * 5 + 5).toFixed(1),
        activeSessions: Math.floor(Math.random() * 3) + 2
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card rounded-xl border p-4">
      <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <Activity className="w-4 h-4 text-primary" />
        Network Status
      </h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Wifi className="w-4 h-4 text-green-400" />
            <span className="text-muted-foreground">Peers</span>
          </div>
          <span className="font-mono font-medium">{stats.peerConnections}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <ArrowUp className="w-4 h-4 text-blue-400" />
            <span className="text-muted-foreground">Upload</span>
          </div>
          <span className="font-mono font-medium">{stats.uploadSpeed} MB/s</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <ArrowDown className="w-4 h-4 text-green-400" />
            <span className="text-muted-foreground">Download</span>
          </div>
          <span className="font-mono font-medium">{stats.downloadSpeed} MB/s</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Activity className="w-4 h-4 text-orange-400" />
            <span className="text-muted-foreground">Active</span>
          </div>
          <span className="font-mono font-medium">{stats.activeSessions}</span>
        </div>
      </div>
    </div>
  );
};