
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, LocationPinIcon, BusIcon } from '../components/Icons';
import { useMockData } from '../hooks/useMockData';
import { NearbyStop, Bus } from '../types';

const OccupancyDot: React.FC<{ occupancy: Bus['occupancy'] }> = ({ occupancy }) => {
  const color = {
    Low: 'bg-green-400',
    Medium: 'bg-yellow-400',
    High: 'bg-red-400',
  }[occupancy];
  return <span className={`w-2 h-2 rounded-full ${color} mr-1.5`}></span>;
};


const NearbyStopCard: React.FC<{ stop: NearbyStop }> = ({ stop }) => (
  <div className="flex-shrink-0 w-64 bg-white p-4 rounded-2xl shadow-md mr-4">
    <div className="flex items-center text-slate-700">
      <LocationPinIcon className="w-5 h-5 mr-2 text-green-500" />
      <h3 className="font-bold text-base truncate">{stop.name}</h3>
    </div>
    <p className="text-sm text-slate-500 ml-7 mb-3">{stop.distance} away</p>
    <div className="space-y-2">
      {stop.buses.map((bus) => (
        <div key={bus.id} className="flex justify-between items-center text-sm">
          <div className="flex items-center font-semibold text-slate-800">
            <BusIcon className="w-4 h-4 mr-2 text-slate-400" />
            <span>{bus.number}</span>
          </div>
          <div className="flex items-center bg-slate-100 rounded-full px-2 py-0.5">
            <OccupancyDot occupancy={bus.occupancy} />
            <span className="font-medium text-slate-600">{bus.eta} min</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { recentSearches, nearbyStops, routes } = useMockData();
  
  const handleRecentSearchClick = (search: string) => {
    // A simple logic to navigate. A real app would have a search result page.
    if(search.includes('101')) {
      navigate(`/details/${routes[0].id}`);
    } else if (search.includes('Crosstown')) {
       navigate(`/details/${routes[1].id}`);
    }
  }

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Welcome!</h1>
        <p className="text-slate-500">Find your bus and track it live.</p>
      </header>

      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Bus number, route, or stop"
          className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl shadow-md text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        />
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-700 mb-4">Recent Searches</h2>
        <div className="flex flex-wrap gap-3">
          {recentSearches.map((search, index) => (
            <button key={index} onClick={() => handleRecentSearchClick(search)} className="bg-white text-slate-700 font-medium px-4 py-2 rounded-full shadow-sm hover:bg-slate-100 transition-colors">
              {search}
            </button>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-bold text-slate-700 mb-4">Nearby Stops</h2>
        <div className="flex overflow-x-auto pb-4 -mx-6 px-6">
          {nearbyStops.map((stop) => (
            <NearbyStopCard key={stop.id} stop={stop} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
