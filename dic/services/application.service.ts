import { apiService } from './api.service';
import { API_ENDPOINTS } from './config';
import { ApplicationFormData, ApplicationStatus, ApiResponse } from './types';

class ApplicationService {
  async submitApplication(data: ApplicationFormData): Promise<ApiResponse<any>> {
    const formData = new FormData();

    // Append all non-file fields
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    return apiService.uploadFormData(API_ENDPOINTS.APPLICATION.SUBMIT, formData);
  }

  async getApplicationStatus(applicationId: string): Promise<ApiResponse<ApplicationStatus>> {
    return apiService.get(API_ENDPOINTS.APPLICATION.GET_STATUS(applicationId));
  }

  async updateApplication(
    applicationId: string,
    data: Partial<ApplicationFormData>
  ): Promise<ApiResponse<any>> {
    return apiService.put(API_ENDPOINTS.APPLICATION.UPDATE(applicationId), data);
  }
}

export const applicationService = new ApplicationService();