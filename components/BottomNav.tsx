
import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, MapIcon, StarIcon, UserIcon } from './Icons';

const NavItem: React.FC<{ to: string; children: React.ReactNode; label: string }> = ({ to, children, label }) => {
  const activeClass = "text-blue-600";
  const inactiveClass = "text-slate-500 hover:text-blue-500";

  return (
    <NavLink to={to} className={({ isActive }) => `flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`}>
      {children}
      <span className="text-xs font-medium mt-1">{label}</span>
    </NavLink>
  );
};

const BottomNav: React.FC = () => {
  return (
    <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-t border-slate-200 shadow-t-md flex justify-around items-center px-2">
      <NavItem to="/" label="Home">
        <HomeIcon className="w-6 h-6" />
      </NavItem>
      <NavItem to="/map" label="Map">
        <MapIcon className="w-6 h-6" />
      </NavItem>
      <NavItem to="/favorites" label="Favorites">
        <StarIcon className="w-6 h-6" />
      </NavItem>
      <NavItem to="/profile" label="Profile">
        <UserIcon className="w-6 h-6" />
      </NavItem>
    </nav>
  );
};

export default BottomNav;
