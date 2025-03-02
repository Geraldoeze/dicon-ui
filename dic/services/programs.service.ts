import { apiService } from './api.service';
import { API_ENDPOINTS } from './config';
import { Program } from './types';

class ProgramsService {
  // async getPrograms(): Promise<ApiResponse<Program[]>> {
  //   return apiService.get<Program[]>(API_ENDPOINTS.PROGRAMS.LIST);
  // }

  // async getProgram(id: string): Promise<ApiResponse<Program>> {
  //   return apiService.get<Program>(API_ENDPOINTS.PROGRAMS.GET(id));
  // }

  async getPrograms(): Promise<Program[]> {
    const response = await apiService.get<Program[]>(API_ENDPOINTS.PROGRAMS.LIST);
    return response;
  }

  async getProgram(id: number): Promise<Program> {
    const response = await apiService.get<Program>(API_ENDPOINTS.PROGRAMS.GET(id));
    return response;
  }
}

export const programsService = new ProgramsService();
