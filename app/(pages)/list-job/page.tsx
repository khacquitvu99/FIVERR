import ListJobBody from "../../component/list-job/body";
import ListJobHeader from "../../component/list-job/nav";
import Filter from "../../component/list-job/filter";


export default function ListJob() {
  return (
    <div>
      <ListJobHeader />
      <Filter />
      <ListJobBody />
    </div>
  );
}
