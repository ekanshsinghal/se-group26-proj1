import React, { useState } from 'react';
import { Button, Card, Layout, Menu, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import EditDropDown from './EditDropDown';
import AddApplication from '../AddApplication/AddApplication';
import './LandingPage.scss';

const { Header, Content } = Layout;

const columns = ['Applied', 'In Consideration', 'Offer', 'Rejected'];
export default function LandingPage() {
	const [addApplicationOpen, setAddApplicationOpen] = useState(false);

	const toggleAddApplication = () => {
		setAddApplicationOpen(!addApplicationOpen);
	};

	return (
		<Layout className="LandingPage">
			<Header>
				<div className="logo" />
				<Menu
					theme="dark"
					mode="horizontal"
					items={['My Applications', 'Saved Jobs', 'Recommended'].map(
						(i) => ({
							key: i,
							label: i,
						})
					)}
				/>
				<div className="flex" />
				<Button type="primary" danger>
					Logout
				</Button>
			</Header>
			<Content className="Content">
				<div className="SubHeader">
					<div className="flex" />
					<Button
						type="primary"
						size="large"
						icon={<PlusOutlined />}
						onClick={toggleAddApplication}
					>
						Add Application
					</Button>
					<AddApplication
						isOpen={addApplicationOpen}
						onClose={toggleAddApplication}
					/>
				</div>

				<div className="MainContent">
					{columns.map((col) => (
						<div className="Status">
							<Typography.Title level={5}>{col}</Typography.Title>
							{new Array(2).fill(null).map((_, index) => (
								<Card
									title={`Job ${index}`}
									extra={<EditDropDown />}
									className="Job"
									bordered={false}
								>
									{col}
								</Card>
							))}
							<Card loading bordered={false} />
						</div>
					))}
				</div>
			</Content>
		</Layout>
	);
}
