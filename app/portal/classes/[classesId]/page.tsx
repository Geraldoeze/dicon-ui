import ClassesDetails from "./classes-details"


export default async function ClassesDetailsPage({ params }: { params: { CourseId: string } }) {

    const ClassesId = await params
    return <ClassesDetails courseId={ClassesId.CourseId} />
  }