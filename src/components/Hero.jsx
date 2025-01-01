import Search from "./Search"

function Hero() {
  return (
    <div>
        <div className="flex flex-col items-center p-10 pt-24  gap-6 h-[32rem] w-full bg-[#eef0fc]">
            <h2 className="text-lg text-center m-[-2rem]">Find a car for sale and for rent near you</h2>
            <h2 className="text-[3.75rem] text-center font-bold">Find Your Dream Car</h2>
            <Search />
            <img src="/tesla.png" alt="Tesla Car" className="w-[90%] md:w-[60%]" />
        </div>
    </div>
  )
}

export default Hero
