type GalleryImage = {
  id: string;
  src: string;
  alt: string;
}


type BlogPost = {
  id: string;
  title: string;
  content: string;
  source: string;
  date: string;
  time: string;
}

type CourseTypes = {
  id: string;
  title: string;
  course_types: Array<string>;
}

type Department = {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
}

interface DegreeRequirement {
  level: 'M.Sc.' | 'PhD' | 'PGD';
  requirements: string;
  gpa: string;
}

interface Program {
  id: string;
  name: string;
  courses: string[];
  degrees: DegreeRequirement[];
}




 const programs: Program[] = [
  {
    id: 'geography',
    name: 'Department of Geography and Environmental Sustainability',
    courses: [
      'Cartography',
      'Remote Sensing',
      'Geographic Information System'
    ],
    degrees: [
      {
        level: 'M.Sc.',
        gpa: '3.0 / 5.0',
        requirements: 'Candidates applying for the M.Sc. degree in Geography should hold Bachelors degree with a minimum CGPA of 3.0 on a scale of 5.0 in Geography, Education/Geography or related disciplines in the Social, Physical, Biological, Agricultural and Environmental Sciences or Engineering etc.'
      },
      {
        level: 'PhD',
        gpa: '3.0 / 5.0',
        requirements: 'PhD requirements for Geography department...'
      }
    ]
  },
  {
    id: 'political-science',
    name: 'Department of Political Science',
    courses: [
      'Cartography',
      'Conflict, Peace & Strategic Studies',
      'Human Security & Counter-Terrorism',
      'Geographic Information System'
    ],
    degrees: [
      {
        level: 'M.Sc.',
        gpa: '3.0 / 5.0',
        requirements: 'The basic entry qualification for admission into the M.Sc. programme is a Bachelor\'s Degree with at least a Second-Class Lower Division with not less than 3.00 GPA or its equivalent. Also, candidates with appropriate Postgraduate Diploma of the University of Nigeria or of other recognized Universities with at least 3.50 GPA on a 5-point scale. In addition, the candidate must satisfy the Departmental O\'Level and/or Direct Entry general entry requirements for degree programmes.'
      },
      {
        level: 'PhD',
        gpa: '3.0 / 5.0',
        requirements: 'PhD requirements...'
      },
      {
        level: 'PGD',
        gpa: '3.0 / 5.0',
        requirements: 'PGD requirements...'
      }
    ]
  }
  // ... Add other departments similarly
];

const departments: Department[] = [
  {
    id: 'professional-studies',
    name: 'Professional Studies',
    title: 'Department of Professional Studies',
    description: 'The Defence Intelligence College (DIC) hitherto known as the Defence Intelligence School (DIS) was established in 2001. At inception it was located at a temporary site within the Headquarters of the Defence Intelligence Agency (DIA) in Bonny Camp Lagos. However, due to the need for a large space and conducive environment, the school was relocated to its present location in Karu a suburb of Federal Capital Territory Abuja in October 2005.',
    image: '/mision.jpg'
  },
  {
    id: 'counter-intelligence',
    name: 'Counter Intelligence',
    title: 'Department of Counter Intelligence',
    description: 'The Counter Intelligence department focuses on protecting sensitive information and operations from foreign intelligence activities...',
    image: '/mision.jpg'
  },
  {
    id: 'technical-studies',
    name: 'Technical Studies',
    title: 'Department of Technical Studies',
    description: 'Our Technical Studies department provides cutting-edge training in intelligence gathering technologies...',
    image: '/mision.jpg'
  },
  {
    id: 'general-studies',
    name: 'General Studies',
    title: 'Department of General Studies',
    description: 'The General Studies department offers foundational courses essential for intelligence operations...',
    image: '/mision.jpg'
  },
  {
    id: 'joint-military',
    name: 'Joint Military',
    title: 'Department of Joint Military Operations',
    description: 'This department specializes in coordinating intelligence operations across different military branches...',
    image: '/mision.jpg'
  },
  {
    id: 'languages',
    name: 'Languages',
    title: 'Department of Languages',
    description: 'Our Language department provides comprehensive training in strategic foreign languages...',
    image: '/mision.jpg'
  }
];

