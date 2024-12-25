import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Separator } from "./ui/separator";
import { SearchIcon } from "lucide-react";
import Data from "@/Shared/Data";

function Search() {
  return (
    <div className="flex flex-col md:flex-row gap-10 p-2 md:p-2 px-4 items-center w-[60%] md:w-[60%] bg-white rounded-md md:rounded-full">
      <Select>
        <SelectTrigger className="outline-none border-none shadow-none w-full text-[1rem]">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="old">Old</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select>
        <SelectTrigger className="outline-none border-none shadow-none w-full text-[1rem]">
          <SelectValue placeholder="Car Makes" />
        </SelectTrigger>
        <SelectContent>
            {Data.CarMakes.map((maker, index) => (
                <SelectItem key={index} value={maker.id}>{maker.name}</SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block" />
      <Select>
        <SelectTrigger className="outline-none border-none shadow-none w-full text-[1rem]">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
            {Data.Pricing.map((price, index) => (
                <SelectItem key={index} value={price.id}>{price.amount}</SelectItem>
            ))}
        </SelectContent>
      </Select>
      <div>
        <SearchIcon className="w-[2.5rem] h-[2.5rem] text-white bg-primary rounded-full p-2 hover:scale-105 transition-all" />
      </div>
    </div>
  );
}

export default Search;
