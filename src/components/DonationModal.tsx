import React from 'react';
import styled from 'styled-components';

import Chip from './Chip';
import DonateButton from './DonateButton.styles';

// TypeScript props definition for DonationModal
interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAmount: number;
  currency: string; // Added currency prop
  handleAmountChange: (amount: number) => void;
  onDonate: () => void; // Triggered when the user confirms donation
}

// Styled-components for Modal
const ModalOverlay = styled.div`
  position: absolute; /* Make it contained within the card */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75); /* Adjust opacity */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit; /* Keep the border-radius of the card */
  z-index: 10;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: inherit;
  padding: 20px;
  /* max-width: 400px; */
  width: 100%;
  height: 100%;
  /* box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  margin-top: 1.5rem;
`;

const CloseButton = styled.button`
  /* background: transparent; */
  /* border: none; */
  font-size: 2rem;
  color: #777;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem 1rem;
  /* cursor: pointer; */

  &:hover {
    color: #333;
  }
`;

const AmountOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  /* margin-bottom: 20px; */
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

const amounts = [10, 20, 50, 100, 500];

const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  selectedAmount,
  currency, // Added currency prop
  handleAmountChange,
  onDonate, // Renamed from handlePay to onDonate
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <ModalTitle>Select the amount to donate ({currency})</ModalTitle>
        <AmountOptions>
          {amounts.map((amount) => (
            <Chip
              key={amount}
              label={`${amount} ${currency}`}
              selected={selectedAmount === amount}
              onClick={() => handleAmountChange(amount)}
            />
          ))}
        </AmountOptions>
        <DonateButton onClick={onDonate}>
          Donate {selectedAmount} {currency} {/* Updated to use currency prop */}
        </DonateButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DonationModal;
