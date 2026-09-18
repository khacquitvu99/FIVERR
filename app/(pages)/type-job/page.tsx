import JobType from "@/component/type-job/CategorySlider";
import Navbar from "@/component/list-job/nav";
import Exploder from "@/component/type-job/body-typejob/index";
import Footer from "@/component/type-job/foot/index";
export default function TypeJobPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <JobType />
      <Exploder />
      <Footer />
    </div>
  );
}
