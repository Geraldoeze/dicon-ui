import PendingAssignment from "./pendingassignment"

type PageProps = {
  params: {
    assignmentId: string;
  };
};
export default async function Page({ params }: PageProps) {

    const pending = await params

    return <PendingAssignment assignmentId={pending.assignmentId} />
  }