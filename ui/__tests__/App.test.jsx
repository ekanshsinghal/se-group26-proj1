import React from 'react';
import { render, queryByAttribute } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';

import App from '../src/App';
import EditApplication from '../src/Components/AddApplication/EditApplication';

const getById = queryByAttribute.bind(null, 'id');
const getByClass = queryByAttribute.bind(null, 'class');
const getByTitle = queryByAttribute.bind(null, 'title');

const viewApplications = {
	applications: [
		{
			_id: '633e921b0b9d8a49ec012cd6',
			companyName: 'IBM',
			date: '2022-10-06T08:30:13.491Z',
			jobId: '567',
			jobTitle: 'Test Engineer',
			status: 'accepted',
			url: 'www.ibm.com',
		},
		{
			_id: '633e96b7122eee8718c6147d',
			companyName: 'Google',
			date: '2022-10-06T07:35:10.809Z',
			jobId: '123',
			jobTitle: 'SDE',
			status: 'rejected',
			url: 'www.google.co.in',
		},
		{
			_id: '633e9ce5a378a7e365e2d1f4',
			companyName: 'Apple inc',
			date: '2022-10-06T09:16:16.253Z',
			jobId: '12345',
			jobTitle: 'ASIC Engineer',
			status: 'inReview',
			url: 'www.apple.com',
		},
		{
			_id: '633e9d05a378a7e365e2d1f5',
			companyName: 'Netflix',
			date: '2022-10-06T09:16:48.119Z',
			jobId: '890',
			jobTitle: 'SDE2',
			status: 'applied',
			url: 'www.netflix.com',
		},
		{
			_id: '633f1fb073d88feae28078b9',
			companyName: 'Apple',
			date: '2022-10-31T18:34:20.660Z',
			jobId: '123',
			jobTitle: 'SDE 1',
			status: 'interview',
			url: 'www.apple.com',
		},
		{
			_id: '633f1fb073d88feae28008b9',
			companyName: 'Apple',
			date: '2022-10-31T18:34:20.660Z',
			jobId: '123',
			jobTitle: 'SDE 2',
			status: 'saved',
			url: 'www.apple.com',
		},
	],
	message: 'Applications found',
};

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

	// mock user events
	const user = userEvent.setup();

	// mock axios response
	jest.mock('axios');
	let data = { data: {} };
	axios.post = jest.fn(() => Promise.resolve(data));
	axios.get = jest.fn(() => Promise.resolve({ data: viewApplications }));

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

		await user.click(getById(baseElement, '567edit'));
		await user.click(getById(baseElement, 'delete'));
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
		axios.get = jest.fn(() => Promise.resolve({ data: { profile: {} } }));
		const { container } = render(
			<MemoryRouter
				initialEntries={[{ pathname: '/profile', state: { email: 'test@abc.com' } }]}
			>
				<App />
			</MemoryRouter>
		);
		await user.click(getById(container, 'save-profile'));
		await user.type(getById(container, 'firstName'), 'firstName');
		await user.type(getById(container, 'lastName'), 'lastName');
		await user.click(getById(container, 'save-profile'));
	});

	test('renders Profile Component with existing profile', async () => {
		axios.get = jest.fn(() =>
			Promise.resolve({ data: { profile: { email: 'test@abc.com' } } })
		);
		const { container } = render(
			<MemoryRouter
				initialEntries={[{ pathname: '/profile', state: { email: 'test@abc.com' } }]}
			>
				<App />
			</MemoryRouter>
		);
		await user.click(getById(container, 'delete-profile'));
		await user.click(getById(container, 'delete-profile'));
		await user.click(getById(container, 'modify-profile'));
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
