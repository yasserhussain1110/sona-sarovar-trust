import {updateSingleObjectInArray} from '../lib/helpers/functions';

const defaultState = {
  teamMembers: []
};

const team = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADDED_TEAM_MEMBER':
      return {
        teamMembers: [
          ...state.teamMembers,
          action.teamMember
        ]
      };
    case 'RECEIVED_TEAM_MEMBERS':
      return {
        teamMembers: action.teamMembers
      };
    case 'UPDATED_TEAM_MEMBER': {
      const teamMemberIndex =
        state.teamMembers.findIndex(teamMember => teamMember._id === action.teamMember._id);

      return {
        teamMembers: updateSingleObjectInArray(state.teamMembers, teamMemberIndex, teamMember => {
          Object.assign(teamMember, action.teamMember);
        })
      };
    }
    default:
      return state;
  }
};

export default team;
