import ApplicationDetails from "./applicationdetails"


export default async function ApplicationDetailsPage({ params }: { params: { id: string } }) {

    const applicationId = await params
    return <ApplicationDetails applicationId={applicationId.id} />
  }