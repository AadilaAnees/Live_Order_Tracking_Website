import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressTimeline from './ProgressTimeline';
import '@testing-library/jest-dom';

describe('ProgressTimeline Component', () => {
  
  test('Renders all standard timeline steps correctly', () => {
    // Pass in statusStep: 2 (In Transit)
    render(<ProgressTimeline currentStep={2} />);
    
    // Verify every label renders on the screen
    expect(screen.getByText('Order Placed')).toBeInTheDocument();
    expect(screen.getByText('Dispatching')).toBeInTheDocument();
    expect(screen.getByText('In Transit')).toBeInTheDocument();
    expect(screen.getByText('Arriving')).toBeInTheDocument();
    expect(screen.getByText('Delivered')).toBeInTheDocument();
  });

  test('Handles exception state (-1) and renders failure icons', () => {
    // Pass in your custom Sad Path state
    const { container } = render(<ProgressTimeline currentStep={-1} />);
    
    // Ensure the component still renders its text without crashing
    expect(screen.getByText('Delivered')).toBeInTheDocument();
    
    // Verify that the Lucide React SVG icons (the X marks) render for the failed steps
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0); 
  });
});