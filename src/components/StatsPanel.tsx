
import { Card } from "@/components/ui/card";
import { useMemo } from "react";

interface ClickData {
  timestamp: number;
  isDoubleClick: boolean;
}

interface StatsPanelProps {
  clicks: ClickData[];
  threshold: number;
}

const StatsPanel = ({ clicks, threshold }: StatsPanelProps) => {
  const stats = useMemo(() => {
    const totalClicks = clicks.length;
    const doubleClicks = clicks.filter(c => c.isDoubleClick).length;
    const doubleClickRate = totalClicks > 0 ? (doubleClicks / totalClicks * 100) : 0;
    
    const intervals = clicks.slice(1).map((click, index) => 
      click.timestamp - clicks[index].timestamp
    );
    const avgInterval = intervals.length > 0 
      ? intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length 
      : 0;

    return {
      totalClicks,
      doubleClicks,
      doubleClickRate,
      avgInterval: Math.round(avgInterval)
    };
  }, [clicks]);

  const getHealthStatus = () => {
    if (stats.totalClicks === 0) return { emoji: "🔍", text: "No data yet", color: "text-gray-500" };
    if (stats.doubleClickRate === 0) return { emoji: "✅", text: "Excellent", color: "text-green-600" };
    if (stats.doubleClickRate < 10) return { emoji: "😊", text: "Good", color: "text-blue-600" };
    if (stats.doubleClickRate < 25) return { emoji: "⚠️", text: "Fair", color: "text-yellow-600" };
    return { emoji: "🚨", text: "Poor", color: "text-red-600" };
  };

  const healthStatus = getHealthStatus();

  return (
    <Card className="p-6 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        📊 Click Statistics
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.totalClicks}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Clicks</p>
        </div>
        
        <div className="text-center p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
          <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.doubleClicks}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Double Clicks</p>
        </div>
        
        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {stats.doubleClickRate.toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Double Rate</p>
        </div>
        
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {stats.avgInterval}ms
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg Interval</p>
        </div>
      </div>

      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-2xl">{healthStatus.emoji}</span>
          <span className={`text-lg font-semibold ${healthStatus.color}`}>
            Mouse Health: {healthStatus.text}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {stats.doubleClickRate > 20 
            ? "Consider cleaning or replacing your mouse switches"
            : stats.doubleClickRate > 10
            ? "Your mouse might need some maintenance"
            : "Your mouse is performing well!"
          }
        </p>
      </div>
    </Card>
  );
};

export default StatsPanel;
