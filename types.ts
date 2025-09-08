export enum Occupancy {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export type Amenity = 'AC' | 'Wifi' | 'Sleeper' | 'Non-AC';

export type StopStatus = 'Departed' | 'Arrived' | 'Upcoming';

export interface Stop {
  id: string;
  name: string;
  eta: number; 
  isPast: boolean;
  status?: StopStatus;
  distance?: string;
  arrivalTime?: string;
  departureTime?: string;
}

export interface Bus {
  id: string;
  number: string;
  eta: number;
  occupancy: Occupancy;
}

export interface Route {
  id: string;
  name: string;
  busNumber: string;
  color: string;
  occupancy: Occupancy;
  amenities: Amenity[];
  stops: Stop[];
  isFavorite: boolean;
}

export interface NearbyStop {
  id: string;
  name: string;
  distance: string;
  buses: Bus[];
}