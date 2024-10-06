import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchCharities } from '../../services/api';
import { CharityDTO } from '../../models/charity.dto';

export const fetchCharitiesThunk = createAsyncThunk<CharityDTO[], void, { rejectValue: string }>(
  'charities/fetchCharities',
  async (_, thunkAPI) => {
    try {
      const charities = await fetchCharities();
      return charities;
    } catch (_error) {
      return thunkAPI.rejectWithValue('Failed to fetch charities');
    }
  }
);
