import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';

import LoginPage from './Components/LoginPage/LoginPage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import LandingPage from './Components/LandingPage/LandingPage';
import SavedJobs from './Components/SavedJobs/SavedJobs';
import Profile from './Components/Profile/Profile';
import './App.scss';
import ManageFiles from './Components/ManageFiles/ManageFiles';
import QA from './Components/QA/QA';
import config from './config';

const { Header, Content } = Layout;

const signedInPages = {
	'/home': 'My Applications',
	'/interested': 'Saved Jobs',
	'/files': 'Manage Files',
	'/qa': 'Q & A'
};

export default function App() {
	const { state, pathname } = useLocation();
	const [selectedMenu, setSelectedMenu] = useState(pathname);
	const navigate = useNavigate();

	useEffect(() => {
		if ((!state || !state.email) && !['/login', '/register'].includes(pathname)) {
			navigate('/login');
		} else if (state && state.email && ['/login', '/register'].includes(pathname)) {
			navigate('/home', { state });
		}
		setSelectedMenu(pathname);
	}, [state, pathname]);

	const browsePage = ({ key }) => {
		navigate(key, { state });
		setSelectedMenu(key);
	};

	const logout = () => {
		axios.post(`${config.base_url}logout`, { email: state.email });
		navigate('/login', { state: { email: undefined } });
	};

	if (state && state.email) {
		return (
			<Layout className="App">
				<Header>
					<div className="logo" />
					<div style={{ minWidth: 400 }}>
						<Menu
							theme="dark"
							mode="horizontal"
							items={Object.keys(signedInPages).map((i) => ({
								key: i,
								label: signedInPages[i],
								id: i,
							}))}
							selectedKeys={[selectedMenu]}
							onSelect={browsePage}
						/>
					</div>
					<div className="flex" />

					<Dropdown
						placement="bottomRight"
						overlay={
							<Menu
								mode="vertical"
								style={{ width: 200 }}
								items={[
									{
										key: 'profile',
										label: (
											<Button type='link' onClick={() => navigate('/profile', { state })}>
												My Profile
											</Button>
										),
									},
									{
										key: 'logout',
										label: (
											<Button type="primary" danger onClick={logout} block>
												Logout
											</Button>
										),
									},
								]}
							/>
						}
					>
						<Avatar icon={<UserOutlined />} style={{ margin: '1rem' }} />
					</Dropdown>
				</Header>
				<Content className="Content">
					<Routes>
						<Route path="/home" element={<LandingPage />} />
						<Route path="/interested" element={<SavedJobs />} />
						<Route path="/files" element={<ManageFiles />} />
						<Route path="/qa" element={<QA />} />						
						<Route path="/profile" element={<Profile />} />
						<Route path="*" element={<Navigate to="/home" replace />} />
					</Routes>
				</Content>
			</Layout>
		);
	}

	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
			<Route path="*" element={<Navigate to="/login" replace />} />
		</Routes>
	);
}
