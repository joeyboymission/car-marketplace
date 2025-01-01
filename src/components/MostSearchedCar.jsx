import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import FakeData from "../Shared/FakeData";
import CarItem from "./CarItem";

function MostSearchedCar() {
  console.log(FakeData.carList);
  return (
    <div className="mx-24">
      <h2 className="text-center text-3xl font-bold mt-16 mb-6">Most Search Car</h2>
      <Carousel>
        <CarouselContent>
          {FakeData.carList.map((car, index) => (
            <CarouselItem className="basis-1/8" key={index}>
                            <CarItem car={car} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default MostSearchedCar;
