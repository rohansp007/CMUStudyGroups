import React from 'react';
import { StudyGroupCard } from './StudyGroupCard';
import { NoGroupsFound } from './NoGroupsFound';

const StudyGroupsGrid = ({ groups, handleJoinGroup, handleLeaveGroup, joinedGroups }) => (
  groups.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 auto-rows-fr">
      {groups.map((group, index) => (
        <StudyGroupCard
          key={index}
          group={group}
          index={index}
          handleJoinGroup={handleJoinGroup}
          handleLeaveGroup={handleLeaveGroup}
          joined={joinedGroups && joinedGroups.includes(index)}
        />
      ))}
    </div>
  ) : (
    <NoGroupsFound />
  )
);

export default StudyGroupsGrid;
