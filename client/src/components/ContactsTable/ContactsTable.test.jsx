import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import { ContactsTable } from './ContactsTable';

describe('ContactsTable component', () => {
	it('renders correctly with valid data', () => {
		const data = [
			{
				uuid: '1',
				name: 'Lotusite',
				link: 'https://google.com/maps',
				phone: '000 000 000',
			},
		];

		render(
			<Provider store={store}>
				<ContactsTable data={data} />
			</Provider>
		);

		expect(screen.getByTestId('table-container')).toBeInTheDocument();

		expect(screen.getByText('Nazwa firmy')).toBeInTheDocument();
		expect(screen.getByText('Profil w Google Maps')).toBeInTheDocument();
		expect(screen.getByText('Telefon')).toBeInTheDocument();
		expect(screen.getByText('Zapisz (zaznacz wszystko)')).toBeInTheDocument();

		expect(screen.getByText('Lotusite')).toBeInTheDocument();
		expect(screen.getByText('Link')).toBeInTheDocument();
		expect(screen.getByText('000 000 000')).toBeInTheDocument();
	});

	it('calls onSave function when save button is clicked after selecting rows', () => {
		const data = [
			{
				uuid: '1',
				name: 'Nazwa Firmy',
				link: 'https://google.com/maps',
				phone: '000 000 000',
			},
		];
		render(
			<Provider store={store}>
				<ContactsTable data={data} />
			</Provider>
		);

		fireEvent.click(screen.getByTestId('save-cell'));

		fireEvent.click(screen.getByText('Zapisz'));

		expect(screen.queryByTestId('error-message')?.not.toBeInTheDocument());
	});
});
