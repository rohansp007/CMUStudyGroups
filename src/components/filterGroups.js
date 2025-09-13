export function filterGroups(groups, classFilter) {
  if (!classFilter) return groups;
  return groups.filter(group => group.class === classFilter);
}
