import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';

import DonationModal from '../../components/DonationModal';

describe('DonationModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    selectedAmount: 50,
    currency: 'USD',
    handleAmountChange: jest.fn(),
    onDonate: jest.fn(),
  };

  it('should not render when isOpen is false', () => {
    render(<DonationModal {...defaultProps} isOpen={false} />);

    const modalTitle = screen.queryByText(/Select the amount to donate/i);
    expect(modalTitle).not.toBeInTheDocument(); // Modal should not render
  });

  it('should render correctly when isOpen is true', () => {
    render(<DonationModal {...defaultProps} />);

    const modalTitle = screen.getByText(/Select the amount to donate \(USD\)/i);
    expect(modalTitle).toBeInTheDocument(); // Modal is rendered
  });

  it('should call onClose when close button is clicked', () => {
    render(<DonationModal {...defaultProps} />);

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1); // Ensure onClose is called once
  });

  it('should highlight selected amount', () => {
    render(<DonationModal {...defaultProps} />);

    const selectedChip = screen.getByText('50 USD');
    expect(selectedChip).toHaveStyle('color: #1a53f0'); // Assuming Chip changes color
  });

  it('should call handleAmountChange when a new amount is selected', () => {
    render(<DonationModal {...defaultProps} />);

    const newAmountChip = screen.getByText('100 USD');
    fireEvent.click(newAmountChip);

    expect(defaultProps.handleAmountChange).toHaveBeenCalledWith(100); // Ensure the correct amount is passed
  });

  it('should call onDonate when the donate button is clicked', () => {
    render(<DonationModal {...defaultProps} />);

    const donateButton = screen.getByText(/Donate 50 USD/i);
    fireEvent.click(donateButton);

    expect(defaultProps.onDonate).toHaveBeenCalledTimes(1); // Ensure onDonate is called once
  });

  it('should display correct amount and currency in the donate button', () => {
    render(<DonationModal {...defaultProps} selectedAmount={20} currency="EUR" />);

    const donateButton = screen.getByText(/Donate 20 EUR/i);
    expect(donateButton).toBeInTheDocument(); // Ensure the button reflects the correct amount and currency
  });
});
