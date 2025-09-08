
import React from 'react';

const ProfileScreen: React.FC = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-full flex flex-col items-center">
      <header className="mb-8 w-full">
        <h1 className="text-3xl font-bold text-slate-800 text-center">Profile</h1>
      </header>

      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center">
          <img
            src="https://picsum.photos/seed/user/200"
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-200 object-cover mb-4"
          />
          <h2 className="text-2xl font-bold text-slate-800">Alex Doe</h2>
          <p className="text-slate-500">alex.doe@example.com</p>

          <div className="w-full border-t border-slate-200 my-6"></div>

          <div className="w-full space-y-4 text-left">
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Account Type:</span>
              <span className="font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full text-sm">Premium</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Member Since:</span>
              <span className="text-slate-700 font-semibold">Jan 2023</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-600">Total Trips:</span>
              <span className="text-slate-700 font-semibold">142</span>
            </div>
          </div>
        </div>

        <button className="mt-8 w-full bg-red-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:bg-red-600 transition-colors">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
