import Categories from "./components/Categories";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import InfoSection from "./components/InfoSection";
import MostSearchedCar from "./components/MostSearchedCar";

function home() {
  return (
    <>
        {/* Header */}
        <Header />
        {/* Hero */}
        <Hero />
        {/* Categories */}
        <Categories />
        {/* MostSearchedCar */}
        <MostSearchedCar />
        {/* InfoSection */}
        <InfoSection />
        {/* Footer */}
        <Footer/>
    </>
  );
}

export default home;
