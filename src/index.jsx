import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LoginPage from './Components/LoginPage/LoginPage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import LandingPage from './Components/LandingPage/LandingPage';

import './index.scss';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/register',
		element: <RegisterPage />,
	},
	{
		path: '/home',
		element: <LandingPage />,
	},
]);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<RouterProvider router={router} />);
