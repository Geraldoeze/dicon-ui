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
        requirements: 'Candidates applying for the PhD degree in Geography and Environmental Sustainability, Cartography and Remote Sensing should hold Master’s degree with a minimum CGPA of at least 3.5 on a scale of 5.0 in a relevant area of Geography or the related disciplines.'
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
        requirements: 'The basic entry qualification for admission into the PhD programme is a Master\'s Degree in relevant areas from the University of Nigeria or other recognised universities with at least 3.50 CGPA on a 5-point scale. In addition, the candidate must satisfy the Departmental O\'Level and /or Direct Entry general entry requirements for degree programmes.'
      },
      {
        level: 'PGD',
        gpa: '3.0 / 5.0',
        requirements: 'The basic entry qualification for admission into the PGD is HND in any academic field. M.Sc. programme is a Bachelor’s Degree with at least a Second-Class Lower Division with not less than 3.00 GPA or its equivalent in Social, Management Science or other related fields. Also, candidates with appropriate Postgraduate Diploma of the University of Nigeria or of other recognised Universities with at least 3.50 GPA on a 5-point scale. In addition, the candidate must satisfy the Departmental O’Level and/or Direct Entry general entry requirements for degree programmes.'
      }
    ]
  },
  {
    id: 'sociology',
    name: 'Department of Sociology/Anthropology M.Sc. and PGD',
    courses: [
      'Crimiology and Conflict and Change',
    ],
    degrees: [
      {
        level: 'M.Sc.',
        gpa: '3.0 / 5.0',
        requirements: 'BSc holders with pass degree with 5 years and above post-graduation experience.'
      },
      {
        level: 'PGD',
        gpa: '3.0 / 5.0',
        requirements: 'HND holders with a minimum of Upper Credit from recognized institution may also be considered.'
      }
    ]
  },
  {
    id: 'social_policy',
    name: 'Institute of Social Policy M.Sc. and Ph.D',
    courses: [
      'Social Policy',
    ],
    degrees: [
      {
        level: 'M.Sc.',
        gpa: '3.0 / 5.0',
        requirements: 'Five (5) O-level credits passes including English Language and Mathematics and Candidates with at least 2nd Class honours Lower Division in Social or Management Science; or Candidates with a PGD in Social Policy with a CGPA of 3.5 on a 5-point scale or its equivalent.'
      },
      {
        level: 'PhD',
        gpa: '3.0 / 5.0',
        requirements: 'Candidates for PhD programme must have academic Master’s degree in Social Policy with a minimum CGPA of 3.0/4.0 or 3.5/5.0 and Project score not lower than 60% Candidates for PhD programme with the required CGPA of 3.0/4.0 or 3.5/5.0 and Project score not lower than 60% but without Master’s degree in Social Policy will be admitted for M.Sc./PhD. The candidate will take relevant M.Sc. courses in Social Policy for one session before seeking for firm registration for Ph.D programme. Candidates must demonstrate adequate intellectual capacity, maturity and effective decision making and problem solving potentials. In addition to the above, the Candidates must have made at least 2nd class honours lower division with a CPGA of not lower than 2.5 plus the basic requirements in WASC/GCE O’Level for the first degree.'
      }
    ]
  },

  {
    id: 'psychology',
    name: 'Department of Psychology PGD, M.Sc. and PhD',
    courses: [
      'Criminal Psychology and Forensic Studies',
    ],
    degrees: [
      {
        level: 'M.Sc.',
        gpa: '3.0 / 5.0',
        requirements: 'The entry qualification for admission into the M.Sc. programme is a Bachelor’s Degree with at least a Second-Class Lower Division with not less than 3.00 GPA or its equivalent in Psychology or other related fields in Criminal and Forensic Science. Also, candidates with appropriate Postgraduate Diploma of the University of Nigeria or of other recognised Universities with at least 3.50 GPA on a 5-point scale.'
      },
      {
        level: 'PGD',
        gpa: '3.0 / 5.0',
        requirements: 'The basic entry qualification for admission into the PGD is HND in any academic field.'
      },
      {
        level: 'PhD',
        gpa: '3.50 / 5.0',
        requirements: 'While the basic entry qualification for admission into the PhD programme is a Master\'s Degree in relevant areas from the University of Nigeria or other recognised universities with at least 3.50 CGPA on a 5-point scale.'
      }
    ]
  },

  {
    id: 'public_administration',
    name: 'Department of Public Administration PGD, M.Sc and PhD',
    courses: [
      'Strategic Intelligence and Security Management',
    ],
    degrees: [
      {
        level: 'M.Sc.',
        gpa: '3.0 / 5.0',
        requirements: 'The criteria for admission into M.Sc. Strategic Intelligence programme will be as follows: Five (5) O-level credits passes including English; Candidates with at least 2nd Class honours Lower Division in Social or Management Science or other related fields. Candidates with a PGD in Social Policy with a CGPA of 3.5 on a 5 point scale or its equivalent.'
      },
      {
        level: 'PGD',
        gpa: '3.0 / 5.0',
        requirements: 'The basic entry qualification for admission into the PGD is HND in any academic field.'
      },
      {
        level: 'PhD',
        gpa: '3.50 / 5.0',
        requirements: 'the basic entry qualification for admission into the PhD programme is a Master\'s Degree in relevant areas from the University of Nigeria or other recognised universities with at least 3.50 CGPA on a 5-point scale. In addition, the candidate must satisfy the Departmental O\'Level and /or Direct Entry general entry requirements for degree programmes.'
      }
    ]
  },


];

