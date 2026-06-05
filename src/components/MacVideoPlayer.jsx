
const MacVideoPlayer = ({ videoId, title = "Dokumenter" }) => {
  if (!videoId) return null;

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-gray-900/90 backdrop-blur-md">
      {/* Mac Toolbar */}
      <div className="h-8 sm:h-10 bg-gray-800/80 flex items-center px-4 border-b border-white/10 relative">
        <div className="flex gap-1.5 sm:gap-2 absolute left-4">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 shadow-inner"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 shadow-inner"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 shadow-inner"></div>
        </div>
        <div className="flex-1 text-center text-gray-400 text-xs sm:text-sm font-medium tracking-wide truncate px-16">
          {title}
        </div>
      </div>
      {/* Video Content */}
      <div className="relative w-full pb-[56.25%] bg-black">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MacVideoPlayer;
