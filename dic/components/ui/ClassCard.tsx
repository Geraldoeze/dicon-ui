import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, Calendar } from "lucide-react"
import { format, parseISO, isWithinInterval, addMinutes, isBefore, differenceInMinutes } from 'date-fns';
import { formatDateFromString } from "@/lib/sub-functions";


interface Class {
    id: number
    course_code: string
    topic: string
    start_date: string
    start_time: string
    end_time: string;
    duration: number;
    class_link: string
  }

const determineClassStatus = (start_date: string, start_time: string, duration: number) => {
    // Combine date and time into a single datetime
    const classDateTime = parseISO(`${start_date.split('T')[0]}T${start_time}`);
    const endDateTime = addMinutes(classDateTime, duration);
    const now = new Date();
  
    // Calculate time difference
    const minutesUntilStart = differenceInMinutes(classDateTime, now);
    
    if (isWithinInterval(now, { start: classDateTime, end: endDateTime })) {
      return { 
        status: 'in_session',
        display: 'In session',
        colorClasses: 'bg-blue-50 text-blue-600'
      };
    } else if (isBefore(now, classDateTime)) {
      let timeDisplay;
      const hoursLeft = Math.floor(minutesUntilStart / 60);
      const minutesLeft = minutesUntilStart % 60;
      
      if (hoursLeft > 0) {
        timeDisplay = `${hoursLeft}h left`;
      } else {
        timeDisplay = `${minutesLeft}m left`;
      }
      
      return {
        status: 'upcoming',
        display: timeDisplay,
        colorClasses: 'bg-orange-50 text-orange-600'
      };
    } else {
      return {
        status: 'completed',
        display: 'Completed',
        colorClasses: 'bg-gray-50 text-gray-600'
      };
    }
  };

const ClassCard = ({ classItem }: { classItem: Class }) => {
    const { status, display, colorClasses } = determineClassStatus(
      classItem.start_date,
      classItem.start_time,
      classItem.duration
    );
  
    const formattedTime = format(
      parseISO(`${classItem.start_date.split('T')[0]}T${classItem.start_time}`),
      'HH:mm'
    );
    
    
    return (
      <Card className="bg-white hover:shadow-md transition-shadow border-none duration-200">
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900">{classItem.course_code}</h3>
            <p className="text-sm text-gray-600">{classItem.topic}</p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{formattedTime}</span>
            
            <Calendar className="h-4 w-4 ml-2" />
            <span>{formatDateFromString(classItem?.end_date)}</span>
          </div>
  
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${colorClasses}`}>
              {display}
            </span>
            
            {classItem.class_link && (
              <Button 
                variant="secondary"
                className={
                  status === 'in_session'
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-100 text-gray-400"
                }
                disabled={status !== 'in_session'}
                asChild={status === 'in_session'}
              >
                {status === 'in_session' ? (
                  <a href={classItem.class_link}>Join class →</a>
                ) : (
                  "Join class →"
                )}
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  };

  export default ClassCard;