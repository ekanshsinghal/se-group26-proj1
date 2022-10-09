import React, { useEffect, useState } from 'react';
import { Button, Card, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import AddSavedJob from './AddSavedJob';
import './SavedJobs.scss';

export default function SavedJobs() {
	const [applications, setApplications] = useState([]);
	const [addApplicationOpen, setAddApplicationOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const { state } = useLocation();

	useEffect(() => {
		updateApplications();
	}, []);

	const toggleAddApplication = () => setAddApplicationOpen(!addApplicationOpen);

	const updateApplications = () => {
		axios
			.get('/api/view_applications?email=' + state.email)
			.then(({ data }) =>
				setApplications(data.applications.filter((app) => app.status == 'saved'))
			)
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};

	return (
		<div className="SavedJobs">
			<div className="SubHeader">
				<div className="flex" />
				<Button
					id="add-application"
					type="primary"
					size="large"
					icon={<PlusOutlined />}
					onClick={toggleAddApplication}
				>
					Add Application
				</Button>
				<AddSavedJob
					isOpen={addApplicationOpen}
					onClose={toggleAddApplication}
					updateApplications={updateApplications}
				/>
			</div>
			<div className="Jobs">
				{loading && (
					<>
						<Card loading />
						<Card loading />
					</>
				)}
				{applications.map((application) => (
					<Card className="Job" key={application._id} title={application.companyName}>
						ID: {application.jobId}
						<br />
						Title: {application.jobTitle}
						<br />
						{'URL: '}
						<a href={'//' + application.url} target={'_blank'}>
							{application.url}
						</a>
					</Card>
				))}
				{applications.length === 0 && <Typography.Text>No Saved Jobs</Typography.Text>}
			</div>
		</div>
	);
}
