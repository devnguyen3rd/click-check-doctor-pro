
import { useState, useCallback, useRef } from "react";
import Header from "@/components/Header";
import AdsBanner from "@/components/AdsBanner";
import ClickTestZone from "@/components/ClickTestZone";
import LiveFeedback from "@/components/LiveFeedback";
import StatsPanel from "@/components/StatsPanel";
import ActionButtons from "@/components/ActionButtons";
import TestModeModal from "@/components/TestModeModal";
import { useToast } from "@/hooks/use-toast";

interface ClickData {
  timestamp: number;
  isDoubleClick: boolean;
}

const Index = () => {
  const [clicks, setClicks] = useState<ClickData[]>([]);
  const [lastFeedback, setLastFeedback] = useState<"single" | "double" | null>(null);
  const [isTestMode, setIsTestMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const lastClickTime = useRef<number>(0);
  const { toast } = useToast();

  const DOUBLE_CLICK_THRESHOLD = 250; // ms

  const handleClick = useCallback(() => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;
    const isDoubleClick = timeSinceLastClick < DOUBLE_CLICK_THRESHOLD && lastClickTime.current > 0;
    
    const newClick: ClickData = {
      timestamp: now,
      isDoubleClick
    };

    setClicks(prev => [...prev, newClick]);
    setLastFeedback(isDoubleClick ? "double" : "single");
    lastClickTime.current = now;

    // Show warning toast if double-click rate is getting high
    const recentClicks = clicks.slice(-10);
    const doubleClickRate = recentClicks.filter(c => c.isDoubleClick).length / recentClicks.length;
    if (doubleClickRate > 0.3 && clicks.length > 5) {
      toast({
        title: "High Double-Click Rate Detected! 🚨",
        description: "Your mouse might need attention. Consider cleaning or replacing it.",
        variant: "destructive",
      });
    }
  }, [clicks, toast]);

  const resetStats = () => {
    setClicks([]);
    setLastFeedback(null);
    lastClickTime.current = 0;
    toast({
      title: "Stats Reset! 🔄",
      description: "All click data has been cleared.",
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const exportResults = () => {
    const totalClicks = clicks.length;
    const doubleClicks = clicks.filter(c => c.isDoubleClick).length;
    const doubleClickRate = totalClicks > 0 ? (doubleClicks / totalClicks * 100).toFixed(1) : 0;
    
    const data = {
      totalClicks,
      doubleClicks,
      doubleClickRate: `${doubleClickRate}%`,
      testDate: new Date().toLocaleDateString(),
      clicks: clicks.map(c => ({
        timestamp: new Date(c.timestamp).toISOString(),
        isDoubleClick: c.isDoubleClick
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `doubleclick-test-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Results Exported! 📤",
      description: "Your test results have been downloaded.",
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-green-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <AdsBanner />
        
        <div className="space-y-8">
          <ClickTestZone onClick={handleClick} />
          
          <LiveFeedback feedback={lastFeedback} />
          
          <StatsPanel clicks={clicks} threshold={DOUBLE_CLICK_THRESHOLD} />
          
          <ActionButtons
            onReset={resetStats}
            onToggleTheme={toggleTheme}
            onExport={exportResults}
            onStartTest={() => setIsTestMode(true)}
            isDarkMode={isDarkMode}
          />
        </div>

        <TestModeModal 
          isOpen={isTestMode}
          onClose={() => setIsTestMode(false)}
          onComplete={(results) => {
            toast({
              title: `Test Complete! ${results.rating}`,
              description: `Accuracy: ${results.accuracy}% - ${results.message}`,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Index;
