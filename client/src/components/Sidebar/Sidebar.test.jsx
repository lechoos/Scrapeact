import { describe, expect, it } from 'vitest';
import { render, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { store } from '../../state/store';

describe('Sidebar component', () => {
	const user = {
		nickname: 'JohnDoe',
		email: 'john@example.com',
	};

	it('renders sidebar with user information', () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<MemoryRouter>
					<Sidebar isOpen={true} user={user} />
				</MemoryRouter>
			</Provider>
		);

		expect(getByTestId('sidebar-container')).toBeInTheDocument();
		expect(getByTestId('sidebar-nickname')).toHaveTextContent(user.nickname);
		expect(getByTestId('sidebar-email')).toHaveTextContent(user.email);
	});

	it('logout button click triggers logout action', async () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<MemoryRouter>
					<Sidebar isOpen={true} user={user} />
				</MemoryRouter>
			</Provider>
		);

		fireEvent.click(getByTestId('sidebar-logout'));

		waitForElementToBeRemoved(() => screen.getByTestId('sidebar-container'));
	});
});
