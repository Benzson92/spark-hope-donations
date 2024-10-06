import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect'; // For better assertions

import CharityCard from '../../components/CharityCard';
import { CharityDTO } from '../../models/charity.dto'; // Import the CharityDTO type

// Mock props
const charityMock: CharityDTO = {
  id: 1,
  name: 'Test Charity',
  image: 'charity.jpg',
  currency: 'USD',
};

const mockOnDonate = jest.fn(); // Mock the onDonate function

describe('CharityCard Component', () => {
  // Test 1: Rendering the component with the correct props
  test('renders CharityCard component with correct data', () => {
    render(<CharityCard charity={charityMock} onDonate={mockOnDonate} />);

    // Check if the charity name is rendered
    expect(screen.getByText('Test Charity')).toBeInTheDocument();

    // Check if the donate button is rendered
    expect(screen.getByText('Donate')).toBeInTheDocument();
  });

  // Test 2: Opening the donation modal when "Donate" button is clicked
  test('opens donation modal on Donate button click', () => {
    render(<CharityCard charity={charityMock} onDonate={mockOnDonate} />);

    // Click the Donate button
    fireEvent.click(screen.getByText('Donate'));

    // Check if the modal is open (you might check for a piece of text in the modal)
    expect(screen.getByText('Select the amount to donate (USD)')).toBeInTheDocument();
  });

  // // Test 3: Ensure donation amount changes correctly
  // test('updates donation amount correctly', () => {
  //   render(<CharityCard charity={charityMock} onDonate={mockOnDonate} />);

  //   // Click the Donate button to open the modal
  //   fireEvent.click(screen.getByText('Donate'));

  //   // Find the input or buttons for changing donation amount and simulate changes
  //   const amountInput = screen.getByLabelText('Donation Amount'); // Assuming input has a label

  //   // Simulate amount change
  //   fireEvent.change(amountInput, { target: { value: '50' } });

  //   // Expect the input value to be updated to 50
  //   expect(amountInput.value).toBe('50');
  // });

  // Test 4: Making a donation triggers the onDonate function with correct parameters
  test('calls onDonate with correct parameters on donation', () => {
    render(<CharityCard charity={charityMock} onDonate={mockOnDonate} />);

    // Click the Donate button to open the modal
    fireEvent.click(screen.getByText('Donate'));

    // Find and click the confirm donate button
    fireEvent.click(screen.getByText('Donate 10 USD'));

    // Expect the onDonate function to be called with correct amount and charity
    expect(mockOnDonate).toHaveBeenCalledWith(10, charityMock); // Assuming default amount is 10
  });
});
