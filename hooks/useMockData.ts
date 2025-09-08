import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { Route, NearbyStop, Occupancy } from '../types';

const initialRoutes: Route[] = [
  {
    id: 'route-1',
    name: 'Downtown Express',
    busNumber: '101',
    color: 'bg-blue-500',
    occupancy: Occupancy.Low,
    amenities: ['AC', 'Wifi'],
    isFavorite: true,
    stops: [
      { id: 's1-1', name: 'Central Station', eta: 0, isPast: true, status: 'Departed', distance: '0 km', arrivalTime: '10:00 AM', departureTime: '10:01 AM' },
      { id: 's1-2', name: 'City Hall', eta: 0, isPast: true, status: 'Departed', distance: '1.2 km', arrivalTime: '10:05 AM', departureTime: '10:06 AM' },
      { id: 's1-3', name: 'Grand Park', eta: 2, isPast: false, status: 'Arrived', distance: '2.5 km', arrivalTime: '10:12 AM', departureTime: '10:13 AM' },
      { id: 's1-4', name: 'Arts District', eta: 8, isPast: false, status: 'Upcoming', distance: '4.1 km', arrivalTime: '10:18 AM', departureTime: '10:19 AM' },
      { id: 's1-5', name: 'Financial Core', eta: 15, isPast: false, status: 'Upcoming', distance: '6.0 km', arrivalTime: '10:25 AM', departureTime: '10:26 AM' },
      { id: 's1-6', name: 'Convention Center', eta: 22, isPast: false, status: 'Upcoming', distance: '7.8 km', arrivalTime: '10:32 AM', departureTime: '10:33 AM' },
      { id: 's1-7', name: 'South Park', eta: 28, isPast: false, status: 'Upcoming', distance: '9.2 km', arrivalTime: '10:38 AM', departureTime: '10:39 AM' },
    ],
  },
  {
    id: 'route-2',
    name: 'Crosstown Connector',
    busNumber: '24B',
    color: 'bg-green-500',
    occupancy: Occupancy.High,
    amenities: ['Non-AC'],
    isFavorite: false,
    stops: [
      { id: 's2-1', name: 'Westside Mall', eta: 0, isPast: true },
      { id: 's2-2', name: 'Oakwood Ave', eta: 2, isPast: false },
      { id: 's2-3', name: 'University Campus', eta: 8, isPast: false },
      { id: 's2-4', name: 'Hospital Center', eta: 15, isPast: false },
      { id: 's2-5', name: 'Eastside Terminal', eta: 22, isPast: false },
    ],
  },
  {
    id: 'route-3',
    name: 'Airport Shuttle',
    busNumber: 'A1',
    color: 'bg-purple-500',
    occupancy: Occupancy.Medium,
    amenities: ['AC', 'Wifi', 'Sleeper'],
    isFavorite: true,
    stops: [
      { id: 's3-1', name: 'Terminal A', eta: 0, isPast: true },
      { id: 's3-2', name: 'Terminal B', eta: 4, isPast: true },
      { id: 's3-3', name: 'Rental Car Center', eta: 9, isPast: false },
      { id: 's3-4', name: 'Long Term Parking', eta: 14, isPast: false },
      { id: 's3-5', name: 'Metro Link', eta: 20, isPast: false },
    ],
  },
];

const nearbyStopsData: NearbyStop[] = [
  {
    id: 'ns-1',
    name: 'Main St & 4th Ave',
    distance: '150m',
    buses: [
      { id: 'b-101', number: '101', eta: 5, occupancy: Occupancy.Low },
      { id: 'b-24B', number: '24B', eta: 8, occupancy: Occupancy.High },
    ],
  },
  {
    id: 'ns-2',
    name: 'Oakwood Plaza',
    distance: '300m',
    buses: [{ id: 'b-33', number: '33', eta: 12, occupancy: Occupancy.Medium }],
  },
  {
    id: 'ns-3',
    name: 'Riverfront Park',
    distance: '500m',
    buses: [
        { id: 'b-101-2', number: '101', eta: 18, occupancy: Occupancy.Low },
        { id: 'b-5C', number: '5C', eta: 20, occupancy: Occupancy.Low },
    ],
  },
];

const recentSearchesData = ['Bus 101', 'Central Station', 'Crosstown Connector'];

interface DataContextType {
  routes: Route[];
  nearbyStops: NearbyStop[];
  recentSearches: string[];
  getRouteById: (id: string) => Route | undefined;
  toggleFavorite: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [routes, setRoutes] = useState<Route[]>(initialRoutes);

  const getRouteById = useCallback((id: string) => routes.find(r => r.id === id), [routes]);

  const toggleFavorite = useCallback((id: string) => {
    setRoutes(prevRoutes =>
      prevRoutes.map(r =>
        r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
  }, []);

  const value = useMemo(() => ({
    routes,
    nearbyStops: nearbyStopsData,
    recentSearches: recentSearchesData,
    getRouteById,
    toggleFavorite,
  }), [routes, getRouteById, toggleFavorite]);

  // FIX: The file has a .ts extension but contained JSX, which is not allowed.
  // Replaced the JSX syntax with React.createElement to resolve the parsing errors.
  return React.createElement(DataContext.Provider, { value: value }, children);
};

export const useMockData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useMockData must be used within a DataProvider');
  }
  return context;
};