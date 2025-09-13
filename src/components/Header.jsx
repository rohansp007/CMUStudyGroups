import React, { useState } from 'react';
import { ChevronDown, Mail } from 'lucide-react';


// Dummy UserProfileDropdown component
const UserProfileDropdown = () => (
  <div className="absolute left-[-40px] top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-10 p-6 text-black">
    <div className="mb-2 font-bold text-lg">Alex Johnson</div>
    <div className="mb-2 text-sm"><span className="font-semibold">Year:</span> Junior</div>
    <div className="mb-2 text-sm"><span className="font-semibold">Major:</span> Computer Science</div>
    <div className="mb-2 text-sm"><span className="font-semibold">Classes Taken:</span> CS 15-122, CS 15-213, MATH 21-127</div>
    <div className="mb-2 text-sm flex items-center"><Mail className="w-4 h-4 mr-2 text-gray-700" /> alex.johnson@gmail.com</div>
  </div>
);

// Dummy mouse event handlers
const handleMouseEnter = () => {};
const handleMouseLeave = () => {};

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="w-full bg-gradient-to-r from-blue-900 to-purple-900 py-6 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold mb-2">Study Groups</h1>
        <p className="text-gray-300">Find and join study groups for your classes</p>
      </div>
      <div className="relative" style={{ marginRight: '40px' }}>
        <div
          className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 cursor-pointer"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            AJ
          </div>
          <span className="text-white font-medium">Alex Johnson</span>
          <ChevronDown className="w-4 h-4 text-gray-300" />
          {showDropdown && <UserProfileDropdown />}
        </div>
      </div>
    </header>
  );
};

export default Header;
