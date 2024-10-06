import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchCharities } from '../../services/api'; // Assume this is an API service that fetches charities
import { CharityDTO } from '../../models/charity.dto';

// Fetch Charities Thunk
export const fetchCharitiesThunk = createAsyncThunk<CharityDTO[], void, { rejectValue: string }>(
  'charities/fetchCharities',
  async (_, thunkAPI) => {
    try {
      const charities = await fetchCharities();
      return charities;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch charities');
    }
  }
);
