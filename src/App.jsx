import React, { useState } from 'react';
import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import Header from './components/Header';
import FiltersBar from './components/FiltersBar';
import ResultsCount from './components/ResultsCount';
import StudyGroupsGrid from './components/StudyGroupsGrid';
import { filterGroups } from './components/filterGroups';
import { searchGroups } from './components/searchGroups';
import { createGroup } from './components/createGroup';
import { StudyGroupCard } from './components/StudyGroupCard';
import { AddGroupModal } from './components/AddGroupModal';
import { NoGroupsFound } from './components/NoGroupsFound';
import {addDoc, collection} from "firebase/firestore"
import {db} from "./firebase-config"


const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  // Removed unused room and roomInputRef

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
    startTime: '',
    endTime: ''
  });

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGroup(prev => ({ ...prev, [name]: value }));
  };

  // Add new group
  const handleAddGroup = async (e) => {
    e.preventDefault();
    if (
      //all this shit exists
      newGroup.name &&
      newGroup.organizer &&
      newGroup.class &&
      newGroup.maxNumber &&
      newGroup.location &&
      newGroup.startTime &&
      newGroup.endTime
    ) {
      let groupToAdd = { ...newGroup, participants: 0 };
      //wtf did you write claude what 
      groupToAdd.maxNumber = Number(groupToAdd.maxNumber);
      // the answer is so right here but idk this syntax
      setStudyGroups(prev => createGroup(prev, groupToAdd));
      await addDoc(groupRef, {
        name: newGroup.name,
        organizer: newGroup.organizer,
        class: newGroup.class,
        maxNumber: newGroup.maxNumber,
        location: newGroup.location,
        startTime: newGroup.startTime,
        endTime: newGroup.endTime
      })
      //reset modal
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
    console.log("Not authenticated");
    return (
      <div>
        Hello woklllrd
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    console.log("Authenticated"),
    <div className="min-h-screen w-screen bg-gray-900 text-white flex flex-col m-0 p-0">
      <Header />
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
          onAddGroupClick={() => setShowModal(true)}
        />
        <ResultsCount count={filteredGroups.length} />
        <StudyGroupsGrid groups={filteredGroups} handleJoinGroup={handleJoinGroup} />
      </div>
    </div>
  );
}

export default App;