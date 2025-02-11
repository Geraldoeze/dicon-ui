export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://dic.0ps.tech/api';



export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  CHANGE_PASSWORD: '/auth/change-password',
  VERIFY_TOKEN: '/auth/verify'
};

export const API_ENDPOINTS = {
  PROGRAMS: {
    LIST: '/programs',
    GET: (id: string) => `/programs/${id}`,
  },
  APPLICATION: {
    SUBMIT: '/applications',
    GET_STATUS: (id: string) => `/applications/${id}/status`,
    UPDATE: (id: string) => `/applications/${id}`,
    UPLOAD_DOCUMENT: '/applications/upload',
  },
  // STUDENT: {
  //   GET: (id: string) => `/students/${id}`,
  //   REGISTERED: '/students/courses?student_id=1&search=&course_type=registered',
  //   PENDING_ASSIGNMENTS: '/assignments/?student_id=1&status=pending',
  //   GET_CLASSES: '/students/classes?student_id=1',
  //   GET_COURSES:'/students/courses?student_id=1&page=1&page_size=5&search=&course_type=registered',
  //   GET_A_COURSE: '/courses/1',
  //   UNREGISTERED: '/students/courses?student_id=1&search=&course_type=unregistered',
  //   REGISTER: '/students/courses/register?course_id=1',
  // }

};


export const STUDENT_ENDPOINTS = {
  // Course endpoints
  COURSES: {
    LIST: '/students/courses',
    REGISTERED: '/students/courses?student_id=1&search=&course_type=registered',
    UNREGISTERED: '/students/courses/unregistered',
    REGISTER: (courseId: string) => `/students/courses/${courseId}/register`,
    UNREGISTER: (courseId: string) => `/students/courses/${courseId}/unregister`,
    DETAILS: (courseId: string) => `/courses/${courseId}`,
    MATERIALS: (courseId: string) => `/courses/${courseId}/materials`,
  },
  
  // Class endpoints
  CLASSES: {
    LIST: '/students/classes',
    UPCOMING: '/students/classes/upcoming',
    ATTENDANCE: '/students/classes/attendance',
    MARK_ATTENDANCE: (classId: string) => `/students/classes/${classId}/attend`,
    DETAILS: (classId: string) => `/classes/${classId}`,
  },
  
  // Assignment endpoints
  ASSIGNMENTS: {
    LIST: '/students/assignments',
    PENDING: '/students/assignments/pending',
    SUBMITTED: '/students/assignments/submitted',
    SUBMIT: (assignmentId: string) => `/students/assignments/${assignmentId}/submit`,
    DETAILS: (assignmentId: string) => `/assignments/${assignmentId}`,
  },
  
  // Fee endpoints
  FEES: {
    LIST: '/students/fees',
    PENDING: '/students/fees/pending',
    PAY: (feeId: string) => `/students/fees/${feeId}/pay`,
    HISTORY: '/students/fees/history',
    RECEIPT: (paymentId: string) => `/students/fees/receipt/${paymentId}`,
  },
  
  // Exam endpoints
  EXAMS: {
    LIST: '/students/exams',
    UPCOMING: '/students/exams/upcoming',
    RESULTS: '/students/exams/results',
    DETAILS: (examId: string) => `/exams/${examId}`,
    SCHEDULE: '/students/exams/schedule',
  },
  
  // Profile endpoints
  PROFILE: {
    GET: '/students/profile',
    UPDATE: '/students/profile',
    UPLOAD_PHOTO: '/students/profile/photo',
    CHANGE_PASSWORD: '/students/profile/password',
    DOCUMENTS: '/students/profile/documents',
    UPLOAD_DOCUMENT: '/students/profile/documents/upload',
  }
};