import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchDonations, saveDonation } from '../../services/api'; // Renamed API calls directly
import { DonationDTO } from '../../models/donation.dto'; // Using DonationDTO

// Fetch Donations Thunk
export const fetchDonationsThunk = createAsyncThunk<DonationDTO[], void, { rejectValue: string }>(
  'donations/fetchDonations',
  async (_, thunkAPI) => {
    try {
      const donations = await fetchDonations(); // Directly call fetchDonations without aliasing
      return donations;
    } catch (_error) {
      return thunkAPI.rejectWithValue('Failed to fetch donations');
    }
  }
);

// Save Donation Thunk
export const saveDonationThunk = createAsyncThunk<
  DonationDTO,
  Omit<DonationDTO, 'id'>,
  { rejectValue: string }
>('donations/saveDonation', async (donation, thunkAPI) => {
  try {
    const savedDonation = await saveDonation(donation); // Directly call saveDonation without aliasing
    return savedDonation;
  } catch (_error) {
    return thunkAPI.rejectWithValue('Failed to save donation');
  }
});
