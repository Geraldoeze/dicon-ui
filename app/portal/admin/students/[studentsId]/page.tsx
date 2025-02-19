import StudentDetail from "./studentdetail"


export default async function StudentDetailsPage({ params }: { params: { id: string } }) {

    const studentId = await params
    return <StudentDetail studentId={studentId.id} />
  }