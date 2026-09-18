import Slider from "./slider";
import Card from "./card";
export default function Explore() {
    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto">
                <Slider />
                <Card />
            </div>
        </section>
    );
}