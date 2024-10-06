import React, { useState } from 'react';
import styled from 'styled-components';

import DonationModal from './DonationModal'; // Import the DonationModal component
import DonateButton from './DonateButton.styles';

import { CharityDTO } from '../models/charity.dto'; // Corrected import for CharityDTO

// Define the props for CharityCard, including a custom onDonate function
interface CharityCardProps {
  charity: CharityDTO;
  onDonate: (amount: number, charity: CharityDTO) => void; // New onDonate prop
}

// Styled components for CharityCard
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
  /* margin: 20px; */
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

// const DonateButton = styled.button`
//   width: 100%;
//   padding: 12px;
//   background-color: #1a53f0;
//   color: white;
//   font-weight: 600;
//   font-size: 1rem;
//   border-radius: 8px;
//   cursor: pointer;
//   transition: background-color 0.2s;

//   &:hover {
//     background-color: #357ab9;
//   }
// `;

// CharityCard Component
const CharityCard: React.FC<CharityCardProps> = ({ charity, onDonate }) => {
  // Destructure the charity object to extract relevant fields
  const { name, image, currency } = charity;

  const [isModalOpen, setIsModalOpen] = useState(false); // Internal state for modal visibility
  const [selectedAmount, setSelectedAmount] = useState<number>(10); // Default donation amount

  const imagePath = `/images/${image}`;

  // Function to handle opening the donation modal
  const handleOpenDonationModal = (): void => {
    console.log('Modal opened'); // Add any custom logic here
    setIsModalOpen(true); // Open modal
  };

  // Function to handle closing the donation modal
  const handleCloseDonationModal = (): void => {
    console.log('Modal closed'); // Add any custom logic here
    setIsModalOpen(false); // Close modal
  };

  // Function to handle the selected donation amount
  const handleAmountChange = (amount: number): void => {
    setSelectedAmount(amount); // Update selected amount
  };

  // Function to handle the donation confirmation using the passed onDonate prop
  const handleDonate = (): void => {
    onDonate(selectedAmount, charity); // Call the parent’s onDonate function
    handleCloseDonationModal(); // Close the modal after donation
  };

  return (
    <Card>
      <Image src={imagePath} alt={name} />
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <DonateButton onClick={handleOpenDonationModal}>Donate</DonateButton>
      </CardContent>

      {/* Modal Component */}
      <DonationModal
        isOpen={isModalOpen} // Controls whether modal is open
        onClose={handleCloseDonationModal} // Handles closing modal
        selectedAmount={selectedAmount} // Currently selected donation amount
        currency={currency} // Currency for donation
        handleAmountChange={handleAmountChange} // Handles donation amount change
        onDonate={handleDonate} // Handles donation confirmation
      />
    </Card>
  );
};

export default CharityCard;
