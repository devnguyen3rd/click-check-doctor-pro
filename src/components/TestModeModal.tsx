
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface TestModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (results: {
    accuracy: number;
    rating: string;
    message: string;
  }) => void;
}

const TestModeModal = ({ isOpen, onClose, onComplete }: TestModeModalProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [clicks, setClicks] = useState(0);
  const [doubleClicks, setDoubleClicks] = useState(0);
  const lastClickTime = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const startTest = () => {
    setIsRunning(true);
    setTimeLeft(10);
    setClicks(0);
    setDoubleClicks(0);
    lastClickTime.current = 0;

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const finishTest = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const accuracy = clicks > 0 ? Math.round(((clicks - doubleClicks) / clicks) * 100) : 0;
    let rating = "🎯";
    let message = "Perfect! No double-clicks detected.";

    if (accuracy < 70) {
      rating = "🚨";
      message = "High double-click rate detected. Consider mouse maintenance.";
    } else if (accuracy < 90) {
      rating = "⚠️";
      message = "Some double-clicks detected. Monitor your mouse performance.";
    } else if (accuracy < 100) {
      rating = "😊";
      message = "Good performance with minimal issues.";
    }

    onComplete({ accuracy, rating, message });
  };

  const handleTestClick = () => {
    if (!isRunning) return;

    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;
    const isDoubleClick = timeSinceLastClick < 250 && lastClickTime.current > 0;

    setClicks(prev => prev + 1);
    if (isDoubleClick) {
      setDoubleClicks(prev => prev + 1);
    }
    lastClickTime.current = now;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const progress = ((10 - timeLeft) / 10) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">🎮 10-Second Accuracy Test</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-4">
          {!isRunning && timeLeft === 10 ? (
            <div className="text-center space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Click as fast as you can for 10 seconds. We'll measure your accuracy and detect any unwanted double-clicks.
              </p>
              <Button onClick={startTest} className="w-full">
                Start Test
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{timeLeft}</div>
                <p className="text-sm text-gray-500">seconds remaining</p>
              </div>
              
              <Progress value={progress} className="w-full" />
              
              <Button
                onClick={handleTestClick}
                className="w-full h-16 text-lg"
                disabled={!isRunning}
              >
                Click Me! 🖱️
              </Button>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{clicks}</div>
                  <div className="text-sm text-gray-500">Total Clicks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{doubleClicks}</div>
                  <div className="text-sm text-gray-500">Double Clicks</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestModeModal;
