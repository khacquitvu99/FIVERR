import { Suspense } from "react";

import ListJobBody from "../../component/list-job/body";
import ListJobHeader from "../../component/list-job/nav";
import Filter from "../../component/list-job/filter";

export default function ListJob() {
  return (
    <Suspense fallback={<div className="text-center py-16">Đang tải...</div>}>
      <ListJobBody />

      <ListJobHeader />
      <Filter />
      <ListJobBody />
    </Suspense>
  );
}
