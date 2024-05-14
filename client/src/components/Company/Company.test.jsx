import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import { Company } from './Company';

describe('Company component', () => {
	it('renders company with correct initial data', () => {
		const testCompany = {
			name: 'Test Company',
			phone: '123456789',
			link: 'http://example.com',
		};
		const testSetGlobalData = vi.fn();

		render(
			<Provider store={store}>
				<Company company={testCompany} setGlobalData={testSetGlobalData} />
			</Provider>
		);

		const companyNameInput = screen.getByDisplayValue(testCompany.name);
		const companyPhoneInput = screen.getByDisplayValue(testCompany.phone);
		const companyLink = screen.getByText('Link');
		const deleteButton = screen.getByTestId('company-delete-button');
		const saveButton = screen.queryByRole('button', { name: 'Zapisz' });

		expect(companyNameInput).toBeInTheDocument();
		expect(companyPhoneInput).toBeInTheDocument();
		expect(companyLink).toHaveAttribute('href', testCompany.link);
		expect(deleteButton).toBeInTheDocument();
		expect(saveButton).not.toBeInTheDocument();
	});

	it('calls handleClick when delete button is clicked', async () => {
		const testCompany = {
			name: 'Test Company',
			phone: '123456789',
			link: 'http://example.com',
		};
		const testSetGlobalData = vi.fn();

		render(
			<Provider store={store}>
				<Company company={testCompany} setGlobalData={testSetGlobalData} />
			</Provider>
		);

		const deleteButton = screen.getByTestId('company-delete-button');
		fireEvent.click(deleteButton);

    waitForElementToBeRemoved(() => screen.getByTestId('profile-company'));
	});
});
