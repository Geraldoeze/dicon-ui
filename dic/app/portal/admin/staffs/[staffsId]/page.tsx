import StaffsDetail from "./staffdetails"


export default async function StaffsDetailsPage({ params }: { params: { staffsId: string } }) {

    const staffsId = await params
    
    return <StaffsDetail staffId={staffsId.staffsId} />
  }