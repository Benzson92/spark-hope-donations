import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';

import Chip from '../../components/Chip';

describe('Chip component', () => {
  const defaultProps = {
    label: '10 USD',
    selected: false,
    onClick: jest.fn(),
  };

  it('should render with the correct label', () => {
    render(<Chip {...defaultProps} />);

    const chipElement = screen.getByText('10 USD');
    expect(chipElement).toBeInTheDocument(); // Check if label renders correctly
  });

  it('should apply selected styles when selected is true', () => {
    render(<Chip {...defaultProps} selected={true} />);

    const chipElement = screen.getByText('10 USD');
    expect(chipElement).toHaveStyle('border: 2px solid #1a53f0'); // Check if selected styles are applied
    expect(chipElement).toHaveStyle('color: #1a53f0');
    expect(chipElement).toHaveStyle('font-weight: 600');
  });

  it('should apply unselected styles when selected is false', () => {
    render(<Chip {...defaultProps} selected={false} />);

    const chipElement = screen.getByText('10 USD');
    expect(chipElement).toHaveStyle('border: 2px solid #ccc'); // Check if unselected styles are applied
    expect(chipElement).toHaveStyle('color: #333');
    expect(chipElement).toHaveStyle('font-weight: 400');
  });

  it('should call onClick when chip is clicked', () => {
    render(<Chip {...defaultProps} />);

    const chipElement = screen.getByText('10 USD');
    fireEvent.click(chipElement); // Simulate click

    expect(defaultProps.onClick).toHaveBeenCalledTimes(1); // Ensure onClick is called once
  });
});
