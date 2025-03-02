import ExamPage from "./examDetails";


export default async function examDetailsPage({ params }: { params: { examsId: string } }) {

    const examId = await params
    
    return <ExamPage examId={examId.examsId} />
  }
