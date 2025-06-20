
interface LiveFeedbackProps {
  feedback: "single" | "double" | null;
}

const LiveFeedback = ({ feedback }: LiveFeedbackProps) => {
  if (!feedback) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-400 dark:text-gray-500 text-lg">
          👆 Click the button above to start testing
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-6 animate-fade-in">
      {feedback === "single" ? (
        <div className="space-y-2">
          <p className="text-2xl">✅</p>
          <p className="text-lg font-semibold text-green-600 dark:text-green-400">
            Single click detected!
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Great! Your mouse is working correctly.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-2xl">❗</p>
          <p className="text-lg font-semibold text-red-600 dark:text-red-400">
            Oops! Double click detected!
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This might indicate a hardware issue with your mouse.
          </p>
        </div>
      )}
    </div>
  );
};

export default LiveFeedback;
