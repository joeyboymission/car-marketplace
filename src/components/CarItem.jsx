import PropTypes from 'prop-types'
import { Separator } from './ui/separator'
import { Fuel, Gauge, Cog, ExternalLink } from "lucide-react" 

function CarItem( { car } ) {
  return (
    <div className="rounded-xl border border-gray-200 hover:shadow-md cursor-pointer"> {/* Car Item Container */}
      {/* Upper Part Content */}
      <h2 className='absolute m-2 bg-green-500 px-2.5 py-0.5 rounded-full text-sm text-green-100'>New</h2> {/* Status Tag */}
      <img src={car.image} className="object-cover w-[18.75rem] h-[15.625rem] rounded-t-xl" /> {/* Placeholder image */}
      
      {/* Lower Part Content */}
      <div className='p-4'>
        <h2 className='text-black font-bold text-lg mb-2'>{car.name}</h2> {/* Car name */}
        <Separator />
        {/* Car details */}
        <div className="grid grid-cols-3 mt-5">
          {/* Mileage */}
          <div className="flex flex-col items-center">
            < Fuel width={24} className='mb-2'/>
            <h2>{car.miles} Miles</h2>
          </div>

          {/* Fuel Type */}
          <div className="flex flex-col items-center">
            < Gauge width={24} className='mb-2'/>
            <h2>{car.fuelType}</h2>
          </div>

          {/* Transmission */}
          <div className="flex flex-col items-center">
            < Cog width={24} className='mb-2'/>
            <h2>{car.gearType}</h2>
          </div>
        </div>
        <Separator className="my-2" />
        {/* Price and Details */}
          <div className='flex items-center justify-between'>
            <h2 className='font-bold text-xl'>${car.price}</h2>
            <h2 className='text-primary text-sm flex gap-2 items-center'>View Details
            <ExternalLink width={16}/>
            </h2>

          </div>
      </div>
    </div>
  )
}

CarItem.propTypes = {
  car: PropTypes.object.isRequired,
}

export default CarItem
