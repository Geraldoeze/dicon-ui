import {apiService} from './api.service';
import { ADMIN_ENDPOINTS } from './config';
import { Dashboard } from './types';


class AdminService {

    async getApplications() {
        return apiService.get(ADMIN_ENDPOINTS.APPLICATIONS.PENDING);
    }

    async getApplication(applicationId: string) {
        return apiService.get(ADMIN_ENDPOINTS.APPLICATIONS.ONE(applicationId));
    }

    async approveApplication(applicationId: string) {
        return apiService.get(ADMIN_ENDPOINTS.APPLICATIONS.APPROVE(applicationId));
    }

    async rejectApplication(applicationId: string) {
        return apiService.get(ADMIN_ENDPOINTS.APPLICATIONS.REJECT(applicationId));
    }

    async getDashboard(){
        return apiService.get<Dashboard>(ADMIN_ENDPOINTS.DASHBOARD.LIST)
    }

    async getDepartments(){
        return apiService.get(ADMIN_ENDPOINTS.DEPARTMENTS.GET)
    }

    async createDepartment(formData: FormData) {
        return apiService.post(ADMIN_ENDPOINTS.DEPARTMENTS.CREATE, formData);
      }

    async getStudents(){
        return apiService.get(ADMIN_ENDPOINTS.STUDENTS.GET)
    }

    async getStudent(studentId: string){
        return apiService.get(ADMIN_ENDPOINTS.STUDENTS.ONE(studentId))
    }

    async getStaffs(){
        return apiService.get(ADMIN_ENDPOINTS.STAFFS.GET)
    }

    async getStaff(){
        return apiService.get(ADMIN_ENDPOINTS.STAFFS.ONE)
    }
      



    // async getTotalStaffs(){
    //     return apiService.get(ADMIN_ENDPOINTS.STAFFS.DASHBOARD)
    // }
}

export const adminService = new AdminService();