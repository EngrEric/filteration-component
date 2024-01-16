import { render, screen, fireEvent } from '@testing-library/react';
import { FilterContext } from '../../../RootContext';
import FilterList from '../FilterList';

// Mock the FilterContext values
const filterContextValue = {
  removeAllFilter: false,
  handleFilter: jest.fn(),
  data: []
};

// Mock the lodash debounce function
jest.mock('lodash.debounce', () => (fn: any) => fn);

describe('FilterList Component', () => {
  beforeEach(() => {
    // Reset mock function calls before each test
    filterContextValue.handleFilter.mockClear();
  });

  test('renders FilterList component', () => {
    render(
      <FilterContext.Provider value={filterContextValue}>
        <FilterList />
      </FilterContext.Provider>
    );

    expect(screen.getByText('Extract Data')).toBeInTheDocument();
    expect(screen.getByText('Monitoring')).toBeInTheDocument();
    expect(screen.getByText('Filter by Site')).toBeInTheDocument();
    expect(screen.getByText('Filter by Category')).toBeInTheDocument();
  });

  test('handles filter selection and removal', () => {
    render(
      <FilterContext.Provider value={filterContextValue}>
        <FilterList />
      </FilterContext.Provider>
    );

    // Simulate adding and removing filters
    fireEvent.click(screen.getByText('Extract Data'));
    fireEvent.click(screen.getByText('Monitoring'));
    fireEvent.click(screen.getByText('Monitoring')); // Remove filter
    fireEvent.click(screen.getByText('Filter by Category')); // Open Category dropdown
    fireEvent.click(screen.getByText('SEO')); // Select one item
    fireEvent.click(screen.getByText('Filter by Site')); // Open sites dropdown
    fireEvent.click(screen.getByText('Amazon')); // Select one item
    fireEvent.click(screen.getByText('Amazon')); // Remove Amazon from filter

    expect(filterContextValue.handleFilter).toHaveBeenCalledWith(
      ['Extract'],
      'others'
    );
    expect(filterContextValue.handleFilter).toHaveBeenCalledWith(
      ["Extract", 'Monitor'],
      'others'
    );
    expect(filterContextValue.handleFilter).toHaveBeenCalledWith(
      ["Extract"],
      'others'
    );
    expect(filterContextValue.handleFilter).toHaveBeenCalledWith(
      ["Extract", "SEO"],
      'categories'
    );
    expect(filterContextValue.handleFilter).toHaveBeenCalledWith(
      ["Extract", "SEO", "Amazon"],
      'sites'
    );
    expect(filterContextValue.handleFilter).toHaveBeenCalledWith(
      ["Extract", "SEO"],
      'sites'
    );
  });

  test('handles removeAllFilter', () => {
    // Set removeAllFilter to true in the context
    const removeAllFilterContextValue = {
      ...filterContextValue,
      removeAllFilter: true,
    };

    render(
      <FilterContext.Provider value={removeAllFilterContextValue}>
        <FilterList />
      </FilterContext.Provider>
    );

    expect(filterContextValue.handleFilter).toHaveBeenCalledWith(
      [], // Expected selected filters after removeAllFilter
      'all'
    );
  });
});
