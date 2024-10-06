import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

export const selectCharityState = (state: RootState) => state.charity;

export const selectAllCharities = createSelector(
  selectCharityState,
  (charityState) => charityState.charities
);

export const selectCharityLoading = createSelector(
  selectCharityState,
  (charityState) => charityState.loading
);
