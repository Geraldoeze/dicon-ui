import { apiService } from './api.service';
import { STUDENT_ENDPOINTS } from './config';
import type { 
  Course, 
  Assignment, 
  Class, 
  Fee, 
  Exam, 
  StudentProfile 
} from './types';

class StudentService {
  // Course methods
  async getCourses(params?: { 
    page?: number; 
    pageSize?: number; 
    search?: string; 
    status?: string;
  }) {
    return apiService.get<Course[]>(STUDENT_ENDPOINTS.COURSES.LIST, params);
  }

  async getRegisteredCourses() {
    return apiService.get<Course[]>(STUDENT_ENDPOINTS.COURSES.REGISTERED);
  }

  async getUnregisteredCourses() {
    return apiService.get<Course[]>(STUDENT_ENDPOINTS.COURSES.UNREGISTERED);
  }

  async registerCourse(courseId: string) {
    return apiService.post(STUDENT_ENDPOINTS.COURSES.REGISTER(courseId), {});
  }

  async unregisterCourse(courseId: string) {
    return apiService.post(STUDENT_ENDPOINTS.COURSES.UNREGISTER(courseId), {});
  }

  async getCourseDetails(courseId: string) {
    return apiService.get<Course>(STUDENT_ENDPOINTS.COURSES.DETAILS(courseId));
  }

  // Class methods
  async getClasses(params?: { 
    page?: number; 
    pageSize?: number; 
    date?: string;
  }) {
    return apiService.get<Class[]>(STUDENT_ENDPOINTS.CLASSES.LIST, params);
  }

  async getUpcomingClasses() {
    return apiService.get<Class[]>(STUDENT_ENDPOINTS.CLASSES.UPCOMING);
  }

  async markAttendance(classId: string) {
    return apiService.post(STUDENT_ENDPOINTS.CLASSES.MARK_ATTENDANCE(classId), {});
  }

  // Assignment methods
  async getAssignments(params?: { 
    status?: 'pending' | 'submitted' | 'graded';
    courseId?: string;
  }) {
    return apiService.get<Assignment[]>(STUDENT_ENDPOINTS.ASSIGNMENTS.LIST, params);
  }

  async submitAssignment(assignmentId: string, formData: FormData) {
    return apiService.uploadFormData(
      STUDENT_ENDPOINTS.ASSIGNMENTS.SUBMIT(assignmentId),
      formData
    );
  }

  // Fee methods
  async getFees(params?: { 
    status?: 'paid' | 'unpaid' | 'overdue';
    startDate?: string;
    endDate?: string;
  }) {
    return apiService.get<Fee[]>(STUDENT_ENDPOINTS.FEES.LIST, params);
  }

  async payFee(feeId: string, paymentDetails: {
    amount: number;
    payment_method: string;
    reference: string;
  }) {
    return apiService.post(STUDENT_ENDPOINTS.FEES.PAY(feeId), paymentDetails);
  }

  async getPaymentHistory() {
    return apiService.get<Fee[]>(STUDENT_ENDPOINTS.FEES.HISTORY);
  }

  // Exam methods
  async getExams(params?: { 
    status?: 'upcoming' | 'completed';
    courseId?: string;
  }) {
    return apiService.get<Exam[]>(STUDENT_ENDPOINTS.EXAMS.LIST, params);
  }

  async getExamResults() {
    return apiService.get<Exam[]>(STUDENT_ENDPOINTS.EXAMS.RESULTS);
  }

  // Profile methods
  async getProfile() {
    return apiService.get<StudentProfile>(STUDENT_ENDPOINTS.PROFILE.GET);
  }

  async updateProfile(profileData: Partial<StudentProfile>) {
    return apiService.put(STUDENT_ENDPOINTS.PROFILE.UPDATE, profileData);
  }

  async uploadProfilePhoto(formData: FormData) {
    return apiService.uploadFormData(STUDENT_ENDPOINTS.PROFILE.UPLOAD_PHOTO, formData);
  }

  async changePassword(passwordData: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }) {
    return apiService.post(STUDENT_ENDPOINTS.PROFILE.CHANGE_PASSWORD, passwordData);
  }

  async uploadDocument(formData: FormData) {
    return apiService.uploadFormData(
      STUDENT_ENDPOINTS.PROFILE.UPLOAD_DOCUMENT,
      formData
    );
  }
}

export const studentService = new StudentService();