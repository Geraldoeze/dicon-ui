import StudentDetail from "./studentdetail"


export default async function StudentDetailsPage({ params }: { params: { studentsId: string } }) {

    const studentId = await params

  
    
    return <StudentDetail studentId={studentId.studentsId} />
  }