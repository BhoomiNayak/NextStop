
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMockData } from '../hooks/useMockData';
import { Occupancy, Amenity, Stop } from '../types';
import { 
    ChevronLeftIcon,
    BusIcon,
    ClockIcon,
    AcIcon,
    WifiIcon,
    SleeperIcon,
    MapIcon
} from '../components/Icons';

const OccupancyIndicator: React.FC<{ occupancy: Occupancy }> = ({ occupancy }) => {
  const styles = {
    [Occupancy.Low]: { color: 'text-green-600', dot: 'bg-green-400', text: 'Low Occupancy' },
    [Occupancy.Medium]: { color: 'text-yellow-600', dot: 'bg-yellow-400', text: 'Medium Occupancy' },
    [Occupancy.High]: { color: 'text-red-600', dot: 'bg-red-400', text: 'High Occupancy' },
  };
  const currentStyle = styles[occupancy];
  return (
    <div className={`flex items-center text-sm font-medium ${currentStyle.color}`}>
      <span className={`w-2.5 h-2.5 rounded-full ${currentStyle.dot} mr-2`}></span>
      {currentStyle.text}
    </div>
  );
};

const AmenityIcon: React.FC<{ amenity: Amenity }> = ({ amenity }) => {
    const iconMap: { [key in Amenity]: React.ReactNode } = {
        'AC': <AcIcon className="w-5 h-5" />,
        'Wifi': <WifiIcon className="w-5 h-5" />,
        'Sleeper': <SleeperIcon className="w-5 h-5" />,
        'Non-AC': null,
    };
    const icon = iconMap[amenity];
    if (!icon) return null;
    return (
        <div className="flex items-center gap-2 bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full text-xs font-medium">
            {icon}
            <span>{amenity}</span>
        </div>
    );
};

const StopTimelineNode: React.FC<{ stop: Stop; isLast: boolean }> = ({ stop, isLast }) => {
  const isPast = stop.isPast;
  const isCurrent = stop.eta === 0 && !isPast;

  return (
    <div className="relative pl-8">
      {!isLast && <div className={`absolute left-[11px] top-5 h-full w-0.5 ${isPast ? 'bg-blue-500' : 'bg-slate-300'}`}></div>}
      <div className="flex items-center mb-6">
        <div className={`absolute left-0 w-6 h-6 rounded-full flex items-center justify-center ${isPast || isCurrent ? 'bg-blue-500' : 'bg-slate-300'}`}>
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
        <div className="flex-1">
          <p className={`font-semibold ${isPast || isCurrent ? 'text-slate-800' : 'text-slate-500'}`}>{stop.name}</p>
        </div>
        <div className={`font-bold text-right ${isPast || isCurrent ? 'text-blue-600' : 'text-slate-500'}`}>
          {isPast ? 'Passed' : `${stop.eta} min`}
        </div>
      </div>
    </div>
  );
};


const BusDetailsScreen: React.FC = () => {
  const { routeId } = useParams<{ routeId: string }>();
  const navigate = useNavigate();
  const { getRouteById } = useMockData();

  const route = routeId ? getRouteById(routeId) : undefined;

  if (!route) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-xl text-slate-600">Bus route not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Go Back</button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-full">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md p-4 flex items-center shadow-sm z-10">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-slate-100">
          <ChevronLeftIcon className="w-6 h-6 text-slate-700" />
        </button>
        <div className="flex items-center mx-auto">
           <div className={`${route.color} text-white font-bold w-10 h-10 rounded-lg flex items-center justify-center text-lg mr-3`}>
                {route.busNumber}
            </div>
            <h1 className="text-xl font-bold text-slate-800">{route.name}</h1>
        </div>
         <div className="w-10"></div>
      </header>

      <div className="p-6">
        <div className="bg-white p-5 rounded-2xl shadow-md mb-6">
            <OccupancyIndicator occupancy={route.occupancy} />
            <div className="flex flex-wrap gap-2 mt-4">
                {route.amenities.map(amenity => <AmenityIcon key={amenity} amenity={amenity} />)}
            </div>
        </div>
        
        <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-700 mb-4">Stops Timeline</h2>
            <div>
                {route.stops.map((stop, index) => (
                    <StopTimelineNode key={stop.id} stop={stop} isLast={index === route.stops.length - 1} />
                ))}
            </div>
        </div>

        <Link to="/map" className="flex items-center justify-center w-full bg-green-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:bg-green-600 transition-colors">
            <MapIcon className="w-6 h-6 mr-3" />
            Track Live on Map
        </Link>
      </div>
    </div>
  );
};

export default BusDetailsScreen;
