import React, { useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector, useAppDispatch } from './redux/hooks';
import { fetchCharitiesThunk } from './redux/thunks/charity.thunk';
import { fetchDonationsThunk, saveDonationThunk } from './redux/thunks/donation.thunk';

import { selectAllCharities, selectCharityLoading } from './redux/selectors/charity.selector';
import { selectTotalDonated } from './redux/selectors/donation.selector';

import { CharityDTO } from './models/charity.dto';
import { formatNumber } from './utils/formatNumber.util';

import CharityCard from './components/CharityCard';

const AppContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.5rem 20px;
  text-align: center;
`;

const CharityListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.5rem;
  padding: 1rem 0;
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (min-width: 640px) {
    gap: 0;
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

  const charities = useAppSelector(selectAllCharities);
  const loading = useAppSelector(selectCharityLoading);
  const totalDonated = useAppSelector(selectTotalDonated);

  const formattedTotalDonated = useMemo(() => formatNumber(totalDonated), [totalDonated]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(fetchCharitiesThunk()).unwrap(),
          dispatch(fetchDonationsThunk()).unwrap(),
        ]);
      } catch (_error) {
        toast.error('Failed to fetch charities and donations. Please try again.');
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDonate = useCallback(
    async (amount: number, charity: CharityDTO) => {
      try {
        const { id: charityId, name, currency } = charity;

        const newDonation = {
          charitiesId: charityId,
          amount,
          currency,
        };

        await dispatch(saveDonationThunk(newDonation)).unwrap();

        toast.success(`Thank you for donating ${amount} ${currency} to ${name}!`);
      } catch (_error) {
        toast.error('Failed to process your donation. Please try again.');
      }
    },
    [dispatch]
  );

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
          <CharityCard key={charity.id} charity={charity} onDonate={handleDonate} />
        ))}
      </CharityListWrapper>
      <ToastContainer />
    </AppContainer>
  );
};

export default App;
