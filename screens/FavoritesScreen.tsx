
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMockData } from '../hooks/useMockData';
import { Route } from '../types';
import { BusIcon, StarIcon } from '../components/Icons';

const FavoriteCard: React.FC<{ route: Route; onToggleFavorite: (id: string) => void }> = ({ route, onToggleFavorite }) => {
  const navigate = useNavigate();
  const nextStop = route.stops.find(s => !s.isPast);

  const handleCardClick = () => {
    navigate(`/details/${route.id}`);
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md cursor-pointer transition-transform hover:scale-105" onClick={handleCardClick}>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
            <div className={`${route.color} text-white font-bold w-12 h-12 rounded-xl flex items-center justify-center text-xl mr-4`}>
                {route.busNumber}
            </div>
            <div>
                <h3 className="font-bold text-slate-800">{route.name}</h3>
                <p className="text-sm text-slate-500">Next stop: {nextStop?.name || 'End'}</p>
            </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(route.id); }} 
          className="p-1 text-yellow-400 hover:text-yellow-500"
        >
          <StarIcon className="w-6 h-6 fill-current" />
        </button>
      </div>
      <div className="mt-4 flex justify-between items-center bg-slate-100 rounded-lg p-2">
        <div className="flex items-center text-sm font-medium text-slate-600">
          <BusIcon className="w-4 h-4 mr-2" />
          <span>{route.occupancy}</span>
        </div>
        <div className="text-lg font-bold text-blue-600">
          {nextStop?.eta || 0} <span className="text-sm font-medium">min</span>
        </div>
      </div>
    </div>
  );
};


const FavoritesScreen: React.FC = () => {
  const { routes, toggleFavorite } = useMockData();
  const favoriteRoutes = routes.filter(r => r.isFavorite);

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Favorites</h1>
        <p className="text-slate-500">Your saved routes for quick access.</p>
      </header>

      {favoriteRoutes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {favoriteRoutes.map(route => (
            <FavoriteCard key={route.id} route={route} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
            <StarIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-600">No Favorites Yet</h2>
            <p className="text-slate-400 mt-2">Add routes to your favorites to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesScreen;
