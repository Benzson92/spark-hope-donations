// src/redux/selectors/donation.selector.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Assuming you have RootState set up in your store configuration

// Select the base donation state
export const selectDonationState = (state: RootState) => state.donation;

// Selector to get all donations
export const selectAllDonations = createSelector(
  selectDonationState,
  (donationState) => donationState.donations
);

// Selector to get the total donated amount
export const selectTotalDonated = createSelector(
  selectDonationState,
  (donationState) => donationState.totalDonated
);

// Selector to get the loading state
export const selectDonationLoading = createSelector(
  selectDonationState,
  (donationState) => donationState.loading
);

// Selector to get the status message (for errors or other info)
export const selectDonationStatusMessage = createSelector(
  selectDonationState,
  (donationState) => donationState.statusMessage
);
