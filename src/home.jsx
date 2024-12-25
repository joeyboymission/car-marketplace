import Categories from "./components/Categories";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MostSearchedCar from "./components/MostSearchedCar";

function home() {
  return (
    <>
        <Header />
        <Hero />
        <Categories />
        <MostSearchedCar />
    </>
  );
}

export default home;
