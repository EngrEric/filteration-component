import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import Dropdown from '../Dropdown';

describe('Dropdown Component', () => {
  const mockOptions = ['Option1', 'Option2', 'Option3'];
  const mockTitle = 'Select Option';
  const mockOnSelect = jest.fn();

  test('renders Dropdown component with options', () => {
    render(
      <Dropdown options={mockOptions} title={mockTitle} onSelect={mockOnSelect} />
    );

    // Check if the button with the given title is present
    expect(screen.getByText(mockTitle)).toBeInTheDocument();

    // Click on the button to open the dropdown
    fireEvent.click(screen.getByText(mockTitle));

    // Check if the search input is present
    expect(screen.getByPlaceholderText('Search items')).toBeInTheDocument();

    // Check if each option is rendered
    mockOptions.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test('selects an option on button click', () => {
    render(
      <Dropdown options={mockOptions} title={mockTitle} onSelect={mockOnSelect} />
    );

    // Click on the button to open the dropdown
    fireEvent.click(screen.getByText(mockTitle));

    // Click on the first option
    fireEvent.click(screen.getByText(mockOptions[0]));

    // Check if onSelect callback is called with the selected option
    expect(mockOnSelect).toHaveBeenCalledWith(mockOptions[0]);
  });

  test('filters options based on search input', () => {
    render(
      <Dropdown options={mockOptions} title={mockTitle} onSelect={mockOnSelect} />
    );

    // Click on the button to open the dropdown
    fireEvent.click(screen.getByText(mockTitle));

    // Type in the search input
    fireEvent.change(screen.getByPlaceholderText('Search items'), {
      target: { value: 'Option1' },
    });

    // Check if only the filtered option is rendered
    expect(screen.getByText('Option1')).toBeInTheDocument();
    expect(screen.queryByText('Option2')).toBeNull();
    expect(screen.queryByText('Option3')).toBeNull();
  });

});
