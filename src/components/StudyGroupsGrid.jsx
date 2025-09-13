import React from 'react';
import { StudyGroupCard } from './StudyGroupCard';
import { NoGroupsFound } from './NoGroupsFound';


const StudyGroupsGrid = ({ groups, handleFollowGroup, handleUnfollowGroup, userEmail }) => (
  groups.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 auto-rows-fr">
      {groups.map((group) => (
        <StudyGroupCard
          key={group.id}
          group={group}
          handleFollowGroup={handleFollowGroup}
          handleUnfollowGroup={handleUnfollowGroup}
          userEmail={userEmail}
        />
      ))}
    </div>
  ) : (
    <NoGroupsFound />
  )
);

export default StudyGroupsGrid;
