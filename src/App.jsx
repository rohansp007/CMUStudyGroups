import React, { useState, useRef } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { Search, Users, MapPin, User, BookOpen, Plus, Clock } from 'lucide-react';
import { filterGroups } from './components/filterGroups';
import { searchGroups } from './components/searchGroups';
import { createGroup } from './components/createGroup';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);
  const roomInputRef = useRef(null);

  // Study groups state
  const [studyGroups, setStudyGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');

  // Get unique classes for filter dropdown
  const uniqueClasses = [...new Set(studyGroups.map(group => group.class))];

  // Filter study groups based on search and class filter
  const filteredGroups = filterGroups(
    searchGroups(studyGroups, searchTerm),
    classFilter
  );

  function formatTime12hr(time) {
    if (!time) return '';
    let [hour, minute] = time.split(':');
    hour = parseInt(hour, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }

  const StudyGroupCard = ({ group, index }) => {
    const isFull = group.participants >= group.maxNumber;
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 flex flex-col h-full">
        <div className="flex-grow">
          <div className="flex items-center mb-4">
            <div className={`w-3 h-3 rounded-full mr-3 ${isFull ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span className={`text-sm font-medium ${isFull ? 'text-red-400' : 'text-green-400'}`}>{isFull ? 'Capacity Full' : 'Open for sign-ups'}</span>
          </div>
          <div className="mb-4">
            <h3 className="text-white text-xl font-semibold mb-1 hover:text-blue-400 cursor-pointer">
              {group.name}
            </h3>
            <p className="text-gray-400 text-sm">{group.class}</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center text-gray-300">
              <User className="w-4 h-4 mr-3 text-blue-400" />
              <span className="text-sm">Organized by {group.organizer}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Users className="w-4 h-4 mr-3 text-green-400" />
              <span className="text-sm">{`${group.participants} out of ${group.maxNumber} participants`}</span>
            </div>
            <div className="flex items-center text-gray-300">
              <MapPin className="w-4 h-4 mr-3 text-red-400" />
              <span className="text-sm">{group.location}</span>
            </div>
            {group.startTime && group.endTime && (
              <div className="flex items-center text-gray-300">
                <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm">Time: {formatTime12hr(group.startTime)} - {formatTime12hr(group.endTime)}</span>
              </div>
            )}
          </div>
        </div>
        <button
          className={`w-full font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center mt-6 ${isFull ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
          disabled={isFull}
          onClick={() => handleJoinGroup(index)}
        >
          <Users className="w-4 h-4 mr-2" />
          {isFull ? 'Capacity Full' : 'JOIN GROUP'}
        </button>
      </div>
    );
  };

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    organizer: '',
    class: '',
    maxNumber: '',
    location: '',
    startTime: '',
    endTime: ''
  });

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup(prev => ({ ...prev, [name]: value }));
  };

  // Add new group
  const handleAddGroup = (e) => {
    e.preventDefault();
    if (
      newGroup.name &&
      newGroup.organizer &&
      newGroup.class &&
      newGroup.maxNumber &&
      newGroup.location &&
      newGroup.startTime &&
      newGroup.endTime
    ) {
      let groupToAdd = { ...newGroup, participants: 0 };
      groupToAdd.maxNumber = Number(groupToAdd.maxNumber);
      setStudyGroups(prev => createGroup(prev, groupToAdd));
      setShowModal(false);
      setNewGroup({ name: '', organizer: '', class: '', maxNumber: '', location: '', startTime: '', endTime: '' });
    }
  };

  // Handle join group
  const handleJoinGroup = (index) => {
    setStudyGroups(prev => prev.map((group, i) => {
      if (i === index && group.participants < group.maxNumber) {
        return { ...group, participants: group.participants + 1 };
      }
      return group;
    }));
  };

  if (!isAuth) {
    return (
      <div>
        Hello woklllrd
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white flex flex-col m-0 p-0">
      {/* Top Header with Add Group Button */}
      <header className="w-full bg-gradient-to-r from-blue-900 to-purple-900 py-6 px-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Study Groups</h1>
          <p className="text-gray-300">Find and join study groups for your classes</p>
        </div>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md border border-gray-700 relative">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6">Add New Study Group</h2>
            <form onSubmit={handleAddGroup} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Group Name"
                value={newGroup.name}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none"
                required
              />
              <input
                type="text"
                name="organizer"
                placeholder="Organizer Name"
                value={newGroup.organizer}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none"
                required
              />
              <input
                type="text"
                name="class"
                placeholder="Class (e.g. CS 15-122)"
                value={newGroup.class}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none"
                required
              />
              <input
                type="number"
                name="maxNumber"
                placeholder="Max Participants"
                value={newGroup.maxNumber}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none"
                required
                min={1}
              />
              <select
                name="location"
                value={newGroup.location}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none"
                required
              >
                <option value="">Select Location</option>
                <option value="Hunt Library">Hunt Library</option>
                <option value="Gates Center">Gates Center</option>
                <option value="Doherty Hall">Doherty Hall</option>
                <option value="Mellon Institute">Mellon Institute</option>
                <option value="Baker Hall">Baker Hall</option>
                <option value="University Center">University Center</option>
                <option value="Sorrells Library">Sorrells Library</option>
                <option value="Wean Hall">Wean Hall</option>
                <option value="Porter Hall">Porter Hall</option>
              </select>
              <input
                type="time"
                name="startTime"
                placeholder="Start Time"
                value={newGroup.startTime}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none"
                required
              />
              <input
                type="time"
                name="endTime"
                placeholder="End Time"
                value={newGroup.endTime}
                onChange={handleInputChange}
                className="w-full bg-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 mt-2"
              >
                Add Group
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="w-full px-6 py-6 flex-grow">
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search study groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Class filter and Add Group Button */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg py-3 pl-10 pr-8 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
              >
                <option value="">All Classes</option>
                {uniqueClasses.map(className => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors duration-200"
              onClick={() => setShowModal(true)}
            >
              <Plus className="w-5 h-5" />
              Add Study Group
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredGroups.length} study group{filteredGroups.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Study groups grid and No results message */}
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 auto-rows-fr">
            {filteredGroups.map((group, index) => (
              <StudyGroupCard key={index} group={group} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No study groups found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;