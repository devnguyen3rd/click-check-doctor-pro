
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ClickTestZoneProps {
  onClick: () => void;
}

const ClickTestZone = ({ onClick }: ClickTestZoneProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200);
    onClick();
  };

  return (
    <div className="flex flex-col items-center space-y-4 animate-fade-in">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Click Testing Area
      </h2>
      <Button
        onClick={handleClick}
        className={`
          w-48 h-48 rounded-full text-xl font-bold transition-all duration-200 
          bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700
          shadow-lg hover:shadow-xl active:scale-95
          ${isClicked ? 'animate-pulse ring-4 ring-blue-300' : ''}
        `}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-3xl">🖱️</span>
          <span>Click Here</span>
        </div>
      </Button>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
        Click the button above to test your mouse. We'll detect if it's registering unintended double-clicks.
      </p>
    </div>
  );
};

export default ClickTestZone;
