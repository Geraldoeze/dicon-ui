import { QueryParams } from '@/interface/admin';
import { apiService } from './api.service';
import { ADMIN_ENDPOINTS, AUTH_ENDPOINTS, STAFF_ENDPOINTS } from './config';
import { Dashboard, Department, Application, Student, Staffs, Class } from './types';



class AdminService {

    async getApplications() {
        return apiService.get<Application[]>(ADMIN_ENDPOINTS.APPLICATIONS.PENDING);
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
        return apiService.get<Dashboard[]>(ADMIN_ENDPOINTS.DASHBOARD.LIST)
    }

    async getDepartments() {
        return apiService.get<Department[]>(ADMIN_ENDPOINTS.DEPARTMENTS.GET)
    }

    async getDepartment(departmentId: string) {
        return apiService.get<Department[]>(ADMIN_ENDPOINTS.DEPARTMENTS.ONE(departmentId))
    }
    async getDepartmentStudents(departmentId: string) {
        return apiService.get(ADMIN_ENDPOINTS.STUDENTS.DEPARTMENT(departmentId))
    }

    async createDepartment(formData: FormData) {
        return apiService.post(ADMIN_ENDPOINTS.DEPARTMENTS.CREATE, formData);
    }

    async getStudents() {
        return apiService.get(ADMIN_ENDPOINTS.STUDENTS.GET)
    }

    async getStudent(studentId: string) {
        return apiService.get<Student[]>(ADMIN_ENDPOINTS.STUDENTS.ONE(studentId))
    }

    async getStaffs() {
        return apiService.get<Staffs[]>(ADMIN_ENDPOINTS.STAFFS.GET)
    }

    async getStaff(staffId: string) {
        return apiService.get<Staffs>(ADMIN_ENDPOINTS.STAFFS.ONE(staffId))
    }

    async getClasses() {
        return apiService.get<Class>(STAFF_ENDPOINTS.CLASSES.SCHEDULE);
    }

    async register(formData: FormData) {
        return apiService.post(AUTH_ENDPOINTS.REGISTER, formData)
    }


    async getCourses(params?: QueryParams) {
        try {
            const result = await apiService.get(`${ADMIN_ENDPOINTS.COURSES.GET}?page=${params?.page}&page_size=${params?.page_size}&search=${params?.search}`,)
            return result
        } catch (e: any) {
            console.error(e)

            // Return error response
            return {

                data: [],
                meta: {
                    current_page: 1,
                    last_page: 1,
                    total_count: 0,
                },
                message: 'error',
            }
        }

    }

    async getCourse(courseId: string) {
        return apiService.get(ADMIN_ENDPOINTS.COURSES.ONE(courseId))
    }

    async createCourses(formData: FormData) {
        return apiService.post(ADMIN_ENDPOINTS.COURSES.CREATE, formData)
    }


    // async getTotalStaffs(){
    //     return apiService.get(ADMIN_ENDPOINTS.STAFFS.DASHBOARD)
    // }
}

export const adminService = new AdminService();