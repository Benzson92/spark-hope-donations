import React from 'react';
import styled from 'styled-components';

import Chip from './Chip';
import DonateButton from './DonateButton.styles';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAmount: number;
  currency: string;
  handleAmountChange: (amount: number) => void;
  onDonate: () => void;
}

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: inherit;
  z-index: 10;
`;

const ModalContent = styled.div`
  background-color: white;
  border-radius: inherit;
  padding: 20px;
  width: 100%;
  height: 100%;
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
  font-size: 2rem;
  color: #777;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem 1rem;

  &:hover {
    color: #333;
  }
`;

const AmountOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

const amounts = [10, 20, 50, 100, 500];

const DonationModal: React.FC<DonationModalProps> = ({
  isOpen,
  onClose,
  selectedAmount,
  currency,
  handleAmountChange,
  onDonate,
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
          Donate {selectedAmount} {currency}
        </DonateButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DonationModal;
