import { GetCoursesAgent} from "@/lib/api/agent";
import { CustomFilter } from "@/proto/filter";
import { ApiResponse, Course } from "@/services/types";
import { useQuery } from "@tanstack/react-query";

function useGetCourses(filter: CustomFilter) {
    return useQuery<ApiResponse<Course[]>>({
        queryKey: ['courses', filter.page,
             filter.course_type,
             filter.lecturer_id, 
             filter.session, 
             filter.unit, 
             filter.session,
             filter.student_id],
        queryFn: () => GetCoursesAgent({
            page: filter?.page ?? 1,
            course_type: filter?.course_type ?? '',
            lecturer_id: filter?.lecturer_id ?? '',
            student_id: filter?.student_id ?? '1',
            unit: filter?.unit ?? '',
            session: filter?.session ?? '',
            search: filter.search ?? ''
        }),
        enabled: !!filter.page,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    })

}
export { useGetCourses }