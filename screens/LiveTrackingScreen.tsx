import React, { useState } from 'react';
import { useMockData } from '../hooks/useMockData';
import { Stop, StopStatus } from '../types';
import { ClockIcon, ShareIcon } from '../components/Icons';

const StopTimelineItem: React.FC<{ stop: Stop; isLast: boolean; isCurrent: boolean }> = ({ stop, isLast, isCurrent }) => {
    
    const getStatusInfo = (status?: StopStatus) => {
        switch (status) {
            case 'Departed':
                return { icon: '❌', color: 'text-red-500', line: 'bg-slate-400', dot: 'bg-slate-400 border-slate-400', text: 'text-slate-500' };
            case 'Arrived':
                return { icon: '✅', color: 'text-green-600', line: 'bg-green-500', dot: 'bg-green-500 border-green-500', text: 'text-slate-900 font-bold' };
            case 'Upcoming':
            default:
                return { icon: '⏳', color: 'text-slate-500', line: 'bg-slate-300', dot: 'bg-white border-slate-300', text: 'text-slate-600' };
        }
    };

    const statusInfo = getStatusInfo(stop.status);
    const highlightCurrent = isCurrent ? 'scale-150 ring-4 ring-green-200' : '';
    const textHighlightCurrent = isCurrent ? 'font-extrabold text-green-700' : statusInfo.text;
    
    const lineStatusColor = stop.status === 'Departed' ? statusInfo.line : 'bg-slate-300';
    const currentLineColor = isCurrent ? statusInfo.line : lineStatusColor;

    return (
        <div className="relative pl-12 pb-8">
            {!isLast && <div className={`absolute left-[18px] top-5 h-full w-1 ${currentLineColor}`}></div>}
            
            <div className={`absolute left-2 top-3 w-5 h-5 rounded-full border-2 transition-transform duration-300 ${statusInfo.dot} ${highlightCurrent}`}></div>

            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <p className={`text-base ${textHighlightCurrent}`}>{stop.name}</p>
                    <p className="text-sm text-slate-400">{stop.distance} from start</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4 text-sm">
                    {(stop.arrivalTime || stop.departureTime) && (
                        <p className="font-semibold text-slate-500">
                            {stop.arrivalTime}{stop.departureTime && ` - ${stop.departureTime}`}
                        </p>
                    )}
                </div>
            </div>
             <div className="flex items-center mt-2 text-sm">
                 <span className="mr-2">{statusInfo.icon}</span>
                 <span className={`${statusInfo.color} font-medium`}>{stop.status}</span>
             </div>
        </div>
    );
};


const LiveTrackingScreen: React.FC = () => {
    const { getRouteById } = useMockData();
    const route = getRouteById('route-1');
    const [selectedDate, setSelectedDate] = useState<'Today' | 'Tomorrow'>('Today');

    if (!route) {
        return <div className="p-6 text-center">Route data not found.</div>;
    }

    const currentStopIndex = route.stops.findIndex(s => s.status === 'Arrived');

    return (
        <div className="bg-white min-h-full flex flex-col">
            <header className="sticky top-0 bg-white/90 backdrop-blur-md z-10 p-4 border-b border-slate-200">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <p className="text-xs text-slate-500">Route</p>
                        <h1 className="text-xl font-bold text-slate-800">{route.name}</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                         <div className={`${route.color} text-white font-bold w-12 h-10 rounded-lg flex items-center justify-center text-lg`}>
                            {route.busNumber}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <button className="flex items-center text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition">
                            <ClockIcon className="w-4 h-4 mr-1.5"/> Set Alarm
                        </button>
                        <button className="flex items-center text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition">
                            <ShareIcon className="w-4 h-4 mr-1.5"/> Share
                        </button>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-full text-sm font-medium">
                        <button 
                            onClick={() => setSelectedDate('Today')}
                            className={`px-3 py-1 rounded-full transition-colors ${selectedDate === 'Today' ? 'bg-white text-blue-600 shadow' : 'text-slate-500'}`}
                        >
                            Today
                        </button>
                        <button 
                            onClick={() => setSelectedDate('Tomorrow')}
                            className={`px-3 py-1 rounded-full transition-colors ${selectedDate === 'Tomorrow' ? 'bg-white text-blue-600 shadow' : 'text-slate-500'}`}
                        >
                            Tomorrow
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6">
                <div className="relative">
                    {route.stops.map((stop, index) => (
                        <StopTimelineItem 
                            key={stop.id} 
                            stop={stop} 
                            isLast={index === route.stops.length - 1}
                            isCurrent={index === currentStopIndex}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default LiveTrackingScreen;