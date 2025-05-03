import { apiService } from "./api.service";
import { STRAPI_ENDPOINTS } from "./config";



interface Nav {
    data: [{
    id: number;
    documentId: string;
    title: string;
    link: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}]
}

interface Hero {
    data: [{ 
    id: number;
    documentId: string;
    title: string;
    description: string;
    videoUrl: string;
    createdAt:string;
    updatedAt: string;
    publishedAt: string;
}]
}

interface ApiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  width: number;
  height: number;
  url: string;
  formats: {
    thumbnail: {
      width: number;
      height: number;
      url: string;
    };
    small: {
      width: number;
      height: number;
      url: string;
    };
    medium: {
      width: number;
      height: number;
      url: string;
    };
    large: {
      width: number;
      height: number;
      url: string;
    };
  };
}

interface Timeline {
    data: [{
      id: number;
      documentId: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      history_content: [{
        year: string;
        title: string;
        description: string;
      }];
      images : ApiImage[];
    }]
}

interface MV {
    data: [{ 
        id: number;
        documentId: string;
        missionText: string;
        visionText: string;
        images: ApiImage[];
        createdAt:string;
        updatedAt: string;
        publishedAt: string;
    }]
}

interface DC {
    data: [{
        id: number;
        documentId: string;
        departments: [{
            id: string;
            name: string;
            title: string;
            description: string;
            image: string;
        }];
        courses: [{
            id: number;
            title: string;
            course_types: [];
        }];
        createdAt:string;
        updatedAt: string;
        publishedAt: string;
    }]
}

interface INFO {
    data: [{ 
        id: number;
        documentId: string;
        advertisement: string;
        createdAt:string;
        updatedAt: string;
        publishedAt: string;
    }]
}


interface PG {
    data: [{
        id: number;
        documentId: string;
        css_text: string;
        departments: [{
            id: string;
            name: string;
            courses: string[];
            degrees: [{
                level: string;
                gpa: string;
                requirements: string;
            }];
        }];
        tuition: [{
            id: number;
            degree_level: string;
            degree_agreement: string;
            semesters: number;
            fee: string;
        }];
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }]
}

interface Commandants {
    data: [{
        id: number;
        documentId: string;
        commandants: [{
            id: number;
            name: string;
            qualifications: string;
            status: string;
            date: string;
        }];
        images: ApiImage[];
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    }]
}

interface Gallery {
    data: [{
        id: number;
        documentId: string;
        title: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        images: ApiImage[];
    }]
}

interface News {
    data: [{
        id: number;
    documentId: string;
    title: string;
    content: [
      {
        type: string;
        children: [
          {
            type: string;
            text: string;
          }
        ]
      }
    ],
    published_date: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    }]
  }

  interface MANAGEMENT {
    data: [{
        id: 2,
        documentId: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        deputycommandantdetails: [
              {
                name: string
                role: string
                image: string
                header: string
                qualifications: string
                secondary_qualifications: string
              }
            ],
            directorofstudiesdetails: [
              {
                name: string
                role: string
                image: string
                header: string
                qualifications: string
                secondary_qualifications: string
              }
            ],
            otherstaffs: [
              {
                name: string
                role: string
                image: string
                title: string
              }
            ],
            commandantdetails: [
              {
                name: string
                role: string
                image: string
                header: string
                qualifications: string
              }
            ]
    }]
  }


class StrapiService {

    async getNavs () {
        return apiService.strapiGet<Nav>(STRAPI_ENDPOINTS.NAVIGATION)
    }

    async getHero ()  {
        return apiService.strapiGet<Hero>(STRAPI_ENDPOINTS.HERO)
    }

    async getAbout () {
        return apiService.strapiGet<Timeline>(STRAPI_ENDPOINTS.ABOUT)
    }

    async getMV () {
        return apiService.strapiGet<MV>(STRAPI_ENDPOINTS.MV)
    }

    async getDC () {
        return apiService.strapiGet<DC>(STRAPI_ENDPOINTS.DC)
    }

    async getPG () {
        return apiService.strapiGet<PG>(STRAPI_ENDPOINTS.PG)
    }

    async getInfo () {
        return apiService.strapiGet<INFO>(STRAPI_ENDPOINTS.INFO)
    }

    async getCommandants () {
        return apiService.strapiGet<Commandants>(STRAPI_ENDPOINTS.COMMANDANTS)
    }

    async getGallery () {
        return apiService.strapiGet<Gallery>(STRAPI_ENDPOINTS.GALLERY)
    }

    async getNews () {
        return apiService.strapiGet<News>(STRAPI_ENDPOINTS.NEWS)
    }

    async getManagement () {
        return apiService.strapiGet<MANAGEMENT>(STRAPI_ENDPOINTS.MANAGEMENT)
    }
}

export const strapiService = new StrapiService();