import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  it('renders the footer with the correct current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const footerText = screen.getByText(new RegExp(`original © ${currentYear}`, 'i'));

    expect(footerText).toBeInTheDocument();
  });
});
