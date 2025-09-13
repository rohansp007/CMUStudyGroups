import React from 'react';
import { User, Users, MapPin, Clock } from 'lucide-react';

function formatTime12hr(time) {
  if (!time) return '';
  let [hour, minute] = time.split(':');
  hour = parseInt(hour, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

export const StudyGroupCard = ({ group, index, handleJoinGroup }) => {
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
