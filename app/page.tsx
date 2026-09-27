import Image from "next/image";
import Nav from "./component/Home/nav";
import Carousel from "./component/Home/caurosel";
import FeaturesSection from "./component/Home/FeaturesSection";
import Explore from "./component/Home/explore";
import Footer from "@/component/footer";
export default function Home() {
  return (
    <div>
      <Nav />
      <Carousel />
      <FeaturesSection />
      <Explore />
      <Footer />
    </div>
  );
}
