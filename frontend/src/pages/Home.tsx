import HeroSection from "../components/home/HeroSection";
import About from "../components/home/About";
import Modules from "../components/home/Modules";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <About/>
      <Modules/>
      <WhyChooseUs/>
      <Footer/>
      {/* other sections … */}
    </>
  );
}
