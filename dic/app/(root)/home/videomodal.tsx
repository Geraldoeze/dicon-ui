import { useState } from 'react';
import { Play, X } from 'lucide-react';

interface VideoModalProps {
  videoUrl: string;
  section: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoUrl, section }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hero Video Button */}

      {section === "hero" &&
      <div className="hero-video absolute bottom-8 md:bottom-12 right-4 md:right-8">
        <div className="flex flex-col-reverse sm:flex-row items-center gap-4 sm:gap-6">
          <span className="text-white text-sm md:text-base">
            Watch our documentary video
          </span>
          <button 
            onClick={() => setIsOpen(true)}
            className="rounded-full bg-orange-500 p-3 md:p-4 hover:bg-orange-600 transition-colors custom-ping duration-300"
            aria-label="Play video"
          >
            <Play className="w-2 h-2 md:w-5 md:h-5 text-white" />
          </button>
        </div>
      </div>}

      {section === "gallery" &&
      <div className="">
           <button 
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-white hover:bg-gray-200 border-2 border-gray-700 p-2 transition-colors rounded-sm"
            aria-label="Play video"> 
            <Play className="w-2 h-2 md:w-5 md:h-5 text-black" />
            Watch our Graduation Video
          </button>
      </div>
      }

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
              aria-label="Close video"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video container */}
            <div className="relative pt-[60%] bg-black rounded-lg overflow-hidden">
              {section === "hero" && 
              <iframe
                src={videoUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Documentary video"
              />
              }
              {section === "gallery" &&
              <iframe 
              width="560" 
              height="315" 
              src={videoUrl}
              className="absolute inset-0 w-full h-full"
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen></iframe>
              }
            </div> 
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModal;