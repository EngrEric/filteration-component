import { render, screen } from '@testing-library/react';
// import { describe, it, expect } from 'vitest';
import Card from '../Card';

describe('Card', () => {
  const mockProps = {
    logoUrl: 'https://example.com/logo.png',
    title: 'Test Title',
    subTitle: 'Test SubTitle',
  };

  it('renders correctly', () => {
    render(<Card {...mockProps} />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', mockProps.logoUrl);
    expect(imgElement).toHaveAttribute('alt', mockProps.title);

    const titleElement = screen.getByText(mockProps.title);
    expect(titleElement).toBeInTheDocument();

    const subTitleElement = screen.getByText(mockProps.subTitle);
    expect(subTitleElement).toBeInTheDocument();
  });
});
