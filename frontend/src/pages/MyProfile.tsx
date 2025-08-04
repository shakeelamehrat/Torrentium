import { useState } from "react";
import { User, Shield, Clock, Award, Edit, RefreshCw, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function MyProfile() {
  const [copied, setCopied] = useState(false);
  
  const profileData = {
    username: "TorrentUser_47",
    peerId: "/ip4/192.168.1.100/tcp/4001/p2p/QmYyQSo1c1Ym7orWxLYvCrM2EmxFTANf8wXmmE7DWjhx5N",
    trustScore: 0.87, // Normalized to 0.0-1.0 range
    sessionPeriod: "2h 34m",
    badges: [
      { name: "Reliable Seeder", type: "gold" },
      { name: "Trusted Uploader", type: "blue" },
      { name: "Speed Demon", type: "green" },
      { name: "Rare File Sharer", type: "purple" },
      { name: "Community Helper", type: "orange" }
    ]
  };

  const copyPeerId = async () => {
    await navigator.clipboard.writeText(profileData.peerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 0.85) return "text-green-400";
    if (score >= 0.7) return "text-yellow-400";
    return "text-red-400";
  };

  const getBadgeColor = (type: string) => {
    const colors = {
      gold: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
      blue: "bg-blue-500/20 text-blue-400 border-blue-500/50",
      green: "bg-green-500/20 text-green-400 border-green-500/50",
      purple: "bg-purple-500/20 text-purple-400 border-purple-500/50",
      orange: "bg-orange-500/20 text-orange-400 border-orange-500/50"
    };
    return colors[type as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your Torrentium network identity and reputation.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Basic Profile Info */}
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{profileData.username}</h2>
                <p className="text-muted-foreground">Network Participant</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Score
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Peer ID */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Peer ID (Multiaddress)
              </label>
              <div className="bg-muted/50 rounded-lg p-3 font-mono text-xs break-all border border-primary/20 shadow-sm">
                <div className="flex items-start gap-2">
                  <span className="flex-1 text-primary/80">{profileData.peerId}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyPeerId}
                    className="h-6 w-6 p-0 flex-shrink-0"
                  >
                    {copied ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Session Period */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                Current Session
              </label>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-bold text-lg font-mono">{profileData.sessionPeriod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Score */}
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Trust Score
            </h3>
            <div className="flex items-center gap-3">
              <span className={`text-2xl font-bold ${getTrustScoreColor(profileData.trustScore)}`}>
                {profileData.trustScore.toFixed(2)}
              </span>
              <div className={`w-3 h-3 rounded-full ${getTrustScoreColor(profileData.trustScore).replace('text-', 'bg-')}`} />
            </div>
          </div>
          
          <div className="space-y-3">
            <Progress value={profileData.trustScore * 100} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Reputation Level: <span className={`font-medium ${getTrustScoreColor(profileData.trustScore)}`}>
                {profileData.trustScore >= 0.85 ? 'High' : profileData.trustScore >= 0.7 ? 'Medium' : 'Low'}
              </span></span>
              <span>Based on upload/download ratio and community feedback</span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="bg-card rounded-xl border p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-primary" />
            Earned Badges
          </h3>
          
          <div className="grid gap-3">
            {profileData.badges.map((badge, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="font-medium">{badge.name}</span>
                </div>
                <Badge variant="outline" className={getBadgeColor(badge.type)}>
                  {badge.type.charAt(0).toUpperCase() + badge.type.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}