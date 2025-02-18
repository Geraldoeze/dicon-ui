import { parseISO, formatDistanceToNow } from 'date-fns';
import { Button } from "@/components/ui/button"
import { Clock, Play } from 'lucide-react';
import { Video } from '@/services/types';



// interface Video {
//     id: number;
//     course_id: number;
//     title: string
//     topic_name: string
//     video_url: string
//     created_at: string
//   }
  
// Date Utilities

const formatTimeStamp = (timestamp: string) => {
    try {
      const date = parseISO(timestamp);
      const distance = formatDistanceToNow(date, { addSuffix: true });
      return distance;
    } catch {
      return 'Invalid date';
    }
  };

const VideoCard = ({ video }: { video: Video }) => (
    <div className="space-y-3">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <Button 
          variant="ghost" 
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          onClick={() => window.open(video.video_url, '_blank')}
        >
          <Play className="h-12 w-12 text-primary" />
        </Button>
      </div>
      <h3 className="font-medium">{video.title}</h3>
      
      <p className="text-sm text-muted-foreground">{video.topic_name}</p>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span className='border rounded-md p-2 bg-slate-100/70'>
          Uploaded {formatTimeStamp(video.created_at)}
        </span>
      </div>
    </div>
  )

  export default VideoCard