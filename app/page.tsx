import Image from "next/image";
import Nav from "./component/Home/nav";
import Carousel from "./component/Home/caurosel";
import FeaturesSection from "./component/Home/FeaturesSection";
import Explore from "./component/Home/explore";
export default function Home() {
  return (
    <div>
      <Nav />
      <Carousel />
      <FeaturesSection />
      <Explore />
    </div>
  );
}
