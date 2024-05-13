import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Error } from './Error';

describe('Error message', () => {
  it('renders default error state', () => {
    const message = 'Coś poszło nie tak...'

    render(<Error message={message} />);
    expect(screen.getByTestId('error-message')).toHaveTextContent('Coś poszło nie tak...');
  })
});