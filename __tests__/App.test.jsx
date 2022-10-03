import React from 'react';
import { render, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import App from '../src/App';

const getById = queryByAttribute.bind(null, 'id');

describe('App', () => {
	beforeAll(() => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addListener: jest.fn(), // Deprecated
				removeListener: jest.fn(), // Deprecated
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		});
	});

	const user = userEvent.setup();
	test('renders LoginPage Component', () => {
		render(<App />, { wrapper: BrowserRouter });
	});

	test('renders RegisterPage Component', async () => {
		const { container } = render(
			<MemoryRouter initialEntries={['/register']}>
				<App />
			</MemoryRouter>
		);
		await user.type(getById(container, 'password'), 'password123');
		await user.type(getById(container, 'confirmPassword'), 'password123');
	});

	test('renders LandingPage Component & Add Application', async () => {
		const registerRoute = '/home';
		const { container } = render(
			<MemoryRouter initialEntries={[registerRoute]}>
				<App />
			</MemoryRouter>
		);
		await user.click(getById(container, 'Add Application'));
		await user.click(getById(container, 'add-submit'));
	});
});
