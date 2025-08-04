import { useState } from "react";
import { Link } from "react-router-dom";
import { Upload, Download, Search, History, TrendingUp, Users, HardDrive, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  const stats = [{
    label: "Active Peers",
    value: "1,247",
    icon: Users,
    trend: "+12%"
  }, {
    label: "Files Shared",
    value: "89.2K",
    icon: HardDrive,
    trend: "+8%"
  }, {
    label: "Total Data",
    value: "2.4 TB",
    icon: TrendingUp,
    trend: "+23%"
  }];
  return <div className="p-8 max-w-7xl mx-auto space-y-12">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
          Welcome to Torrentium
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A modern peer-to-peer file sharing platform built for speed, privacy, and reliability.
        </p>
      </div>

      {/* Main Search Section */}
      

      {/* Upload & Download Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="bg-card border rounded-xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-4">Upload Files</h3>
            <p className="text-muted-foreground mb-6">
              Share your files with the network and contribute to the decentralized ecosystem
            </p>
            <Button asChild className="w-full">
              <Link to="/upload">
                <Plus className="w-4 h-4 mr-2" />
                Start Upload
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Download Section */}
        <div className="bg-card border rounded-xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Download className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-xl font-bold mb-4">Download Files</h3>
            <p className="text-muted-foreground mb-6">Access files from the network using torrent files</p>
            <Button asChild variant="outline" className="w-full">
              <Link to="/download">
                <Download className="w-4 h-4 mr-2" />
                Start Download
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => <div key={index} className="bg-card border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-8 h-8 text-primary" />
              <span className="text-success text-sm font-medium">{stat.trend}</span>
            </div>
            <div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          </div>)}
      </div>

      {/* Quick Actions */}
      
    </div>;
};
export default Index;