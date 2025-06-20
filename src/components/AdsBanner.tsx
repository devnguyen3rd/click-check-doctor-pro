
import { Card } from "@/components/ui/card";

const AdsBanner = () => {
  return (
    <Card className="mb-8 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-dashed border-2 border-gray-300 dark:border-gray-600 animate-fade-in">
      <div className="text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">Sponsored</p>
        <div className="flex items-center justify-center space-x-4 py-4">
          <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 flex-1 max-w-sm">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Premium Mouse Care Kit</h3>
            <p className="text-sm text-blue-600 dark:text-blue-300">Keep your mouse in perfect condition with our cleaning tools and replacement parts.</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4 flex-1 max-w-sm">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-1">Gaming Mice Collection</h3>
            <p className="text-sm text-green-600 dark:text-green-300">Upgrade to a professional gaming mouse with precision switches and durability.</p>
          </div>
        </div>
        <p className="text-xs text-gray-400">Your ad could be here - Contact us for advertising opportunities</p>
      </div>
    </Card>
  );
};

export default AdsBanner;
