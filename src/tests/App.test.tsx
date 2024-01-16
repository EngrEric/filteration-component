import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers
import App from '../App';

const categories = [{ slug: "seo", title: "seo" }];
const sites = [
  {
    domains: ["google"],
    logoSmall2x: "url",
    slug: "google",
    title: "google"
  }
];
// Mock the sampleResponseData
jest.mock('../components/constants', () => ({
  ...jest.requireActual('../components/constants'),
  sampleResponseData: {
    data: {
      oneClickAutomations: {
        items: [
            {
                title: "Google 1",
                categories: categories,
                id: "1",
                priority: 10,
                shortDescription: "some short des",
                slug: "google",
                sites: sites
              },
              {
                title: "Monitor 1",
                categories: categories,
                id: "1",
                priority: 10,
                shortDescription: "some short des",
                slug: "monitor",
                sites: sites
              },
        ],
      },
    },
  },
}));

describe('App Component', () => {
  test('renders App component with initial data', () => {
    render(<App />);

    // Check if the component renders with the initial data
    expect(screen.getByText('Monitor 1')).toBeInTheDocument();
    expect(screen.getByText('Google 1')).toBeInTheDocument();
  });

  test('filters data when "See all" button is clicked', () => {
    render(<App />);

    // Click on the "See all" button
    fireEvent.click(screen.getByText('See all'));

    // Check if handleFilter is called with the correct arguments
    expect(screen.getByText('Google 1')).toBeInTheDocument();
    expect(screen.getByText('Monitor 1')).toBeInTheDocument();
  });
});
