import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import CharityCard from '../../components/CharityCard';
import { CharityDTO } from '../../models/charity.dto';

const charityMock: CharityDTO = {
  id: 1,
  name: 'Test Charity',
  image: 'charity.jpg',
  currency: 'USD',
};

const mockOnDonate = jest.fn();

describe('CharityCard Component', () => {
  test('renders CharityCard component with correct data', () => {
    render(<CharityCard charity={charityMock} onDonate={mockOnDonate} />);

    expect(screen.getByText('Test Charity')).toBeInTheDocument();
    expect(screen.getByText('Donate')).toBeInTheDocument();
  });

  test('opens donation modal on Donate button click', () => {
    render(<CharityCard charity={charityMock} onDonate={mockOnDonate} />);

    fireEvent.click(screen.getByText('Donate'));

    expect(screen.getByText('Select the amount to donate (USD)')).toBeInTheDocument();
  });

  test('updates donation amount correctly', () => {
    render(<CharityCard charity={charityMock} onDonate={mockOnDonate} />);

    fireEvent.click(screen.getByText('Donate'));
    fireEvent.click(screen.getByText('50 USD'));

    const donateButton = screen.getByText('Donate 50 USD');
    expect(donateButton).toBeInTheDocument();
  });

  test('calls onDonate with correct parameters on donation', () => {
    render(<CharityCard charity={charityMock} onDonate={mockOnDonate} />);

    fireEvent.click(screen.getByText('Donate'));

    fireEvent.click(screen.getByText('Donate 10 USD'));

    expect(mockOnDonate).toHaveBeenCalledWith(10, charityMock);
  });
});
