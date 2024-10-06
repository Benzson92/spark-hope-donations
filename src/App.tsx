// src/App.tsx
import React, { useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Redux hooks and actions
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { fetchCharitiesThunk } from './redux/thunks/charity.thunk'; // Fetch charities thunk
import { fetchDonationsThunk, saveDonationThunk } from './redux/thunks/donation.thunk'; // Donation thunks

// Import selectors
import { selectAllCharities, selectCharityLoading } from './redux/selectors/charity.selector';
import { selectTotalDonated } from './redux/selectors/donation.selector'; // Import selectTotalDonated

import { CharityDTO } from './models/charity.dto'; // Import the CharityDTO type

import { formatNumber } from './utils/formatNumber.util'; // Import the formatNumber utility

// Import components
import CharityCard from './components/CharityCard'; // Default export CharityCard

// Styled components
const AppContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.5rem 20px;
  text-align: center;
  /* max-width: 1280px; */
`;

const CharityListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center; /* Center cards horizontally */
  gap: 2.5rem; /* Add space between the cards */
  padding: 1rem 0;
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem; /* Default smaller gap */

  @media (min-width: 640px) {
    gap: 0; /* Larger gap for screens 768px and wider */
  }
`;

const Heading1 = styled.h1`
  color: #333;
`;

const Heading2 = styled.h2`
  margin: 2.5rem 0;
  color: #666;
`;

const TotalDonated = styled.span`
  font-size: 3rem;
  font-weight: bold;
  color: #1a53f0;
`;

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  // Use selectors to get state from the Redux store
  const charities = useAppSelector(selectAllCharities); // Access all charities
  const loading = useAppSelector(selectCharityLoading); // Access loading state for charities
  const totalDonated = useAppSelector(selectTotalDonated); // Access total donated amount

  const formattedTotalDonated = useMemo(() => formatNumber(totalDonated), [totalDonated]);

  console.log('charities:', charities);
  console.log('loading:', loading);
  console.log('totalDonated:', totalDonated);

  // Fetch charities and donations when the component loads using the provided thunks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all([
          dispatch(fetchCharitiesThunk()).unwrap(), // Fetch charities from the API
          dispatch(fetchDonationsThunk()).unwrap(), // Fetch donations from the API
        ]);

        console.log('Data fetched:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Handle donation (save the donation) using the provided donation thunk
  const handleDonate = useCallback(
    async (amount: number, charity: CharityDTO) => {
      try {
        // Destructure the charity object
        const { id: charityId, name, currency } = charity;

        // Save the donation using the thunk
        const newDonation = {
          charitiesId: charityId,
          amount,
          currency,
        };

        const data = await dispatch(saveDonationThunk(newDonation)).unwrap();

        console.log('Donation saved:', data);

        // Show success toast
        toast.success(`Thank you for donating ${amount} ${currency} to ${name}!`);
      } catch (error) {
        toast.error('Failed to process your donation. Please try again.');
        console.error('Donation failed:', error);
      }
    },
    [dispatch]
  );

  // Display loading indicator if data is still being fetched
  if (loading) {
    return <div>Loading charities...</div>;
  }

  return (
    <AppContainer>
      <HeadingWrapper>
        <Heading1>One Donation, Infinite Impact</Heading1>
        <Heading1>Together, We Shape a Brighter Tomorrow</Heading1>
      </HeadingWrapper>

      <Heading2>
        Total Contributions <TotalDonated>{formattedTotalDonated}</TotalDonated> THB and Growing!
      </Heading2>

      <CharityListWrapper>
        {charities.map((charity) => (
          <CharityCard
            key={charity.id} // Use a unique key (like the charity id)
            charity={charity} // Pass the charity object as a prop
            onDonate={handleDonate} // Pass the handleDonate function
          />
        ))}
      </CharityListWrapper>
      <ToastContainer />
    </AppContainer>
  );
};

export default App;
