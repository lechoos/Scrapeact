import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SaveCell } from './SaveCell';

describe('Save Cell', () => {
  it('renders "Tak" text when checked is true', () => {
    const { getByText } = render(<SaveCell checked={true} size={100} click={() => {}} />);
    expect(getByText('Tak')).toBeInTheDocument();
  });

  it('renders "Nie" text when checked is false', () => {
    const { getByText } = render(<SaveCell checked={false} size={100} click={() => {}} />);
    expect(getByText('Nie')).toBeInTheDocument();
  });

  it('calls the click prop handler when clicked', () => {
    const mockClickHandler = vi.fn();
    const { getByTestId } = render(<SaveCell checked={true} size={100} click={mockClickHandler} />);

    const cell = getByTestId('save-cell');
    fireEvent.click(cell);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });

  it('applies correct styles when checked is true', () => {
    const { getByTestId } = render(<SaveCell checked={true} size={100} click={() => {}} />);
    const cell = getByTestId('save-cell');

    expect(cell).toHaveClass('save-cell__container');
    expect(cell.querySelector('span')).toHaveClass('save-cell');
    expect(cell.querySelector('span')).toHaveClass('save-cell--true');
  });

  it('applies correct styles when checked is false', () => {
    const { getByTestId } = render(<SaveCell checked={false} size={100} click={() => {}} />);
    const cell = getByTestId('save-cell');

    expect(cell).toHaveClass('save-cell__container');
    expect(cell.querySelector('span')).toHaveClass('save-cell');
    expect(cell.querySelector('span')).toHaveClass('save-cell--false');
  });
})
