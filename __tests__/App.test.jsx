import React from 'react';
import { render, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import App from '../src/App';
import EditApplication from '../src/Components/AddApplication/EditApplication';
import moment from 'moment';

const getById = queryByAttribute.bind(null, 'id');
const getByClass = queryByAttribute.bind(null, 'class');
const getByTitle = queryByAttribute.bind(null, 'title');

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
	test('renders LoginPage Component', async () => {
		const { container } = render(
			<MemoryRouter initialEntries={['/login']}>
				<App />
			</MemoryRouter>
		);
		await user.type(getById(container, 'email'), 'abc@abc.com');
		await user.type(getById(container, 'password'), 'password123');
		await user.click(getById(container, 'login-button'));
	});

	test('renders RegisterPage Component', async () => {
		const { container } = render(
			<MemoryRouter initialEntries={['/register']}>
				<App />
			</MemoryRouter>
		);
		await user.type(getById(container, 'firstName'), 'firstName');
		await user.type(getById(container, 'lastName'), 'lastName');
		await user.type(getById(container, 'email'), 'abc@abc.com');
		await user.type(getById(container, 'password'), 'password123');
		await user.type(getById(container, 'confirmPassword'), 'password123');
		await user.click(getById(container, 'register-button'));
	});

	test('renders LandingPage Component & Add Application', async () => {
		const { baseElement } = render(
			<MemoryRouter
				initialEntries={[{ pathname: '/home', state: { email: 'test@abc.com' } }]}
			>
				<App />
			</MemoryRouter>
		);
		await user.click(getById(baseElement, 'add-application'));
		await user.click(getById(baseElement, 'cancel'));
		await user.click(getById(baseElement, 'add-application'));
		await user.type(getById(baseElement, 'companyName'), 'companyName');
		await user.type(getById(baseElement, 'jobTitle'), 'jobTitle');
		await user.type(getById(baseElement, 'jobId'), 'jobId');
		await user.type(getById(baseElement, 'url'), 'www.google.com');

		const date = getByClass(baseElement, 'ant-picker');
		await user.click(date);
		await user.click(getByClass(baseElement, 'ant-picker-today-btn'));

		await user.click(getByClass(baseElement, 'ant-select-selector'));
		await user.click(getByTitle(baseElement, 'Applied'));

		await user.click(getById(baseElement, 'add-submit'));
	});

	test('renders Saved Jobs Component ', async () => {
		const { baseElement } = render(
			<MemoryRouter
				initialEntries={[{ pathname: '/interested', state: { email: 'test@abc.com' } }]}
			>
				<App />
			</MemoryRouter>
		);
		await user.click(getById(baseElement, 'add-application'));
		await user.type(getById(baseElement, 'companyName'), 'companyName');
		await user.type(getById(baseElement, 'jobTitle'), 'jobTitle');
		await user.type(getById(baseElement, 'jobId'), 'jobId');
		await user.type(getById(baseElement, 'url'), 'www.google.com');
		await user.click(getById(baseElement, 'add-submit'));
		await user.click(getById(baseElement, 'add-application'));
		await user.click(getById(baseElement, 'cancel'));
	});

	test('renders Recommended Jobs Component ', async () => {
		const { container } = render(
			<MemoryRouter
				initialEntries={[{ pathname: '/recommended', state: { email: 'test@abc.com' } }]}
			>
				<App />
			</MemoryRouter>
		);
		await user.click(getById(container, '/home'));
	});

	test('renders Profile Component ', async () => {
		const { container } = render(
			<MemoryRouter
				initialEntries={[{ pathname: '/profile', state: { email: 'test@abc.com' } }]}
			>
				<App />
			</MemoryRouter>
		);
		await user.type(getById(container, 'firstName'), 'firstName');
		await user.type(getById(container, 'lastName'), 'lastName');
		await user.click(getById(container, 'save-profile'));
	});

	test('Should logout if email not in state', async () => {
		render(
			<MemoryRouter initialEntries={[{ pathname: '/recommended' }]}>
				<App />
			</MemoryRouter>
		);
	});

	test('Should redirect to home if email set in state', async () => {
		render(
			<MemoryRouter
				initialEntries={[{ pathname: '/login', state: { email: 'test@abc.com' } }]}
			>
				<App />
			</MemoryRouter>
		);
	});

	test('render edit application component', async () => {
		const { baseElement } = render(
			<EditApplication
				application={{
					_id: '123',
					companyName: 'companyName',
					jobId: 'jobId',
					jobTitle: 'jobTitle',
					url: 'www.google.com',
					status: 'applied',
					date: moment(),
				}}
				onClose={jest.fn()}
				updateApplications={jest.fn()}
			/>
		);
		await user.click(getById(baseElement, 'save'));
	});

	test('render edit application component and delete', async () => {
		const { baseElement } = render(
			<EditApplication
				application={{
					_id: '123',
				}}
				onClose={jest.fn()}
				updateApplications={jest.fn()}
			/>
		);
		await user.click(getById(baseElement, 'delete'));
	});
});
