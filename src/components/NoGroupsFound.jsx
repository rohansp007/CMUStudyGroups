import React from 'react';
import { BookOpen } from 'lucide-react';

export const NoGroupsFound = () => (
  <div className="text-center py-12">
    <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-gray-400 mb-2">No study groups found</h3>
    <p className="text-gray-500">Try adjusting your search or filter criteria</p>
  </div>
);
