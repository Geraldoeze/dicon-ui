export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

export interface Program {
  id: string;
  program: string;
  degree_id: number;
  department_id: number;
}

export interface ApplicationFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  dob: string;
  program_id: string;
  photo?: File;
  application_form?: File;
}

export interface ApplicationStatus {
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  updatedAt:  string;
}


export interface Course {
  id: number;
  code: string;
  title: string;
  description: string;
  credits: number;
  instructor: string;
  schedule: string;
  status: 'registered' | 'unregistered';
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  due_date: string;
  course_id: number;
  course_title: string;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  feedback?: string;
  submission_url?: string;
}

export interface Class {
  id: number;
  course_id: number;
  course_title: string;
  instructor: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  topic: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Fee {
  id: number;
  description: string;
  amount: number;
  due_date: string;
  status: 'paid' | 'unpaid' | 'overdue';
  payment_date?: string;
  payment_reference?: string;
}

export interface Exam {
  id: number;
  course_id: number;
  course_title: string;
  type: 'midterm' | 'final' | 'quiz';
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  duration: number;
  status: 'upcoming' | 'completed';
  score?: number;
}

export interface StudentProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  registration_number: string;
  department: string;
  program: string;
  level: string;
  admission_date: string;
  status: 'active' | 'suspended' | 'graduated';
  profile_picture?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserProfile {
  id: number;
  accountType: number;
  
}

export interface ServerLoginResponse {
  user_id: number;
  account_type: number;
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: ServerLoginResponse;
  tokens: AuthTokens;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}