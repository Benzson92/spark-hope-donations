import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectDonationState = (state: RootState) => state.donation;

export const selectTotalDonated = createSelector(
  selectDonationState,
  (donationState) => donationState.totalDonated
);
