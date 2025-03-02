
export interface Course {
    id: number;
    code: string;
    name: string;
    units: number;
    lecturer: string;
    status: 'active' | 'pending' | 'carryover';
    description: string;
    department: string;
    semester: string;
  }
  
  
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  
  const mockCourses: Course[] = Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1,
    code: `ELE ${321 + index}`,
    name: `Electricity & power ${index + 1}`,
    units: 4,
    lecturer: `Prof Aiyede`,
    status: ['active', 'pending', 'carryover'][Math.floor(Math.random() * 3)] as Course['status'],
    description: 'Introduction to electrical systems and power distribution',
    department: 'Electrical Engineering',
    semester: 'First',
  }));
  
  export const api = {
    getCourses: async (params: {
      status?: Course['status'];
      search?: string;
      department?: string;
      semester?: string;
    }) => {
      await delay(1000); // Simulate network delay
      
      let filteredCourses = [...mockCourses];
      
      if (params.status) {
        filteredCourses = filteredCourses.filter(course => course.status === params.status);
      }
      
      if (params.search) {
        const searchLower = params.search.toLowerCase();
        filteredCourses = filteredCourses.filter(course => 
          course.code.toLowerCase().includes(searchLower) ||
          course.name.toLowerCase().includes(searchLower) ||
          course.lecturer.toLowerCase().includes(searchLower)
        );
      }
      
      if (params.department) {
        filteredCourses = filteredCourses.filter(course => 
          course.department === params.department
        );
      }
      
      if (params.semester) {
        filteredCourses = filteredCourses.filter(course => 
          course.semester === params.semester
        );
      }
  
      return {
        courses: filteredCourses,
        total: filteredCourses.length,
      };
    },
  };