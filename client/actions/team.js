export const receivedTeamMembers = teamMembers => (
  {
    type: 'RECEIVED_TEAM_MEMBERS',
    teamMembers
  }
);

export const updatedTeamMember = teamMember => (
  {
    type: 'UPDATED_TEAM_MEMBER',
    teamMember
  }
);


export const addedTeamMember = teamMember => (
  {
    type: 'ADDED_TEAM_MEMBER',
    teamMember
  }
);
