import Hero from "../components/Hero";
import CategoryPane from "../components/CategoryPane";
import Features from "../components/Features";
import BestDealz from "../components/BestDealz";
import Events from "../components/Events";
import Featured from "../components/Featured";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CategoryPane />
      <Features />
      <BestDealz />
      <Events />
      <Featured />
    </div>
  );
};

export default HomePage;
