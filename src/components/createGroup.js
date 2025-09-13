export function createGroup(groups, newGroup) {
  return [...groups, { ...newGroup, maxNumber: Number(newGroup.maxNumber) }];
}