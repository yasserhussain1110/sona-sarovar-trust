export const receivedAwards = awards => ({
  type: 'RECEIVED_AWARDS',
  awards
});

export const addedAward = award => ({
  type: 'ADDED_AWARD',
  award
});

export const deletedAward = awardId => ({
  type: 'DELETED_AWARD',
  awardId
});
