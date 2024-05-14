import { render, screen } from '@testing-library/react';
import { LinkCell } from './linkCell';
import { describe, expect, it } from 'vitest';

describe('LinkCell Component', () => {
  it('should render link cell with provided link and size', () => {
    const mockLink = 'https://example.com';
    const mockSize = 100;

    render(<LinkCell link={mockLink} size={mockSize} />);

    const linkCell = screen.getByTestId('link-cell');
    expect(linkCell).toBeInTheDocument();
    expect(linkCell).toHaveAttribute('width', `${mockSize}`); 

    const link = screen.getByTestId('link-cell-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockLink);
  });
});