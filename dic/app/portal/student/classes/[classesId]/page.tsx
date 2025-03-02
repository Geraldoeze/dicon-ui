import ClassesDetails from "./classes-details"

type PageProps = {
  params: {
    CourseId: string;
  };
};
export default async function ClassesDetailsPage({ params }: PageProps) {

    const ClassesId = await params
    return <ClassesDetails courseId={ClassesId.CourseId} />
  }