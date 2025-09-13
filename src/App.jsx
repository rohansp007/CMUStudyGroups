import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
  // Use userEmail for followingUsers tracking
  // Make sure userEmail is set after authentication
  

  // Follow a group: add userEmail to group's followingUsers array


import React, { useState, useEffect } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import Header from './components/Header';
import FiltersBar from './components/FiltersBar';
import ResultsCount from './components/ResultsCount';
import StudyGroupsGrid from './components/StudyGroupsGrid';
import { filterGroups } from './components/filterGroups';
import { searchGroups } from './components/searchGroups';
//import { createGroup } from './components/createGroup';
import { StudyGroupCard } from './components/StudyGroupCard';
import { AddGroupModal } from './components/AddGroupModal';
import { NoGroupsFound } from './components/NoGroupsFound';
import {addDoc, collection, onSnapshot} from "firebase/firestore"
import {db} from "./firebase-config"


const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const userEmail = cookies.get('user-email'); // Or get from your auth state
  // Removed unused room and roomInputRef

  // Study groups state
  const [studyGroups, setStudyGroups] = useState([]);

  // Fetch groups from Firebase on mount
  useEffect(() => {
    // Real-time listener for study groups
    const unsubscribe = onSnapshot(groupRef, (snapshot) => {
      const groups = snapshot.docs.map(docSnap => ({
        ...docSnap.data(),
        id: docSnap.id
      }));
      setStudyGroups(groups);
    });
    return () => {
      console.log("Unsubscribing function was called");
      unsubscribe()
    };
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // Get unique classes and locations for filter dropdowns
  const uniqueClasses = [...new Set(studyGroups.map(group => group.class))];
  const uniqueLocations = [...new Set(studyGroups.map(group => group.location))];

  // Filter study groups based on search, class, and location filter
  let filteredGroups = filterGroups(
    searchGroups(studyGroups, searchTerm),
    classFilter
  );
  if (locationFilter) {
    filteredGroups = filteredGroups.filter(group => group.location === locationFilter);
  }

  // Modal state
  const [showModal, setShowModal] = useState(false);

  //OOOOOOOOOOOOOOOOOOO
  const groupRef = collection(db, "groups");
  const [newGroup, setNewGroup] = useState({
    name: '',
    organizer: '',
    class: '',
    maxNumber: '',
    location: '',
    startDate: '',
    startHour: '1',
    startMinute: '00',
    startAMPM: 'AM',
    endDate: '',
    endHour: '1',
    endMinute: '00',
    endAMPM: 'AM'
  });

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup(prev => ({ ...prev, [name]: value }));
  };

  const handleFollowGroup = async (groupId, followingUsers) => {
    console.log(userEmail);
    if (!userEmail || !groupId) return;
    if (followingUsers && followingUsers.includes(userEmail)) return; // Already following
    const groupRef = doc(db, "groups", groupId);
    await updateDoc(groupRef, {
      followingUsers: arrayUnion(userEmail)
    });
  };

  // Unfollow a group: remove userEmail from group's followingUsers array
  const handleUnfollowGroup = async (groupId, followingUsers) => {
    if (!userEmail || !groupId) return;
    if (!followingUsers || !followingUsers.includes(userEmail)) return; // Not following
    const groupRef = doc(db, "groups", groupId);
    await updateDoc(groupRef, {
      followingUsers: arrayRemove(userEmail)
    });
  };


  // Add new group
  const handleAddGroup = async (e) => {
    e.preventDefault();
    if (
      newGroup.name &&
      newGroup.organizer &&
      newGroup.class &&
      newGroup.maxNumber &&
      newGroup.location &&
      newGroup.startDate &&
      newGroup.startHour &&
      newGroup.startMinute &&
      newGroup.startAMPM &&
      newGroup.endDate &&
      newGroup.endHour &&
      newGroup.endMinute &&
      newGroup.endAMPM
    ) {
      // Compose start and end datetime strings
      const startDateTime = `${newGroup.startDate} @ ${newGroup.startHour.padStart(2, '0')}:${newGroup.startMinute} ${newGroup.startAMPM}`;
      const endDateTime = `${newGroup.endDate} @ ${newGroup.endHour.padStart(2, '0')}:${newGroup.endMinute} ${newGroup.endAMPM}`;
      let groupToAdd = {
        ...newGroup,
        startDateTime,
        endDateTime,
        maxNumber: Number(newGroup.maxNumber),
        participants: 0, // Always include participants field
        followingUsers: [] // Add followingUsers field
      };
      await addDoc(groupRef, groupToAdd);
      setShowModal(false);
      setNewGroup({
        name: '',
        organizer: '',
        class: '',
        maxNumber: '',
        location: '',
        startDate: '',
        startHour: '1',
        startMinute: '00',
        startAMPM: 'AM',
        endDate: '',
        endHour: '1',
        endMinute: '00',
        endAMPM: 'AM'
      });
    }
  };

    // Reorder groups so followed groups appear first
  const orderedGroups = [
    ...filteredGroups.filter(g => g.followingUsers && g.followingUsers.includes(userEmail)),
    ...filteredGroups.filter(g => !g.followingUsers || !g.followingUsers.includes(userEmail))
  ];

  // Track which groups the user has joined (by group id)
  // const [joinedGroups, setJoinedGroups] = useState([]);

  // Handle join group
  // const handleJoinGroup = async (index) => {
  //   const group = filteredGroups[index];
  //   if (!group || !group.id) return;
  //   if (joinedGroups.includes(group.id)) return;
  //   const currentParticipants = typeof group.participants === 'number' ? group.participants : 0;
  //   if (currentParticipants < group.maxNumber) {
  //     const groupDocRef = doc(db, "groups", group.id);
  //     await updateDoc(groupDocRef, {
  //       participants: currentParticipants + 1
  //     });
  //     setStudyGroups(prev => prev.map(g => g.id === group.id ? { ...g, participants: currentParticipants + 1 } : g));
  //     setJoinedGroups(prev => [...prev, group.id]);
  //   }
  // };

  // // Handle leave group
  // const handleLeaveGroup = async (index) => {
  //   const group = filteredGroups[index];
  //   if (!group || !group.id) return;
  //   if (!joinedGroups.includes(group.id)) return;
  //   const currentParticipants = typeof group.participants === 'number' ? group.participants : 0;
  //   if (currentParticipants > 0) {
  //     const groupDocRef = doc(db, "groups", group.id);
  //     await updateDoc(groupDocRef, {
  //       participants: currentParticipants - 1
  //     });
  //     setStudyGroups(prev => prev.map(g => g.id === group.id ? { ...g, participants: currentParticipants - 1 } : g));
  //     setJoinedGroups(prev => prev.filter(id => id !== group.id));
  //   }
  // };

  if (!isAuth) {
    console.log("Not authenticated");
    return (
      <div>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    console.log("Authenticated"),
    <div className="min-h-screen w-screen bg-gray-900 text-white flex flex-col m-0 p-0">
      <Header userEmail={userEmail}/>
      <AddGroupModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddGroup}
        newGroup={newGroup}
        onInputChange={handleInputChange}
      />
      <div className="w-full px-6 py-6 flex-grow">
        <FiltersBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          classFilter={classFilter}
          setClassFilter={setClassFilter}
          uniqueClasses={uniqueClasses}
          locationFilter={locationFilter}
          setLocationFilter={setLocationFilter}
          uniqueLocations={uniqueLocations}
          onAddGroupClick={() => setShowModal(true)}
        />
        <ResultsCount count={filteredGroups.length} />
        <StudyGroupsGrid
          groups={orderedGroups}
          handleFollowGroup={handleFollowGroup}
          handleUnfollowGroup={handleUnfollowGroup}
          userEmail={userEmail}
        />
      </div>
    </div>
  );
}

export default App;