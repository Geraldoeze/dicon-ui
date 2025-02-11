import CourseDetails from "./course-details"


export default async function CourseDetailsPage({ params }: { params: { courseId: string } }) {

    const courseId = await params
    return <CourseDetails courseId={courseId.courseId} />
  }