const courses: CourseTypes[] = [
  {
    id: '1',
    title: 'Generic Courses',
    course_types:
     [
      'Basic Intelligence Officers\' Course',
      'Defence Intelligence Officers\' Course', 
      'Advanced Defence Intelligence Officers\' Course',
      'Junior Defence Intelligence Basic Course',
      'Junior Defence Intelligence Intermediate Course',
      'Junior Defence Intelligence Advanced Course'
    ]
  },
  {
    id: '2',
    title: 'Specialized Courses',
    course_types: 
    [
      'Basic Intelligence Officers\' Course',
      'Defence Intelligence Officers\' Course', 
      'Advanced Defence Intelligence Officers\' Course',
      'Junior Defence Intelligence Basic Course',
      'Junior Defence Intelligence Intermediate Course',
      'Junior Defence Intelligence Advanced Course'
    ],
  },
  {
    id: '3',
    title: 'Language Courses',
    course_types: 
    [
      'Basic Intelligence Officers\' Course',
      'Defence Intelligence Officers\' Course', 
      'Advanced Defence Intelligence Officers\' Course',
      'Junior Defence Intelligence Basic Course',
      'Junior Defence Intelligence Intermediate Course',
      'Junior Defence Intelligence Advanced Course'
    ],
  },
  {
    id: '4',
    title: 'Strategic Courses',
    course_types: 
    [
      'Basic Intelligence Officers\' Course',
      'Defence Intelligence Officers\' Course', 
      'Advanced Defence Intelligence Officers\' Course',
      'Junior Defence Intelligence Basic Course',
      'Junior Defence Intelligence Intermediate Course',
      'Junior Defence Intelligence Advanced Course'
    ],
  },

]

const galleryImages: GalleryImage[] = [
    {
      id: '1',
      src: '/1.JPG',
      alt: 'Military personnel speaking at podium'
    },
    {
      id: '2',
      src: '/2.JPG',
      alt: 'Military personnel speaking at podium'
    },
    {
      id: '3',
      src: '/3.JPG',
      alt: 'Military personnel speaking at podium'
    },
    {
      id: '4',
      src: '/4.JPG',
      alt: 'Military personnel speaking at podium'
    },
    {
      id: '5',
      src: '/5.JPG',
      alt: 'Military personnel speaking at podium'
    },
    {
      id: '6',
      src: '/6.JPG',
      alt: 'Military personnel speaking at podium'
    },
    
  ];

const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'News Headline',
      content: 'Well trained, patriotic and highly motivated manpower working with cutting edge technology under an effective leadership in collaboration with frie...',
      source: 'Al - jazeerah',
      date: '24th Jan 2025',
      time: '20:00'
    },
    {
      id: '2',
      title: 'News Headline',
      content: 'Well trained, patriotic and highly motivated manpower working with cutting edge technology under an effective leadership in collaboration with frie...',
      source: 'Al - jazeerah',
      date: '24th Jan 2025',
      time: '20:00'
    },
    {
      id: '3',
      title: 'News Headline',
      content: 'Well trained, patriotic and highly motivated manpower working with cutting edge technology under an effective leadership in collaboration with frie...',
      source: 'Al - jazeerah',
      date: '24th Jan 2025',
      time: '20:00'
    },
    {
      id: '4',
      title: 'News Headline',
      content: 'Well trained, patriotic and highly motivated manpower working with cutting edge technology under an effective leadership in collaboration with frie...',
      source: 'Al - jazeerah',
      date: '24th Jan 2025',
      time: '20:00'
    },
    {
      id: '5',
      title: 'News Headline',
      content: 'Well trained, patriotic and highly motivated manpower working with cutting edge technology under an effective leadership in collaboration with frie...',
      source: 'Al - jazeerah',
      date: '24th Jan 2025',
      time: '20:00'
    },
    {
      id: '6',
      title: 'News Headline',
      content: 'Well trained, patriotic and highly motivated manpower working with cutting edge technology under an effective leadership in collaboration with frie...',
      source: 'Al - jazeerah',
      date: '24th Jan 2025',
      time: '20:00'
    },
    {
      id: '7',
      title: 'News Headline',
      content: 'Well trained, patriotic and highly motivated manpower working with cutting edge technology under an effective leadership in collaboration with frie...',
      source: 'Al - jazeerah',
      date: '24th Jan 2025',
      time: '20:00'
    },
    {
      id: '8',
      title: 'News Headline',
      content: 'Well trained, patriotic and highly motivated manpower working with cutting edge technology under an effective leadership in collaboration with frie...',
      source: 'Al - jazeerah',
      date: '24th Jan 2025',
      time: '20:00'
    },
    {
      id: '9',
      title: 'News Headline',
      content: 'Well trained, patriotic and highly motivated manpower working with cutting edge technology under an effective leadership in collaboration with frie...',
      source: 'Al - jazeerah',
      date: '24th Jan 2025',
      time: '20:00'
    },
    // {
    //   id: '10',
    //   title: 'News Headline',
    //   content: 'Well trained, patriotic and highly motivated manpower working with cutting edge technology under an effective leadership in collaboration with frie...',
    //   source: 'Al - jazeerah',
    //   date: '24th Jan 2025',
    //   time: '20:00'
    // },
    // {
    //   id: '11',
    //   title: 'News Headline',
    //   content: 'Well trained, patriotic and highly motivated manpower working with cutting edge technology under an effective leadership in collaboration with frie...',
    //   source: 'Al - jazeerah',
    //   date: '24th Jan 2025',
    //   time: '20:00'
    // },
    
  ];

export {galleryImages, blogPosts, courses, departments, programs};