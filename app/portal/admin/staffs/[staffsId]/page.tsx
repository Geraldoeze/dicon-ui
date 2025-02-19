import StaffsDetail from "./staffdetails"


export default async function StaffsDetailsPage({ params }: { params: { id: string } }) {

    const staffsId = await params
    return <StaffsDetail staffId={staffsId.id} />
  }