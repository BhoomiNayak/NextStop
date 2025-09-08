
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LiveTrackingScreen from './screens/LiveTrackingScreen';
import BusDetailsScreen from './screens/BusDetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import ProfileScreen from './screens/ProfileScreen';
import BottomNav from './components/BottomNav';
import { DataProvider } from './hooks/useMockData';

const App: React.FC = () => {
  return (
    <DataProvider>
      <HashRouter>
        <div className="h-screen w-screen bg-slate-50 flex flex-col justify-center items-center">
          <div className="relative w-full max-w-sm h-full bg-white shadow-2xl overflow-hidden flex flex-col">
            <main className="flex-1 overflow-y-auto pb-20">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/map" element={<LiveTrackingScreen />} />
                <Route path="/details/:routeId" element={<BusDetailsScreen />} />
                <Route path="/favorites" element={<FavoritesScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
              </Routes>
            </main>
            <BottomNav />
          </div>
        </div>
      </HashRouter>
    </DataProvider>
  );
};

export default App;
