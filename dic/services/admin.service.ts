import { QueryParams, QueryStudentParams } from "@/interface/admin";
import { apiService } from "./api.service";
import { ADMIN_ENDPOINTS, AUTH_ENDPOINTS, STAFF_ENDPOINTS } from "./config";
import {
  Dashboard,
  Department,
  Application,
  Student,
  Staffs,
  Class,
} from "./types";

class AdminService {
  async getApplications(params?: QueryStudentParams) {
    try {
      const result = await apiService.get<Application[]>(
        `${ADMIN_ENDPOINTS.APPLICATIONS.PENDING}?page=${params?.page}&page_size=${params?.page_size}&search=${params?.search}&status=${params?.status}`
      );
      return result;
    } catch (e: any) {
      console.error(e);

      // Return error response
      return {
        data: [],
        meta: {
          current_page: 1,
          last_page: 1,
          total_count: 0,
        },
        message: "error",
      };
    }
    
  }

  async getApplication(applicationId: string) {
    return apiService.get(ADMIN_ENDPOINTS.APPLICATIONS.ONE(applicationId));
  }

  async approveApplication(applicationId: string) {
    return apiService.post(ADMIN_ENDPOINTS.APPLICATIONS.APPROVE(applicationId));
  }

  async rejectApplication(applicationId: string) {
    return apiService.post(ADMIN_ENDPOINTS.APPLICATIONS.REJECT(applicationId));
  }

  async getDashboard() {
    return apiService.get<Dashboard[]>(ADMIN_ENDPOINTS.DASHBOARD.LIST);
  }

  async getDepartments() {
    return apiService.get<Department[]>(ADMIN_ENDPOINTS.DEPARTMENTS.GET);
  }

  async getDepartment(departmentId: string) {
    return apiService.get<Department[]>(
      ADMIN_ENDPOINTS.DEPARTMENTS.ONE(departmentId)
    );
  }
  async getDepartmentStudents(departmentId: string) {
    return apiService.get(ADMIN_ENDPOINTS.STUDENTS.DEPARTMENT(departmentId));
  }

  async createDepartment(formData: FormData) {
    return apiService.post(ADMIN_ENDPOINTS.DEPARTMENTS.CREATE, formData);
  }

  async getStudents(params?: QueryStudentParams) {
    try {
      const result = await apiService.get(
        `${ADMIN_ENDPOINTS.STUDENTS.GET}?page=${params?.page}&page_size=${params?.page_size}&search=${params?.search}&status=${params?.status}`
      );
      return result;
    } catch (e: any) {
      console.error(e);

      // Return error response
      return {
        data: [],
        meta: {
          current_page: 1,
          last_page: 1,
          total_count: 0,
        },
        message: "error",
      };
    }
  }

  async getStudent(studentId: string) {
    return apiService.get<Student[]>(ADMIN_ENDPOINTS.STUDENTS.ONE(studentId));
  }

  async getStaffs(params?: QueryParams) {
    try { 
      const result = await apiService.get<Staffs[]>(
        `${ADMIN_ENDPOINTS.STAFFS.GET}?page=${params?.page}&page_size=${params?.page_size}&search=${params?.search}`
      );
      return result;
    } catch (e: any) {
      console.error(e);

      // Return error response
      return {
        data: [],
        meta: {
          current_page: 1,
          last_page: 1,
          total_count: 0,
        },
        message: "error",
      };
    }
    
  }

  async getStaff(staffId: string) {
    return apiService.get<Staffs>(ADMIN_ENDPOINTS.STAFFS.ONE(staffId));
  }

  async deleteStaff(data: any) {
    return apiService.delete(ADMIN_ENDPOINTS.STAFFS.DELETE, data);
  }

  async getClasses() {
    return apiService.get<Class>(STAFF_ENDPOINTS.CLASSES.SCHEDULE);
  }

  async register(formData: FormData) {
    return apiService.post(AUTH_ENDPOINTS.REGISTER, formData);
  }

  async getCourses(params?: QueryParams) {
    try {
      const result = await apiService.get(
        `${ADMIN_ENDPOINTS.COURSES.GET}?page=${params?.page}&page_size=${params?.page_size}&search=${params?.search}`
      );
      return result;
    } catch (e: any) {
      console.error(e);

      // Return error response
      return {
        data: [],
        meta: {
          current_page: 1,
          last_page: 1,
          total_count: 0,
        },
        message: "error",
      };
    }
  }

  async getCourse(courseId: string) {
    return apiService.get(ADMIN_ENDPOINTS.COURSES.ONE(courseId));
  }

  async createCourses(formData: FormData) {
    return apiService.post(ADMIN_ENDPOINTS.COURSES.CREATE, formData);
  }

  async editCourses(formData: any) {
    const data = JSON.stringify(formData.lecturer_id)
    return apiService.put(ADMIN_ENDPOINTS.COURSES.EDIT(formData.program_id), formData);
  }

  async getBatch() {
    return apiService.get(ADMIN_ENDPOINTS.BATCH.GET);
  }

  async getProgram() {
    return apiService.get(ADMIN_ENDPOINTS.PROGRAM.GET);
  }


  async getDegree() {
    return apiService.get<any[]>(ADMIN_ENDPOINTS.DEGREE.GET);
  }

  // async getTotalStaffs(){
  //     return apiService.get(ADMIN_ENDPOINTS.STAFFS.DASHBOARD)
  // }
}

export const adminService = new AdminService();
