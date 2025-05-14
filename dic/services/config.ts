import { GET } from "@/app/api/download/route";

// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://0ps.tech/dic/api';
// export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dicnigeria.com.ng/staging/api';
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://dicnigeria.com.ng/api";

// export const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://138.197.7.199:1337/api'

// export const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'https://dic-strapi.onrender.com/api'

export const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  "https://admin.dicnigeria.com.ng/api";

export const STRAPI_ENDPOINTS = {
  NAVIGATION: "/navigations",
  INFO: "/information-headers",
  HERO: "/heroes",
  ABOUT: "/about-uses?populate=images",
  COMMANDANTS: "/commandants?populate=images",
  MV: "/mission-and-visions?populate=images",
  GALLERY: "/galleries?populate=images",
  PG: "/pg-programs",
  DC: "/departments-and-courses",
  NEWS: "/news-and-blogs",
  MANAGEMENT: "/managements",
};

export const AUTH_ENDPOINTS = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  USER: "/auth/user",
  // LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: (email: string) => `/auth/forgot-password?email=${email}`,
  RESET_PASSWORD: "/auth/reset-password",
};

export const API_ENDPOINTS = {
  PROGRAMS: {
    LIST: "/programs",
    GET: (id: string) => `/programs/${id}`,
  },
  APPLICATION: {
    SUBMIT: "/applications",
    GET_STATUS: (id: string) => `/applications/${id}/status`,
    UPDATE: (id: string) => `/applications/${id}`,
    UPLOAD_DOCUMENT: "/applications/upload",
  },
};

export const ADMIN_ENDPOINTS = {
  DASHBOARD: {
    LIST: "/dashboard",
  },
  DEPARTMENTS: {
    GET: "/departments",
    CREATE: "/departments",
    ONE: (departmentId: string) => `/departments/${departmentId}`,
  },
  APPLICATIONS: {
    LIST: "/applications",
    PENDING: "/applications",
    ONE: (applicationId: string) => `/applications/${applicationId}`,
    APPROVE: (applicationId: string) =>
      `/applications/${applicationId}/approve`,
    REJECT: (applicationId: string) => `/applications/${applicationId}/reject`,
  },
  STUDENTS: {
    GET: "/students",
    ONE: (studentId: string) => `/students/profile?student_id=${studentId}`,
    DEPARTMENT: (departmentId: string) =>
      `/students?page=1&page_size=20&department_id=${departmentId}`,
  },
  STAFFS: {
    GET: "/staffs",
    ONE: (staffId: string) => `/staffs/profile?staff_id=${staffId}`,
  },
  COURSES: {
    CREATE: "/courses",
    GET: "/courses",
    EDIT: (programId: string) => `/programs_courses/${programId}`,
    ONE: (courseId: string) => `/courses/${courseId}`,
  },
  BATCH: {
    GET: "/batches",
  },
  PROGRAM: {
    GET: "/programs",
  },
};

export const STAFF_ENDPOINTS = {
  PROFILE: {
    GET: "/staffs/profile",
  },
  // Course Endpoints
  COURSES: {
    LIST: "/staffs/courses",
    DETAILS: (courseId: string) => `/courses/${courseId}`,
    STUDENTS: (courseId: string) => `/courses/students?course_id=${courseId}`,
    VIDEOS: (courseId: string) => `/courses/videos?course_id=${courseId}`,
    UPLOAD: `/courses/videos`,
  },
  //Classes Endpoints
  CLASSES: {
    LIST: `/classes?period=upcoming`,
    SCHEDULE: "/classes",
  },
  //Assignment
  ASSIGNMENT: {
    PENDING: `/assignments/?page=1&page_size=10&status=pending`,
    GRADED: `/assignments/?page=1&page_size=10&status=graded`,
    CREATE: `/assignments/`,
    SUBMISSIONS: (assignmentId: number) =>
      `/assignments/${assignmentId}/submissions`,
    // SUBMISSIONS: `/assignments/submissions?assignment_id=1`,
    DETAILS: `/assignments/1`,
    //DETAILS: (assignmentId: string) => `/assignments/${assignmentId}`
  },

  //Exams
  EXAMS: {
    LIST: (staffId: number) => `/staffs/exams?staff_id=${staffId}`,
    DETAILS: (examId: string, staffId: number) =>
      `/staffs/exams/results?exam_id=${examId}&staff_id=${staffId}`,
    ONE: (examId: string, staffId: number) =>
      `/staffs/exams?staff_id=${staffId}&exam_id=${examId}`,
    SETSCORE: "/exams/set-score",
    SETMARK: "/exams/set-mark",
    UPLOAD: "/exams/upload",
    STUDENTS: (examId: string) => `/exams/students?exam_id=${examId}`,
    RESULTS: (examId: string) => `/exams/results?exam_id=${examId}`,
  },
};

