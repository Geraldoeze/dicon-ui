export interface ApiResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    pageSize: number;
  };
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
  course_id: number,
  course_name: string,
  course_code: string,
  units: number,
  total_videos: number,
  total_students: number,
  lecturer_in_charge: string,
  course_type: 'registered' | 'unregistered'
  status: 'registered' | 'unregistered' | 'carryover'
}

export interface CourseDetails {
    id: number,
    name: string,
    description: string,
    created_at: Date,
    updated_at: Date,
    program_id: number,
    lecturer_in_charge: string,
    topics: Topic
}


export interface Topic {
  topic_id: number,
  video_url: string,
  video_title: string
}


export interface Video {
  id: number,
  course_id: number,
  course_name: string,
  course_code: string,
  lecturer_in_charge: string,
  topic_id: number,
  topic_name: string,
  video_url: string,
  title: string,
  created_at: string
}

export type AssignmentStatus = 'pending' | 'submitted' | 'graded';

// export interface Assignment {
 
//   id: number,
//   student_id: number,
//   course_id: number,
//   course_name: string,
//   course_code: number,
//   due_date: number,
//   due_time: string,
//   pass_mark: number,
//   score: number,
//   submission_url: string,
//   submission_date: string
//   submissionMode: 'google_docs' | 'pdf'
// }

export interface Assignment {
  id: string;
  student_id: number;
  course_id: number;
  course_name: string;
  course_code: string;
  due_date: string;
  due_time: string;
  pass_mark: number;
  score: number;
  submission_url?: string;
  submission_date?: string;
}

export interface Submission {
  id: string;
  student_name: string;
  matric_no: string;
  score: number;
  submission_link?: string;
  submission_file?: string;
}

export interface AssignmentDetails {
  id: string;
  course_code: string;
  course_name: string;
  description: string;
  units: number;
  submissions: Submission[];
}

export interface Class {
  
    id: number,
    course_name: string,
    course_code: string,
    topic: string,
    class_link: string,
    start_date: Date,
    start_time: Date,
    end_date: Date,
    end_time: Date

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
  exam_id: number;
  course: string;
  department: string;
  exam_date: string;
  passing_percentage: number;
  scored_percentage: number;
  time_range: string;
  total_attempts: number;
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
  name: string;
  accountType: number;
  profileImage?: string;
  role?: string;
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
  old_password: string;
  current_assword: string;
  new_assword: string;
}

// Staff Types

export interface StaffCourses { 
course_id: number;
course_name: string;
course_code: string;
units: number;
total_videos: number;
total_students: number;
lecturer_in_charge: string;

}

export interface CourseStudents {
  student_id: number;
  student_name: string;
  student_email: string;
  department: string;
}

export interface Dashboard {
  pending_applications: number;
  active_students: number;
  active_staffs: number;
  total_courses: number;
}

export interface Department {
  id: number;
  name: string;
  description: string;
  head_of_department: string;
  total_programs: number;
  total_courses: number;
  total_students: number;
}

export interface FilterOption {
  column: string;
  label: string;
  group?: string;
}

export interface FilterValue {
  column: string;
  value: string;
}