// src/redux/selectors/charity.selector.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store'; // Adjust according to your actual store setup
import { CharityDTO } from '../../models/charity.dto';

// Base selector to get the entire charity state
export const selectCharityState = (state: RootState) => state.charity;

// Selector to get all charities
export const selectAllCharities = createSelector(
  selectCharityState,
  (charityState) => charityState.charities
);

// Selector to create a lookup table for charities by ID
export const selectAllCharitiesById = createSelector(
  selectAllCharities,
  (charities: CharityDTO[]): Record<number, CharityDTO> =>
    charities.reduce(
      (acc, charity) => {
        acc[charity.id] = charity;
        return acc;
      },
      {} as Record<number, CharityDTO>
    )
);

// Selector to get a specific charity by ID
export const selectCharityById = createSelector(
  [selectAllCharitiesById, (_state: RootState, charityId: number) => charityId],
  (charitiesById: Record<number, CharityDTO>, charityId: number): CharityDTO | undefined =>
    charitiesById[charityId]
);

// Selector to get the loading state
export const selectCharityLoading = createSelector(selectCharityState, (charityState) => {
  console.log('selectCharityLoading charityState:', charityState);
  return charityState.loading;
});

// Selector to get the error message
export const selectCharityErrorMessage = createSelector(
  selectCharityState,
  (charityState) => charityState.errorMessage
);
