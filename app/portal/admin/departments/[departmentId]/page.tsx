import DepartmentDetails from "./departmentdetails"


export default async function DepartmentDetailsPage({ params }: { params: { id: string } }) {

    const departmentId = await params
    return <DepartmentDetails departmentId={departmentId.id} />
  }