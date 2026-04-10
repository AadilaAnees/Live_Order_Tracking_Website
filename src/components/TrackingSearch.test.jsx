import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest'; // NEW: Import vi from vitest
import TrackingSearch from './TrackingSearch';

describe('TrackingSearch Component', () => {
  // NEW: Changed jest.fn() to vi.fn()
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test('Test Case 1.1: Blocks empty tracking ID submission', () => {
    render(<TrackingSearch onSearch={mockOnSearch} />);
    
    // Find the submit button and click it without typing anything
    const submitButton = screen.getByRole('button', { name: /track order/i });
    fireEvent.click(submitButton);

    // Expect the specific error message to appear on the screen
    expect(screen.getByText('Please enter a tracking ID.')).toBeInTheDocument();
    
    // Ensure the API call was NOT made
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  test('Test Case 1.2: Blocks improperly formatted ID', () => {
    render(<TrackingSearch onSearch={mockOnSearch} />);
    
    // Find the input and the button
    const input = screen.getByPlaceholderText('e.g., SLX-123');
    const submitButton = screen.getByRole('button', { name: /track order/i });

    // Simulate a user typing "apple123"
    fireEvent.change(input, { target: { value: 'apple123' } });
    fireEvent.click(submitButton);

    // Expect the Regex validation to catch it
    expect(screen.getByText('Invalid format. Tracking ID must be like SLX-123.')).toBeInTheDocument();
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  test('Test Case 1.3: Allows valid tracking ID format', () => {
    render(<TrackingSearch onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('e.g., SLX-123');
    const submitButton = screen.getByRole('button', { name: /track order/i });

    // Simulate typing a perfect tracking ID
    fireEvent.change(input, { target: { value: 'SLX-123' } });
    fireEvent.click(submitButton);

    // Expect the API search function to be called with the exact ID
    expect(mockOnSearch).toHaveBeenCalledWith('SLX-123');
    
    // Ensure no error messages are displayed
    expect(screen.queryByText(/Please enter/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Invalid format/i)).not.toBeInTheDocument();
  });
});