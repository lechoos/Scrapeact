import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PhoneCell } from './phoneCell';

describe('PhoneCell Component', () => {
  it('should render phone cell with provided size and content', () => {
    const mockSize = 100;
    const phoneContent = '123 456 789';

    render(<PhoneCell size={mockSize} children={phoneContent} />);

    const phoneCell = screen.getByTestId('phone-cell');
    expect(phoneCell).toBeInTheDocument();
    expect(phoneCell).toHaveAttribute('width', `${mockSize}`); 
    expect(phoneCell).toHaveTextContent(phoneContent);
  });
});