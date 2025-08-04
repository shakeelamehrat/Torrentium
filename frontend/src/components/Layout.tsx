import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopNavigation } from "@/components/TopNavigation";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { NetworkStatus } from "@/components/NetworkStatus";
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({
  children
}: LayoutProps) => {
  const [currentProgress, setCurrentProgress] = useState<{
    type: 'upload' | 'download';
    filename: string;
    progress: number;
  } | null>(null);
  return <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-background">
        <TopNavigation />
        
        {currentProgress && <ProgressIndicator type={currentProgress.type} filename={currentProgress.filename} progress={currentProgress.progress} onClose={() => setCurrentProgress(null)} />}
        
        <div className="flex flex-1">
          <div className="flex">
            <AppSidebar />
            
          </div>
          <main className="flex-1 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>;
};