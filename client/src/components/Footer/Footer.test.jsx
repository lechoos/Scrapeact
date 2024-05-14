import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
	it('renders copyright text with current year', () => {
		const { getByText } = render(<Footer />);

		const expectedYear = new Date().getFullYear();
		const copyrightText = getByText(`© ${expectedYear} Wszelkie prawa zastrzeżone`);

		expect(copyrightText).toBeInTheDocument();
	});

	it('should render author link', () => {
    const { getByRole } = render(<Footer />);
    const authorLink = getByRole('link', { name: /Piotr Lechowicz/i });
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', 'https://lotusite.pl');
  });

  it('should have data-testid for author paragraph', () => {
    const { getByTestId } = render(<Footer />);
    const authorParagraph = getByTestId('footer-author');
    expect(authorParagraph).toBeInTheDocument();
  });

  it('uses correct CSS classes', () => {
    const { getByText, getByRole } = render(<Footer />);

    const footer = getByText(/Wszelkie prawa zastrzeżone/i);
    expect(footer).toHaveClass('footer__text');

    const copyrightText = getByText(/©/i);
    expect(copyrightText).toHaveClass('footer__text');

    const link = getByRole('link', { name: /Piotr Lechowicz/i });
    expect(link).toHaveClass('trademark__link');

    const trademarkText = getByText('Created by');
    expect(trademarkText.parentElement).toHaveClass('footer');
  });
});
