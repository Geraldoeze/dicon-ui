import DepartmentDetails from "./departmentdetails"


export default async function DepartmentDetailsPage({ params }: { params: { departmentId: string } }) {

    const departmentId = await params
    
    return <DepartmentDetails departmentId={departmentId.departmentId} />
  }