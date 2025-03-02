"use client"


import { useQuery } from '@tanstack/react-query'
import { Card } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Slash} from "lucide-react"
// import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'


interface CourseDetails {
    id: string;
    code: string;
    name: string;
    topic: string;
    video: string;
    lecturer: {
      name: string;
      avatar: string;
    };
    description: string;
  }
  

interface ClassesDetailsProps {
  courseId: string;
}



export default function ClassesDetails({ courseId }: ClassesDetailsProps) {


  const { data: courseDetails } = useQuery<CourseDetails>({
    queryKey: ['course', courseId],
    queryFn: () => ({
      id: courseId,
      code: 'ELE 321',
      name: 'Electricity & power',
      topic: 'Topic which was treated in this video',
      video: 'https://www.youtube.com/embed/40agWVHAENw?si=5pSQlaWNs_XVV-k0',
      lecturer: {
        name: 'Prof Aiyede',
        avatar: '/male.png'
      },
      description: 'A dummy course description is a description of a course that teaches how to create a dummy, which is a draft version of a book or other creative work. Dummy courses can teach students how to write and illustrate a book, or how to prepare a dummy for submission to editors or agents'
    })
  })

  return (
    <div className="space-y-10 min-h-screen relative mt-24">
      <div className="border-b-2 border-gray-300 p-5">
        <div className="flex items-center gap-4 max-w-[85vw] mx-auto">
          <Link href="/portal/courses" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2 text-black" />
            <span className='text-black font-medium text-lg'>Back</span>
          </Link>
          <div className="text-muted-foreground border-s-2 border-gray-700 px-2">
          <Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/portal/classes" className='text-black text-lg font-medium'>Classes</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
    <Slash/>
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage className='text-lg font-medium text-gray-500'>Classes videos</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
</div>
          </div>
        </div>
        <div className="max-w-[70vw] mx-auto">
        <div className="mb-6">
            <h2 className='text-[1rem] md:text-[1.25rem]'>{courseDetails?.topic}</h2>
            <div className="flex justify-center my-5">
            <iframe width="800" height="400" src={courseDetails?.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
          <div className="flex items-center justify-between rounded-md">
          <div>
            <h1 className="text-2xl font-bold">{courseDetails?.code}</h1>
            <p className="text-muted-foreground">{courseDetails?.name}</p>
          </div>
            <Button className="px-2 py-3 bg-gray-100 items-center space-x-1 rounded-full">
            <Image
              src={courseDetails?.lecturer.avatar}
              alt={courseDetails?.lecturer.name}
              width={8}
              height={8}
              className="w-8 h-8 rounded-full"
            />
            <span className='text-gray-700'>{courseDetails?.lecturer.name}</span>
            </Button>
          </div>
        </div>

        <Card className="my-5 shadow-none border-none">
          <h2 className="text-lg font-semibold mb-4">Course description</h2>
          <p className="text-muted-foreground">{courseDetails?.description}</p>
        </Card>

        </div>
      
    </div>
  )
}