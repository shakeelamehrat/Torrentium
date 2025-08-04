import { useState } from "react";
import { Search as SearchIcon, Download, Users, Star, FileText, HelpCircle, FileDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SearchResult {
  id: string;
  name: string;
  size: string;
  trustScore: number;
  seeders: number;
  leechers: number;
  uploadDate: string;
  type: string;
}

const mockResults: SearchResult[] = [
  {
    id: "1",
    name: "Ubuntu_22.04_Desktop.iso",
    size: "3.6 GB",
    trustScore: 9.2,
    seeders: 1247,
    leechers: 89,
    uploadDate: "2024-01-15",
    type: "Software"
  },
  {
    id: "2", 
    name: "Documentary_Nature_4K.mkv",
    size: "12.1 GB",
    trustScore: 8.7,
    seeders: 423,
    leechers: 156,
    uploadDate: "2024-01-14",
    type: "Video"
  },
  {
    id: "3",
    name: "Programming_Course_Complete.zip",
    size: "2.8 GB",
    trustScore: 8.9,
    seeders: 789,
    leechers: 45,
    uploadDate: "2024-01-13",
    type: "Education"
  },
  {
    id: "4",
    name: "Music_Album_Collection.flac",
    size: "896 MB",
    trustScore: 7.5,
    seeders: 234,
    leechers: 67,
    uploadDate: "2024-01-12",
    type: "Audio"
  }
];

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => {
      setResults(mockResults.filter(result => 
        result.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
      setIsSearching(false);
    }, 1000);
  };

  const getTrustScoreClass = (score: number) => {
    if (score >= 8.5) return "trust-score high";
    if (score >= 7) return "trust-score medium";
    return "trust-score low";
  };

  const generateTorrent = (result: SearchResult) => {
    console.log("Generating torrent for:", result.name);
    // Implementation would generate .torrent file
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Network</h1>
        <p className="text-muted-foreground">
          Find files shared by peers across the Torrentium network.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search for files, software, media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-10"
            />
          </div>
          <Button onClick={handleSearch} disabled={isSearching} className="btn-primary">
            {isSearching ? "Searching..." : "Search"}
          </Button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Found {results.length} results for "{searchQuery}"
            </h2>
          </div>

          <div className="space-y-3">
            {results.map((result) => (
              <div key={result.id} className="bg-card rounded-lg border p-6 hover:bg-card-hover transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-semibold">{result.name}</h3>
                      <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                        {result.type}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Size: </span>
                        <span className="font-medium">{result.size}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Trust: </span>
                        <span className={getTrustScoreClass(result.trustScore)}>
                          <Star className="w-3 h-3 inline mr-1" />
                          {result.trustScore}
                        </span>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-3 h-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Trust score based on upload/download ratio and community feedback
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-success" />
                        <span className="text-success font-medium">{result.seeders}</span>
                        <span className="text-muted-foreground">/ {result.leechers}</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-3 h-3 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Seeders (uploading) / Leechers (downloading)
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      
                      <div>
                        <span className="text-muted-foreground">Added: </span>
                        <span className="font-medium">{result.uploadDate}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => generateTorrent(result)}
                        >
                          <FileDown className="w-4 h-4 mr-2" />
                          .torrent
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Generate .torrent file for this content
                      </TooltipContent>
                    </Tooltip>
                    <Button 
                      variant="default"
                      size="sm"
                      onClick={() => console.log("Start download:", result.name)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchQuery && results.length === 0 && !isSearching && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <SearchIcon className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No results found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or check back later for new content.
          </p>
        </div>
      )}
    </div>
  );
}