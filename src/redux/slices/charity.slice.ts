// charity.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CharityStateDTO } from '../../models/charityState.dto';
import { CharityDTO } from '../../models/charity.dto';

import { fetchCharitiesThunk } from '../thunks/charity.thunk';

const initialState: CharityStateDTO = {
  charities: [], // List of CharityDTO[]
  loading: false,
  errorMessage: undefined,
};

const charitySlice = createSlice({
  name: 'charity',
  initialState,
  reducers: {
    addCharity: (state, action: PayloadAction<CharityDTO>) => {
      state.charities.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharitiesThunk.pending, (state) => {
        state.loading = true;

        console.log('Fetching charities...');
      })
      .addCase(fetchCharitiesThunk.fulfilled, (state, action: PayloadAction<CharityDTO[]>) => {
        state.charities = action.payload;
        state.loading = false;

        console.log('Charities fetched:', action.payload);
      })
      .addCase(fetchCharitiesThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload || 'Failed to fetch charities';
      });
  },
});

export const { addCharity } = charitySlice.actions;

export default charitySlice.reducer;
