import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormInput } from './FormInput';

describe('Form input', () => {
  it('should render input and label', () => {
    const mockProps = {
      name: 'test-input',
      label: 'Test Label',
      onChange: vi.fn(),
    };

    render(<FormInput {...mockProps} />);

    const input = screen.getByTestId('forminput-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'test-input');
    expect(input).toHaveAttribute('id', 'test-input');

    const label = screen.getByTestId('forminput-label');
    expect(label).toBeInTheDocument();
  });

  it('should display placeholder text when no value provided', () => {
    const mockProps = {
      name: 'test-input',
      label: 'Test Label',
      onChange: vi.fn(),
    };

    render(<FormInput {...mockProps} />);

    const input = screen.getByTestId('forminput-input');
    expect(input.value).toBe('');

    const label = screen.getByTestId('forminput-label');
    expect(label).toHaveClass('placeholder');
  });

  it('should display input value and activate label when value provided', () => {
    const mockProps = {
      name: 'test-input',
      label: 'Test Label',
      onChange: vi.fn(),
      value: 'initial value',
    };

    render(<FormInput {...mockProps} />);

    const input = screen.getByTestId('forminput-input');
    expect(input.value).toBe('initial value');

    const label = screen.getByTestId('forminput-label');
    expect(label).toHaveClass('placeholder active'); // Assuming styles.active defines active styling
  });

  it('should call onChange handler on input change', () => {
    const mockOnChange = vi.fn();
    const mockProps = {
      name: 'test-input',
      label: 'Test Label',
      onChange: mockOnChange,
    };

    render(<FormInput {...mockProps} />);

    const input = screen.getByTestId('forminput-input');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('new value');
  });
})
