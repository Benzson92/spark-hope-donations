import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CharityStateDTO } from '../../models/charityState.dto';
import { CharityDTO } from '../../models/charity.dto';

import { fetchCharitiesThunk } from '../thunks/charity.thunk';

const initialState: CharityStateDTO = {
  charities: [],
  loading: false,
  errorMessage: undefined,
};

const charitySlice = createSlice({
  name: 'charity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharitiesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharitiesThunk.fulfilled, (state, action: PayloadAction<CharityDTO[]>) => {
        state.charities = action.payload;
        state.loading = false;
      })
      .addCase(fetchCharitiesThunk.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload || 'Failed to fetch charities';
      });
  },
});

export default charitySlice.reducer;
