import {apiService} from './api.service';
import { ADMIN_ENDPOINTS } from './config';
import { Dashboard } from './types';


class AdminService {

    async getApplications() {
        return apiService.get(ADMIN_ENDPOINTS.APPLICATIONS.PENDING);
    }

    async getDashboard(){
        return apiService.get<Dashboard>(ADMIN_ENDPOINTS.DASHBOARD.LIST)
    }

    async getDepartments(){
        return apiService.get(ADMIN_ENDPOINTS.DEPARTMENTS.GET)
    }

    // async getTotalStaffs(){
    //     return apiService.get(ADMIN_ENDPOINTS.STAFFS.DASHBOARD)
    // }
}

export const adminService = new AdminService();