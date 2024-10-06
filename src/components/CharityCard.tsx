import React, { useState } from 'react';
import styled from 'styled-components';

import DonationModal from './DonationModal';
import DonateButton from './DonateButton.styles';

import { CharityDTO } from '../models/charity.dto';

interface CharityCardProps {
  charity: CharityDTO;
  onDonate: (amount: number, charity: CharityDTO) => void;
}

const Card = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 100%;
  max-width: 360px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const CharityCard: React.FC<CharityCardProps> = ({ charity, onDonate }) => {
  const { name, image, currency } = charity;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(10);

  const imagePath = `/images/${image}`;

  const handleOpenDonationModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCloseDonationModal = (): void => {
    setIsModalOpen(false);
  };

  const handleAmountChange = (amount: number): void => {
    setSelectedAmount(amount);
  };

  const handleDonate = (): void => {
    onDonate(selectedAmount, charity);
    handleCloseDonationModal();
  };

  return (
    <Card>
      <Image src={imagePath} alt={name} />
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <DonateButton onClick={handleOpenDonationModal}>Donate</DonateButton>
      </CardContent>

      <DonationModal
        isOpen={isModalOpen}
        onClose={handleCloseDonationModal}
        selectedAmount={selectedAmount}
        currency={currency}
        handleAmountChange={handleAmountChange}
        onDonate={handleDonate}
      />
    </Card>
  );
};

export default CharityCard;
