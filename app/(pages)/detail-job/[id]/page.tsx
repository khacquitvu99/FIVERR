import Nav from "@/component/list-job/nav";
import Body from "@/component/detail-job";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;

  return (
    <div>
      <Nav />
      {/* Truyền id lấy từ URL vào component Body */}
      <Body jobId={id} />
    </div>
  );
}