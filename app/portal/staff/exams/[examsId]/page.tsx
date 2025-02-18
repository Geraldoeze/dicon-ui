import ExamDetails from "./examDetails"


export default async function examDetailsPage({ params }: { params: { examsId: string } }) {

    const examId = await params
    
    return <ExamDetails examId={examId.examsId} />
  }