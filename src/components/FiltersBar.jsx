import React from 'react';
import { Search, BookOpen, Plus, MapPin } from 'lucide-react';

const FiltersBar = ({
  searchTerm,
  setSearchTerm,
  classFilter,
  setClassFilter,
  uniqueClasses,
  locationFilter,
  setLocationFilter,
  uniqueLocations,
  onAddGroupClick
}) => (
  <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
    {/* Search bar */}
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        placeholder="Search study groups..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
    {/* Class filter and Add Group Button */}
    <div className="flex items-center gap-2">
      <div className="relative">
        <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <select
          value={classFilter}
          onChange={e => setClassFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-8 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
        >
          <option value="">All Classes</option>
          {uniqueClasses.map(className => (
            <option key={className} value={className}>{className}</option>
          ))}
        </select>
      </div>
      {/* Location filter dropdown to the right of All Classes */}
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        <select
          value={locationFilter}
          onChange={e => setLocationFilter(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-8 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer w-56"
        >
          <option value="">All Locations</option>
          {uniqueLocations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200"
        onClick={onAddGroupClick}
      >
        <Plus className="w-5 h-5" />
        Add Study Group
      </button>
    </div>
  </div>
);

export default FiltersBar;