export const STUDENT_ENDPOINTS = {
  DASHBOARD: {
    STUDENT: "/students/dashboard",
  },
  // Course endpoints
  COURSES: {
    LIST: "/students/courses",
    REGISTERED: "/students/courses",
    UNREGISTERED: "/students/courses",
    CarriedOver:
      "/students/courses?student_id=1&search=&course_type=unregistered",
    REGISTER: (courseId: string) =>
      `students/courses/register?course_id=${courseId}`,
    UNREGISTER: (courseId: string) =>
      `/students/courses/${courseId}/unregister`,
    RETAKE: (courseId: string) =>
      `/students/courses/retake?course_id=${courseId}`,
    DETAILS: (courseId: string) => `/courses/${courseId}`,
    VIDEOS: (courseId: string) => `/courses/videos?course_id=${courseId}`,
    ALLVIDEOS: "/courses/videos",
    CLASSES: `/classes`,
  },

  // Class endpoints
  CLASSES: {
    LIST: "students/classes",
    UPCOMING: "students/classes",
    ATTENDANCE: "/students/classes/attendance",
    MARK_ATTENDANCE: (classId: string) => `/students/classes/${classId}/attend`,
    DETAILS: (classId: string) => `/classes/${classId}`,
  },

  // Assignment endpoints
  ASSIGNMENTS: {
    LIST: (status: string) => `/students/assignments/?status=${status}`,
    ONE: (assignmentId: string) => `/assignments/${assignmentId}`,
    PENDING: "students/assignments",
    SUBMITTED: "/students/assignments/submitted",
    SUBMISSIONS: (assignmentId: string) =>
      `/assignments/${assignmentId}/submissions`,
    SUBMIT: (assignmentId: string) =>
      `/students/assignments/${assignmentId}/submit`,
    CANCEL: (assignmentId: string) =>
      `/students/assignments/${assignmentId}/cancel?student_id=1`,
    DETAILS: (assignmentId: string) => `/assignments/${assignmentId}`,
  },

  UPLOAD: {
    FILE: "/api/student/upload",
  },

  // Fee endpoints
  FEES: {
    LIST: "/students/fees",
    PENDING: "/students/fees/pending",
    PAY: (feeId: string) => `/students/fees/${feeId}/pay`,
    HISTORY: "/students/fees/history",
    RECEIPT: (paymentId: string) => `/students/fees/receipt/${paymentId}`,
  },

  // Exam endpoints
  EXAMS: {
    LIST: "/students/exams",
    UPCOMING: "/students/exams/upcoming",
    RESULTS: "/students/exams?student_id=1",
    DETAILS: (examId: string) => `/exams/${examId}`,
    SCHEDULE: "/students/exams/schedule",
  },

  // Profile endpoints
  PROFILE: {
    GET: (userId: string) => `/students/profile?student_id=${userId}`,
    UPDATE: "/students/update",
    UPLOAD_PHOTO: "/students/profile/photo",
    CHANGE_PASSWORD: "/students/profile/password",
    DOCUMENTS: "/students/profile/documents",
    UPLOAD_DOCUMENT: "/students/profile/documents/upload",
  },
};
