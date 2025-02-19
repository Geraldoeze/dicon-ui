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
  }
};

export const ADMIN_ENDPOINTS = {
    DASHBOARD: {
      LIST: '/dashboard'
    },
    DEPARTMENTS: {
      GET: '/departments'
    },
    APPLICATIONS: {
      LIST: '/applications',
      PENDING: '/applications?page=1&page_size=10&status=pending',
    },
    STUDENTS: {
     
    },
    STAFFS: {
      
    }
};

export const STAFF_ENDPOINTS = {
  PROFILE: {
    GET: '/staffs/profile',
  },
  // Course Endpoints
  COURSES: {
    LIST: '/staffs/courses?staff_id=16',
    DETAILS: (courseId: string) => `/courses/${courseId}`,
    STUDENTS: (courseId: string) => `/courses/students?course_id=${courseId}`,
    VIDEOS: (courseId: string) => `/courses/videos?course_id=${courseId}`,
    UPLOAD: `/courses/videos`
  },
  //Classes Endpoints
  CLASSES: {
    LIST: `/classes?period=upcoming`,
    SCHEDULE: '/classes'
  },
  //Assignment
  ASSIGNMENT: {
    PENDING: `/assignments/?page=1&page_size=10&status=pending`,
    GRADED:  `/assignments/?page=1&page_size=10&status=graded`,
    CREATE:  `/assignments/`,
    SUBMISSIONS: (assignmentId: string) => `/assignments/submissions?assignment_id=${assignmentId}`,
    DETAILS: `/assignments/1`
    //DETAILS: (assignmentId: string) => `/assignments/${assignmentId}`
  },
  
  //Exams
  EXAMS: {
    LIST: '/exams/?page=1&page_size=10',
    DETAILS: (examId: string) => `/exams/${examId}`,
    SETSCORE: '/exams/set-score',
    SETMARK: '/exams/set-mark',
    UPLOAD: '/exams/upload',
    STUDENTS: (examId: string) => `/exams/students?exam_id=${examId}`,
    RESULTS: (examId: string) => `/exams/results?exam_id=${examId}`,
  }


}

export const STUDENT_ENDPOINTS = {
  
  // Course endpoints
  COURSES: {
    LIST: '/students/courses?student_id=1&search=',
    REGISTERED: '/students/courses?student_id=1&search=&course_type=registered',
    UNREGISTERED: '/students/courses?student_id=1&search=&course_type=unregistered',
    CarriedOver: '/students/courses?student_id=1&search=&course_type=unregistered',
    REGISTER: (courseId: string) => `students/courses/register?course_id=${courseId}`,
    UNREGISTER: (courseId: string) => `/students/courses/${courseId}/unregister`,
    DETAILS: (courseId: string) => `/courses/${courseId}`,
    VIDEOS: (courseId: string) => `/courses/videos?course_id=${courseId}`,
    ALLVIDEOS: '/courses/videos?course_id=1',
    CLASSES: `/classes`,

  },
  
  // Class endpoints
  CLASSES: {
    LIST: 'students/classes?student_id=1',
    UPCOMING: 'students/classes?student_id=1',
    ATTENDANCE: '/students/classes/attendance',
    MARK_ATTENDANCE: (classId: string) => `/students/classes/${classId}/attend`,
    DETAILS: (classId: string) => `/classes/${classId}`,
  },
  
  // Assignment endpoints
  ASSIGNMENTS: {
    LIST: '/assignments/?student_id=1',
    ONE: (assignmentId: number) => `/assignments/${assignmentId}`,
    PENDING: '/students/assignments/?student_id=1&page=1&page_size=10&status=pending',
    SUBMITTED: '/students/assignments/submitted',
    SUBMIT: (assignmentId: number) => `/students/assignments/${assignmentId}/submit`,
    DETAILS: (assignmentId: string) => `/assignments/${assignmentId}`,
  },

  UPLOAD: {
    FILE: '/api/student/upload',
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
    RESULTS: '/students/exams?student_id=1',
    DETAILS: (examId: string) => `/exams/${examId}`,
    SCHEDULE: '/students/exams/schedule',
  },
  
  // Profile endpoints
  PROFILE: {
    GET: (userId: string) => `/students/profile?student_id=${userId}`,
    UPDATE: '/students/update',
    UPLOAD_PHOTO: '/students/profile/photo',
    CHANGE_PASSWORD: '/students/profile/password',
    DOCUMENTS: '/students/profile/documents',
    UPLOAD_DOCUMENT: '/students/profile/documents/upload',
  }
};