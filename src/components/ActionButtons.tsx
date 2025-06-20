
import { Button } from "@/components/ui/button";
import { RotateCcw, Moon, Sun, Download, Zap, HelpCircle } from "lucide-react";

interface ActionButtonsProps {
  onReset: () => void;
  onToggleTheme: () => void;
  onExport: () => void;
  onStartTest: () => void;
  isDarkMode: boolean;
}

const ActionButtons = ({ 
  onReset, 
  onToggleTheme, 
  onExport, 
  onStartTest, 
  isDarkMode 
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
      <Button
        onClick={onReset}
        variant="outline"
        className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-300 dark:hover:bg-red-900/30"
      >
        <RotateCcw className="w-4 h-4" />
        <span>Reset Stats</span>
      </Button>

      <Button
        onClick={onToggleTheme}
        variant="outline"
        className="flex items-center space-x-2"
      >
        {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        <span>{isDarkMode ? 'Light' : 'Dark'} Mode</span>
      </Button>

      <Button
        onClick={onExport}
        variant="outline"
        className="flex items-center space-x-2 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/30"
      >
        <Download className="w-4 h-4" />
        <span>Export Results</span>
      </Button>

      <Button
        onClick={onStartTest}
        className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
      >
        <Zap className="w-4 h-4" />
        <span>10-Second Test</span>
      </Button>

      <Button
        variant="ghost"
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30"
        onClick={() => window.open('https://www.example.com/mouse-help', '_blank')}
      >
        <HelpCircle className="w-4 h-4" />
        <span>Help & Tips</span>
      </Button>
    </div>
  );
};

export default ActionButtons;
