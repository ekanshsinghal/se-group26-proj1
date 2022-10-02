import React, { useState } from 'react';
import { Button, Card, Layout, Menu, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import EditDropDown from './EditDropDown';
import AddApplication from '../AddApplication/AddApplication';
import './LandingPage.scss';

const { Header, Content } = Layout;

const columns = ['Applied', 'In Consideration', 'Offer'];
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
				<table>
					<thead>
						<tr>
							{columns.map((col) => (
								<td key={col}>
									<Typography.Title level={5}>
										{col}
									</Typography.Title>
								</td>
							))}
						</tr>
					</thead>
					<tbody>
						{new Array(3).fill(null).map((_, index) => (
							<tr key={String(index + 1)}>
								<td>
									<Card
										title={`Job ${index}`}
										extra={<EditDropDown />}
									>
										{columns[0]}
									</Card>
								</td>
								<td>
									<Card
										title={`Job ${index}`}
										extra={<EditDropDown />}
									>
										{columns[1]}
									</Card>
								</td>
								<td>
									<Card
										title={`Job ${index}`}
										extra={<EditDropDown />}
									>
										{columns[2]}
									</Card>
								</td>
							</tr>
						))}
						<tr>
							<td>
								<Card loading />
							</td>
							<td>
								<Card loading />
							</td>
							<td>
								<Card loading />
							</td>
						</tr>
					</tbody>
				</table>
			</Content>
		</Layout>
	);
}
