import Text from "./fe-text";
import Video from "./fe-video";

export default function FeaturesSection() {
  return (
    <section className="w-full bg-white px-4 md:px-6 py-8">
      <div className="container mx-auto bg-[#f1fdf7] rounded-2xl">
        <div className="max-w-7xl mx-auto  py-12 px-6 md:px-12  flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="w-full lg:w-1/2 flex justify-center">
            <Text />
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <Video />
          </div>
        </div>
      </div>
    </section>
  );
}
