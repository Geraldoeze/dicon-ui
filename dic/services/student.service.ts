import { apiService } from "./api.service";
import { STUDENT_ENDPOINTS } from "./config";
import type {
  Course,
  Assignment,
  Class,
  Exam,
  UserProfile,
  CourseDetails,
  Video,
} from "./types";

interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
  next_of_kin_name: string;
  state: string;
  local_government: string;
  address: string;
}
class StudentService {
  // Course methods
  async getCourses(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
    student_id?: string;
  }) {
    return apiService.get<Course[]>(STUDENT_ENDPOINTS.COURSES.LIST, params);
  }

  async getRegisteredCourses(params?: {
    student_id?: string;
    page: number;
    page_Size: number
  }) {
    return apiService.get<Course[]>(
      STUDENT_ENDPOINTS.COURSES.REGISTERED,
      params
    );

  }
  async studentDashboard() {
    return apiService.get<Video[]>(STUDENT_ENDPOINTS.DASHBOARD.STUDENT);
  }
  async getUnregisteredCourses() {
    return apiService.get<Course[]>(STUDENT_ENDPOINTS.COURSES.UNREGISTERED);
  }

  async registerCourse(courseId: string) {
    return apiService.post(STUDENT_ENDPOINTS.COURSES.REGISTER(courseId), {});
  }

  async retakeCourse(courseId: string) {
    return apiService.post(STUDENT_ENDPOINTS.COURSES.RETAKE(courseId), {});
  }

  async unregisterCourse(courseId: string) {
    return apiService.post(STUDENT_ENDPOINTS.COURSES.UNREGISTER(courseId), {});
  }

  async getCourseDetails(courseId: string) {
    return apiService.get<CourseDetails>(
      STUDENT_ENDPOINTS.COURSES.DETAILS(courseId)
    );
  }

  async getAllVideos() {
    return apiService.get<Video[]>(STUDENT_ENDPOINTS.COURSES.ALLVIDEOS);
  }

  async getCourseVideos(courseId: string) {
    return apiService.get<Video>(STUDENT_ENDPOINTS.COURSES.VIDEOS(courseId));
  }

  async getCourseClasses() {
    return apiService.get<Class>(STUDENT_ENDPOINTS.COURSES.CLASSES);
  }
  // Class methods
  async getClasses(params?: {
    page?: number;
    pageSize?: number;
    date?: string;
    student_id: string;
    course_id: string;
  }) {
    return apiService.get<Class[]>(STUDENT_ENDPOINTS.CLASSES.LIST, params);
  }

  async getUpcomingClasses(params?: { student_id?: string }) {
    return apiService.get<Class[]>(STUDENT_ENDPOINTS.CLASSES.UPCOMING, params);
  }

  async markAttendance(classId: string) {
    return apiService.post(
      STUDENT_ENDPOINTS.CLASSES.MARK_ATTENDANCE(classId),
      {}
    );
  }

  // Assignment methods
  async getPendingAssignments(params?: {
    status?: "pending" | "submitted" | "graded";
    courseId?: string;
    student_id?: string;
  }) {
    return apiService.get<Assignment[]>(
      STUDENT_ENDPOINTS.ASSIGNMENTS.PENDING,
      params
    );
  }

  // async submitAssignment(assignmentId: string, submissionFormData: FormData) {
  //   return apiService.uploadFormData(
  //     STUDENT_ENDPOINTS.ASSIGNMENTS.SUBMIT(assignmentId),
  //     submissionFormData
  //   );
  // }

  // async submitAssignment(
  //   assignmentId: string,
  //   submissionFormData: FormData,
  //   onProgress?: (percentage: number) => void
  // ) {
  //   return apiService.uploadFormData(
  //     STUDENT_ENDPOINTS.ASSIGNMENTS.SUBMIT(assignmentId),
  //     submissionFormData,
  //     onProgress
  //   );
  // }

  async submitAssignment(
    assignmentId: string,
    formData: FormData,
    onProgress?: (percentage: number) => void
  ) {
    return apiService.uploadFormData(
      STUDENT_ENDPOINTS.ASSIGNMENTS.SUBMIT(assignmentId),
      formData,
      onProgress
    );
  }

  async cancelSubmission(assignmentId: string) {
    return apiService.delete(
      STUDENT_ENDPOINTS.ASSIGNMENTS.CANCEL(assignmentId)
    );
  }

  async uploadFile(file: File) {
    return apiService.uploadFormData(STUDENT_ENDPOINTS.UPLOAD.FILE, file);
  }
  async getAssignments(status: string) {
    return apiService.get(STUDENT_ENDPOINTS.ASSIGNMENTS.LIST(status));
  }

  async getAssignment(assignmentId: string) {
    return apiService.get<Assignment>(
      STUDENT_ENDPOINTS.ASSIGNMENTS.ONE(assignmentId)
    );
  }

  async getAssignmentSubmission(assignmentId: string) {
    return apiService.get(
      STUDENT_ENDPOINTS.ASSIGNMENTS.SUBMISSIONS(assignmentId)
    );
  }

  // Fee methods
  // async getFees(params?: {
  //   status?: 'paid' | 'unpaid' | 'overdue';
  //   startDate?: string;
  //   endDate?: string;
  // }) {
  //   return apiService.get<Fee[]>(STUDENT_ENDPOINTS.FEES.LIST, params);
  // }

  // async payFee(feeId: string, paymentDetails: {
  //   amount: number;
  //   payment_method: string;
  //   reference: string;
  // }) {
  //   return apiService.post(STUDENT_ENDPOINTS.FEES.PAY(feeId), paymentDetails);
  // }

  // async getPaymentHistory() {
  //   return apiService.get<Fee[]>(STUDENT_ENDPOINTS.FEES.HISTORY);
  // }

  // Exam methods
  async getExams(params?: {
    status?: "upcoming" | "completed";
    courseId?: string;
  }) {
    return apiService.get<Exam[]>(STUDENT_ENDPOINTS.EXAMS.LIST, params);
  }

  async getExamResults() {
    return apiService.get<Exam[]>(STUDENT_ENDPOINTS.EXAMS.RESULTS);
  }

  // Profile methods
  // async getProfile(userId: string) {
  //   return apiService.get<StudentProfile>(STUDENT_ENDPOINTS.PROFILE.GET(userId));
  // }

  async getProfile() {
    try {
      const response = await apiService.get<UserProfile>("/auth/user");
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }

  async updateProfile(data: UpdateProfileRequest) {
    try {
      const response = await apiService.post("/students/update", data);
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update profile"
      );
    }
  }

  // async updateProfile(profileData: Partial<StudentProfile>) {
  //   return apiService.put(STUDENT_ENDPOINTS.PROFILE.UPDATE, profileData);
  // }

  async uploadProfilePhoto(formData: FormData) {
    return apiService.uploadFormData(
      STUDENT_ENDPOINTS.PROFILE.UPLOAD_PHOTO,
      formData
    );
  }

  async changePassword(passwordData: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }) {
    return apiService.post(
      STUDENT_ENDPOINTS.PROFILE.CHANGE_PASSWORD,
      passwordData
    );
  }

  async uploadDocument(formData: FormData) {
    return apiService.uploadFormData(
      STUDENT_ENDPOINTS.PROFILE.UPLOAD_DOCUMENT,
      formData
    );
  }
}

export const studentService = new StudentService();
