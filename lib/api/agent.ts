import { ApiResponse, Course } from "@/services/types";
import { handler } from "./handler";
import { CustomFilter } from "@/proto/filter";
import { ApiService } from "@/services/api.service";

// api client
const {api} = new ApiService()

// get filtered courses agent
async function GetCoursesAgent(filter: CustomFilter): Promise<ApiResponse<Course[]>> {
    return await handler<ApiResponse<Course[]>>
    ('/students/courses', 
    { page: filter.page, 
      course_type: filter.course_type, 
      student_id: filter.student_id, 
     },
    'get', 
    api)
}
export {
    GetCoursesAgent
}