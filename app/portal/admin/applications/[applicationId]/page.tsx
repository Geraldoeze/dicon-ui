import ApplicationDetails from "./applicationdetails"


export default async function ApplicationDetailsPage({ params }: { params: { applicationId: string } }) {

    const applicationId = await params


    
    return <ApplicationDetails applicationId={applicationId.applicationId} />

  }