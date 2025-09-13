export function searchGroups(groups, searchTerm) {
  if (!searchTerm) return groups;
  const term = searchTerm.toLowerCase();
  return groups.filter(group =>
    group.name.toLowerCase().includes(term) ||
    group.organizer.toLowerCase().includes(term) ||
    group.class.toLowerCase().includes(term)
  );
}
