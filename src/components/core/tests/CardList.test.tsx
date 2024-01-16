import { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import CardList from '../CardList';
import { FilterContext } from '../../../RootContext';
import { ResponseDataObject } from '../../constants';

// Mocking the useContext hook for FilterContext
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn(),
}));

describe('CardList Component', () => {
  // Mock data for testing
  const mockData = [
    { title: 'Card 1', shortDescription: 'Description 1', sites: [{ logoSmall2x: 'url1' }] },
    { title: 'Card 2', shortDescription: 'Description 2', sites: [{ logoSmall2x: 'url2' }] },
    // Add more data as needed
  ] as ResponseDataObject[];

  beforeEach(() => {
    // Mock the useContext hook to return the desired data
    // @ts-ignore
    useContext.mockReturnValue({ data: mockData });
  });

  test('renders CardList component with cards', () => {
    render(
      <FilterContext.Provider value={{ data: mockData }}>
        <CardList />
      </FilterContext.Provider>
    );

    // Check if the FilterList component is rendered
    expect(screen.getByTestId('filter-list')).toBeInTheDocument();

    // Check if the Card components are rendered with the correct data
    expect(screen.getByText('Card 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByAltText('Card 1')).toHaveAttribute('src', 'url1');

    expect(screen.getByText('Card 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByAltText('Card 2')).toHaveAttribute('src', 'url2');
  });
});
