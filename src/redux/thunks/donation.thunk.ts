import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchDonations, saveDonation } from '../../services/api';
import { DonationDTO } from '../../models/donation.dto';

export const fetchDonationsThunk = createAsyncThunk<DonationDTO[], void, { rejectValue: string }>(
  'donations/fetchDonations',
  async (_, thunkAPI) => {
    try {
      const donations = await fetchDonations();
      return donations;
    } catch (_error) {
      return thunkAPI.rejectWithValue('Failed to fetch donations');
    }
  }
);

export const saveDonationThunk = createAsyncThunk<
  DonationDTO,
  Omit<DonationDTO, 'id'>,
  { rejectValue: string }
>('donations/saveDonation', async (donation, thunkAPI) => {
  try {
    const savedDonation = await saveDonation(donation);
    return savedDonation;
  } catch (_error) {
    return thunkAPI.rejectWithValue('Failed to save donation');
  }
});
