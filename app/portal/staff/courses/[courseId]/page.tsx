import CourseDetails from "./coursedetails"


export default async function CourseDetailsPage({ params }: { params: { courseId: string } }) {

    const courseId = await params
    return <CourseDetails courseId={courseId.courseId} />
  }