const departments: Department[] = [
  {
    id: 'professional-studies',
    name: 'Professional Studies',
    title: 'Department of Professional Studies',
    description: 'The Department of Professional Studies is a premier institution for the study of intelligence and strategic security. Our department is designed to provide students with a comprehensive understanding of the principles and practices of intelligence and strategic security, as well as the technical skills needed to succeed in this field. Our faculty is comprised of experienced professionals from the intelligence and security communities, who provide students with a unique perspective on the challenges and opportunities in this field.',
    image: '/mision.jpg'
  },
  {
    id: 'counter-intelligence',
    name: 'Counter Intelligence',
    title: 'Department of Counter Intelligence',
    description: `The Counter Intelligence department is dedicated to protecting sensitive information and operations from foreign intelligence activities. It is responsible for identifying and neutralizing threats to national security, and for developing and implementing strategies to counter the intelligence activities of foreign governments and other malicious actors. The department is also responsible for providing training and support to other law enforcement agencies and government organizations in the area of counter-intelligence.`,
    image: '/mision.jpg'
  },
  {
    id: 'technical-studies',
    name: 'Technical Studies',
    title: 'Department of Technical Studies',
    description: 'Our Technical Studies department provides cutting-edge training in a wide range of intelligence gathering technologies, including cybersecurity, cryptography, surveillance systems, and geospatial analysis. Our expert instructors offer hands-on training and real-world examples to help students master the technical skills needed to succeed in the field of intelligence.',
    image: '/mision.jpg'
  },
  {
    id: 'general-studies',
    name: 'General Studies',
    title: 'Department of General Studies',
    description: `The General Studies department offers foundational courses essential for intelligence operations, including introductory courses in intelligence history, ethics, and law, as well as courses in research methods, statistics, and critical thinking. Our courses are designed to provide students with a broad-based understanding of the intelligence field and the skills needed to succeed in it.`,
    image: '/mision.jpg'
  },
  {
    id: 'joint-military',
    name: 'Joint Military',
    title: 'Department of Joint Military Operations',
    description: 'This department is dedicated to enhancing collaboration and information sharing among various military branches. It aims to ensure seamless integration of intelligence efforts, optimize joint operational effectiveness, and provide comprehensive strategic insights to support national defense objectives.',
    image: '/mision.jpg'
  },
  {
    id: 'languages',
    name: 'Languages',
    title: 'Department of Languages',
    description: 'The Language department offers courses in strategic foreign languages, enabling students to communicate effectively with international partners and adversaries. Our curriculum covers languages such as Arabic, Chinese, French, German, Japanese, Korean, Portuguese, Russian, and Spanish, as well as specialized courses in languages like Pashto and Dari. Through interactive exercises, role-playing, and real-world scenarios, our expert instructors help students develop listening, speaking, reading, and writing skills in their chosen language.',
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
      'Psychological Operations Course',
      'Intelligence Analysis Officers\' Course', 
      'Security Investigation and Interrogation Course',
      'Document Security Course',
      'Joint Military Attache / Advisers Course',
      'Special Intelligence and Security Course'
    ],
  },
  {
    id: '3',
    title: 'Language Courses',
    course_types: 
    [
      'Basic French Course',
      'Intermediate French Language Course', 
      'Basic German Language Course'
    ],
  },
  {
    id: '4',
    title: 'Strategic Courses',
    course_types: 
    [
      'The National Security Training Seminar',
      'Intelligence Analysis Course', 
      'Peace and Conflict Studies',
      'Strategic Security Course'
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
      src: '/image 157.png',
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