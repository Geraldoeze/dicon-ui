import { apiService } from './api.service';
import { STAFF_ENDPOINTS } from './config';
import type { StaffCourses, CourseDetails, Video, CourseStudents, Class, Assignment, AssignmentDetails} from './types';

class StaffService {
  // Course methods
  async getCourses(params?: { 
    page?: number; 
    pageSize?: number; 
    search?: string; 
    status?: string;
  }) {
    return apiService.get<StaffCourses[]>(STAFF_ENDPOINTS.COURSES.LIST, params);
  }

  async getCourseDetails(courseId: string) {
    return apiService.get<CourseDetails>(STAFF_ENDPOINTS.COURSES.DETAILS(courseId));
  }

  async getCourseStudents(courseId: string) {
    return apiService.get<CourseStudents>(STAFF_ENDPOINTS.COURSES.STUDENTS(courseId));
  }

  async getCourseVideos(courseId: string) {
    return apiService.get<Video>(STAFF_ENDPOINTS.COURSES.VIDEOS(courseId));
  }

  async getClasses() {
    return apiService.get<Class>(STAFF_ENDPOINTS.CLASSES.LIST);
  }

  async getPendingAssignments() {
    return apiService.get<Assignment>(STAFF_ENDPOINTS.ASSIGNMENT.PENDING);
  }

  async getGradedAssignments() {
    return apiService.get<Assignment>(STAFF_ENDPOINTS.ASSIGNMENT.GRADED);
  }

  // async getAssignment(assignmentId: string) {
  //   return apiService.get<AssignmentDetails>(STAFF_ENDPOINTS.ASSIGNMENT.DETAILS(assignmentId));
  // }

  async getAssignment () {
      return apiService.get<AssignmentDetails>(STAFF_ENDPOINTS.ASSIGNMENT.DETAILS);
   }

  //  async getSubmissions (assignmentId: string) {
  //   return apiService.get(STAFF_ENDPOINTS.ASSIGNMENT.SUBMISSIONS(assignmentId))
  //  }

  
    async getSubmissions () {
     return apiService.get(STAFF_ENDPOINTS.ASSIGNMENT.SUBMISSIONS)
    }

  async scheduleClass(formData: FormData) {
    return apiService.post(STAFF_ENDPOINTS.CLASSES.SCHEDULE, formData);
  }
  
  async uploadVideoLink(formData: FormData) {
    return apiService.post(STAFF_ENDPOINTS.COURSES.UPLOAD, formData);
  }

  async getStaffProfile () {
    return apiService.get(STAFF_ENDPOINTS.PROFILE.GET)
  }

  async setScore (data: { studentId: string; score: number }) {
    return apiService.post(STAFF_ENDPOINTS.EXAMS.SETSCORE, data)
  }

  async setPassMark (mark: number) {
    return apiService.post(STAFF_ENDPOINTS.EXAMS.SETMARK, { mark })
  }

  async uploadQuestion (file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return apiService.post(STAFF_ENDPOINTS.EXAMS.UPLOAD, formData)
  }

}

export const staffService = new StaffService();