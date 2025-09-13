import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { db } from '../firebase-config';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';


// UserProfileDropdown component using userData
const UserProfileDropdown = ({ userData }) => (
  <div className="absolute left-[-40px] top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-10 p-6 text-black">
    <div className="mb-2 font-bold text-lg">{userData?.displayName || 'Unknown User'}</div>
    <div className="mb-2 text-sm"><span className="font-semibold">Email:</span> {userData?.email || 'N/A'}</div>
    <div className="mb-2 text-sm"><span className="font-semibold">Classes:</span> {userData?.classes?.length > 0 ? userData.classes.join(', ') : 'No classes'}</div>
    <div className="mb-2 text-sm"><span className="font-semibold">Major:</span> {userData?.major || 'N/A'}</div>
    <div className="mb-2 text-sm"><span className="font-semibold">Year:</span> {userData?.year || 'N/A'}</div>
    {/* Add more fields as needed from userData */}
  </div>
);

// UpdateProfileDropdown component for updating user profile
const UpdateProfileDropdown = ({ userData, onUpdate }) => {
  const [form, setForm] = useState({
    major: userData?.major || '',
    year: userData?.year || '',
    classes: userData?.classes ? userData.classes.join(', ') : '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onUpdate({
      major: form.major,
      year: form.year,
      classes: form.classes.split(',').map(c => c.trim()),
    });
    setLoading(false);
  };

  return (
    <div className="absolute left-[-40px] top-full mt-2 w-80 bg-white rounded-lg shadow-lg z-10 p-6 text-black" onMouseEnter={e => e.stopPropagation()} onMouseLeave={e => e.stopPropagation()}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block font-semibold mb-1">Major</label>
          <input name="major" value={form.major} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Year</label>
          <input name="year" value={form.year} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label className="block font-semibold mb-1">Classes (comma separated)</label>
          <input name="classes" value={form.classes} onChange={handleChange} className="w-full border rounded px-2 py-1" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{loading ? 'Updating...' : 'Update Profile'}</button>
      </form>
    </div>
  );
};

// Dummy mouse event handlers
const handleMouseEnter = () => {};
const handleMouseLeave = () => {};


const Header = ({ userEmail }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showUpdateDropdown, setShowUpdateDropdown] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      if (!userEmail) return;
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', userEmail));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setUserData(snapshot.docs[0].data());
      }
    }
    fetchUser();
  }, [userEmail]);

  // Update profile in Firestore
  const handleProfileUpdate = async (updates) => {
    if (!userEmail) return;
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', userEmail));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const userDoc = doc(db, 'users', snapshot.docs[0].id);
      await updateDoc(userDoc, updates);
      setUserData(prev => ({ ...prev, ...updates }));
    }
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-900 to-purple-900 py-6 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold mb-2">Study Groups</h1>
        <p className="text-gray-300">Find and join study groups for your classes</p>
      </div>
      <div className="flex gap-[2px]">
        <div className="relative flex items-center" style={{ marginRight: '2px' }}>
          <div
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 cursor-pointer"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{ minWidth: '160px' }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {userData?.displayName ? userData.displayName.split(' ').map(n => n[0]).join('') : 'U'}
            </div>
            <span className="text-white font-medium">{userData?.displayName || 'Unknown User'}</span>
            <ChevronDown className="w-4 h-4 text-gray-300" />
            {showDropdown && <UserProfileDropdown userData={userData} />}
          </div>
        </div>
        <div className="relative flex items-center" style={{ minWidth: '160px' }}>
          <div
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 cursor-pointer"
            onClick={() => setShowUpdateDropdown(v => !v)}
          >
            <span className="text-white font-medium">Update Profile</span>
            <ChevronRight className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${showUpdateDropdown ? 'rotate-90' : ''}`} />
          </div>
          {showUpdateDropdown && <UpdateProfileDropdown userData={userData} onUpdate={handleProfileUpdate} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
