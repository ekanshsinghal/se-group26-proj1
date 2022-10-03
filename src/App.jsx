import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from './Components/LoginPage/LoginPage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import LandingPage from './Components/LandingPage/LandingPage';

export default function App() {
	return (
		<div>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/home" element={<LandingPage />} />
				<Route path="*" element={<Navigate to="/login" replace />} />
			</Routes>
		</div>
	);
}
