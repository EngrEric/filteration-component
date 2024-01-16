import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import Button from '../Button';

describe('Button Component', () => {
  const mockOnClick = jest.fn();

  test('renders Button component with text', () => {
    render(<Button text="Click Me" onClick={mockOnClick} />);

    // Check if the button with the given text is present
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick when button is clicked', () => {
    render(<Button text="Click Me" onClick={mockOnClick} />);

    // Click on the button
    fireEvent.click(screen.getByText('Click Me'));

    // Check if onClick callback is called
    expect(mockOnClick).toHaveBeenCalled();
  });

  test('toggles isActive state and updates button class on click', () => {
    render(<Button text="Toggle Me" onClick={mockOnClick} />);

    // Check if the button initially has the default class
    expect(screen.getByTestId('toggle-btn')).toHaveClass('btn');

    // Click on the button to toggle isActive state
    fireEvent.click(screen.getByTestId('toggle-btn'));

    // Check if onClick callback is called
    expect(mockOnClick).toHaveBeenCalled();

    // Check if the button now has the updated class
    expect(screen.getByTestId('toggle-btn')).toHaveClass(
      'bg-purple-300 border-purple-600 text-purple-700'
    );
  });

});
