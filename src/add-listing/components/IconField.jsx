import { 
    Tag,
    ClipboardList,
    DollarSign,
    Banknote,
    CarFront,
    CheckCircle,
    PlugZap,
    Factory,
    Car,
    Calendar,
    Waypoints,
    Cog,
    Fuel,
    Gauge,
    Wrench,
    Circle,
    Palette,
    DoorClosed,
    IdCard,
    Tags,
    File
 } from 'lucide-react';

import PropTypes from 'prop-types';

const iconMap = {
    Tag: <Tag width={16} />,
    ClipboardList: <ClipboardList width={16} />,
    DollarSign: <DollarSign width={16} />,
    Banknote: <Banknote width={16} />,
    CarFront: <CarFront width={16} />,
    CheckCircle: <CheckCircle width={16} />,
    PlugZap: <PlugZap width={16} />,
    Factory: <Factory width={16} />,
    Car: <Car width={16} />,
    Calendar: <Calendar width={16} />,
    Waypoints: <Waypoints width={16} />,
    Cog: <Cog width={16} />,
    Fuel: <Fuel width={16} />,
    Gauge: <Gauge width={16} />,
    Wrench: <Wrench width={16} />,
    Circle: <Circle width={16} />,
    Palette: <Palette width={16} />,
    DoorClosed: <DoorClosed width={16} />,
    IdCard: <IdCard width={16} />,
    Tags: <Tags width={16} />,
    File: <File width={16} />
};

function IconField({icon}) {
  return (
    <div className='text-primary bg-blue-100 py-1 px-2 rounded-full'>{iconMap[icon]}</div>
  )
}

IconField.propTypes = {
    icon: PropTypes.string.isRequired
}
export default IconField
