import { describe, expect, it } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { MapsForm } from './Form';

describe('MapsForm component', () => {
	it('renders correctly', () => {
		render(<MapsForm setData={() => {}} testID='maps-form' />);
		expect(screen.getByTestId('maps-form')).toBeInTheDocument();
	});

	it('displays error message when form is submitted with empty input', async () => {
		render(<MapsForm setData={() => {}} testID='maps-form' />);
		const submitButton = screen.getByTestId('main-submit');
		fireEvent.click(submitButton);

    if (screen.findByText('Musisz wprowadzić adres URL :)')) {
      expect(await screen.findByText('Musisz wprowadzić adres URL :)')).toBeInTheDocument();
    } else {
      expect(await screen.findByText('Sprawdzasz ile razy możesz kliknąć przycisk? ;)')).toBeInTheDocument();
    }

	});

  it('submits form with correct link', async () => {
    render(<MapsForm setData={() => {}} testID="maps-form" />);
    const submitButton = screen.getByTestId('main-submit');
    const input = screen.getByTestId('maps-form-input');

    fireEvent.change(input, { target: { value: 'https://www.google.com/maps/search/architekt/@52.984392,18.5952093,12z?authuser=0&hl=pl&entry=ttu' } });
    fireEvent.click(submitButton);

    expect(await screen.queryByText('Musisz wprowadzić adres URL :)')).not.toBeInTheDocument();
    expect(await screen.queryByText('Sprawdzasz ile razy możesz kliknąć przycisk? ;)')).not.toBeInTheDocument();
  });
});
