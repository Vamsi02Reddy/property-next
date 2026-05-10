import Hero from "./components/Hero";
import InfoBoxes from "./components/InfoBoxes";
import HomeProperties from './components/HomeProperties';
import FeaturedProperties from "./components/FeaturedProperties";
export const dynamic = "force-dynamic";

const Homepage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};

export default Homepage;
