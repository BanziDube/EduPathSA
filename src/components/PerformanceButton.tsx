export default function PerformanceButton() {
  const handleClick = () => {
    const timing = window.performance.timing;
    const loadTime = (timing.loadEventEnd - timing.navigationStart) / 1000;

    alert(`🚀 Page loaded in ${loadTime.toFixed(2)} seconds`);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-50 flex items-center bg-white text-green-600 px-5 py-3 rounded-full font-semibold hover:bg-green-100 transition-all duration-300 shadow-xl group"
    >
      <span className="group-hover:underline">Check Performance</span>
    </button>
  );
}
