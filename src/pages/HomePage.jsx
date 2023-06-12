import Hero from "../components/routes/Hero";
import CategoryPane from "../components/CategoryPane";
import Features from "../components/routes/Features";
import BestDealz from "../components/routes/BestDealz";
import EventsBanner from "../components/EventsBanner";
import Featured from "../components/Featured";
import Sponsored from "../components/routes/Sponsored";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <CategoryPane />
      <Features />
      <BestDealz />
      <EventsBanner />
      <Featured />
      <Sponsored />
    </div>
  );
};

export default HomePage;
