import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LinkButton, SubmitButton, Button } from './linkButton';

describe('Button components', () => {
  it('should render LinkButton with primary variant and children', () => {
    render(<LinkButton testID='link-test' href="https://example.com" variant="primary" children="Click Me" />);

    const link = screen.getByTestId('link-test');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveClass('primary'); 
  });

  it('should render LinkButton with secondary variant and children', () => {
    render(<LinkButton testID='link-test' href="https://example.com" variant="secondary" children="Click Me" />);

    const link = screen.getByTestId('link-test');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveClass('secondary'); 
  });

  it('should render SubmitButton with primary variant and children', () => {
    render(<SubmitButton testID='test-submit' variant="primary" children="Submit" />);

    const button = screen.getByTestId('test-submit');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('primary'); 
    expect(button).toHaveClass('button'); 
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should render SubmitButton with secondary variant and children', () => {
    render(<SubmitButton testID='test-submit' variant="secondary" children="Submit" />);

    const button = screen.getByTestId('test-submit');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('secondary'); 
    expect(button).toHaveClass('button'); 
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should render Button with children', () => {
    render(<Button testID='test-button' children="Click Me" />);

    const button = screen.getByTestId('test-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('tertiary'); 
    expect(button).toHaveClass('button');
  });
});
