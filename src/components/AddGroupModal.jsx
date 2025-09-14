import React from 'react';

export const AddGroupModal = ({ show, onClose, onSubmit, newGroup, onInputChange, organizerName }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md border border-gray-700 relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6">Add New Study Group</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Group Name"
            value={newGroup.name}
            onChange={onInputChange}
            className="w-full bg-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none"
            required
          />
          <input
            type="text"
            name="organizer"
            placeholder="Organizer Name"
            value={organizerName || ''}
            readOnly
            className="w-full bg-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none"
            required
          />
          <input
            type="text"
            name="class"
            placeholder="Class (e.g. CS 15-122)"
            value={newGroup.class}
            onChange={onInputChange}
            className="w-full bg-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none"
            required
          />
          <input
            type="number"
            name="maxNumber"
            placeholder="Max Participants"
            value={newGroup.maxNumber}
            onChange={onInputChange}
            className="w-full bg-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-400 focus:outline-none"
            required
            min={1}
          />
          <select
            name="location"
            value={newGroup.location}
            onChange={onInputChange}
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
          <label className="block text-gray-400 mb-1">Start Date and Time</label>
          <div className="flex gap-2 mb-2 items-center">
            <input
              type="date"
              name="startDate"
              value={newGroup.startDate}
              onChange={onInputChange}
              className="bg-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none"
              required
            />
            <select name="startHour" value={newGroup.startHour} onChange={onInputChange} className="bg-gray-700 rounded-lg py-2 px-2 text-white" required>
              {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
            <span className="text-white flex items-center justify-center" style={{ minWidth: '16px' }}>:</span>
            <select name="startMinute" value={newGroup.startMinute} onChange={onInputChange} className="bg-gray-700 rounded-lg py-2 px-2 text-white" required>
              {[...Array(60)].map((_, i) => <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>)}
            </select>
            <select name="startAMPM" value={newGroup.startAMPM} onChange={onInputChange} className="bg-gray-700 rounded-lg py-2 px-2 text-white" required>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <label className="block text-gray-400 mb-1">End Date and Time</label>
          <div className="flex gap-2 mb-2 items-center">
            <input
              type="date"
              name="endDate"
              value={newGroup.endDate}
              onChange={onInputChange}
              className="bg-gray-700 rounded-lg py-2 px-3 text-white focus:outline-none"
              required
            />
            <select name="endHour" value={newGroup.endHour} onChange={onInputChange} className="bg-gray-700 rounded-lg py-2 px-2 text-white" required>
              {[...Array(12)].map((_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
            </select>
            <span className="text-white flex items-center justify-center" style={{ minWidth: '16px' }}>:</span>
            <select name="endMinute" value={newGroup.endMinute} onChange={onInputChange} className="bg-gray-700 rounded-lg py-2 px-2 text-white" required>
              {[...Array(60)].map((_, i) => <option key={i} value={i.toString().padStart(2, '0')}>{i.toString().padStart(2, '0')}</option>)}
            </select>
            <select name="endAMPM" value={newGroup.endAMPM} onChange={onInputChange} className="bg-gray-700 rounded-lg py-2 px-2 text-white" required>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 mt-2"
          >
            Add Group
          </button>
        </form>
      </div>
    </div>
  );
};
