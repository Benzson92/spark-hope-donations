import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DonationDTO } from '../../models/donation.dto';
import { fetchDonationsThunk, saveDonationThunk } from '../thunks/donation.thunk';

const initialState = {
  totalDonated: 0,
  donations: [] as DonationDTO[], // Renamed from payments to donations
  loading: false,
  // error: null as string | null,
  statusMessage: '',
};

const donationSlice = createSlice({
  name: 'donation',
  initialState,
  reducers: {
    addDonation: (state, action: PayloadAction<DonationDTO>) => {
      state.donations.push(action.payload);
      state.totalDonated += action.payload.amount;
    },
    // setMessage: (state, action: PayloadAction<string>) => {
    //   state.message = action.payload;
    // },
    // clearMessage: (state) => {
    //   state.message = '';
    // },
    // resetDonationState: (state) => {
    //   state.totalDonated = initialState.totalDonated;
    //   state.message = initialState.message;
    //   state.payments = [];
    //   state.charities = [];
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDonationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDonationsThunk.fulfilled, (state, action: PayloadAction<DonationDTO[]>) => {
        state.donations = action.payload;
        state.totalDonated = action.payload.reduce((sum, donation) => sum + donation.amount, 0);
        state.loading = false;
      })
      .addCase(fetchDonationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.statusMessage = action.payload || 'Failed to fetch donations';
      })
      .addCase(saveDonationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveDonationThunk.fulfilled, (state, action: PayloadAction<DonationDTO>) => {
        state.donations.push(action.payload);
        state.totalDonated += action.payload.amount;
        state.loading = false;

        console.log('Donation saved:', action.payload);
      })
      .addCase(saveDonationThunk.rejected, (state, action) => {
        state.loading = false;
        state.statusMessage = action.payload || 'Failed to save donation';
      });
  },
});

export const { addDonation } = donationSlice.actions;
export default donationSlice.reducer;
