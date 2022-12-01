import React, { useEffect, useState } from 'react';
import { Button, Card, Typography } from 'antd';
import { PlusOutlined, EditFilled } from '@ant-design/icons';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import AddSavedJob from './AddSavedJob';
import EditSavedJob from './EditSavedJob';
import EditApplication from '../AddApplication/EditApplication';
import './SavedJobs.scss';

export default function SavedJobs() {
	const [applications, setApplications] = useState([]);
	const [addApplicationOpen, setAddApplicationOpen] = useState(false);
	const [shiftApplicationOpen, setShiftApplicationOpen] = useState(false);
	const [editApplication, setEditApplication] = useState(false);
	const [loading, setLoading] = useState(true);
	const { state } = useLocation();

	useEffect(() => {
		updateApplications();
	}, []);

	const toggleAddApplication = () => setAddApplicationOpen(!addApplicationOpen);

	const updateApplications = () => {
		axios
			.get(`${config.base_url}/view_applications?email=` + state.email)
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
				{editApplication && (
					<EditSavedJob
						onClose={() => setEditApplication(false)}
						updateApplications={updateApplications}
						application={editApplication}
						email={state.email}
					/>)}
				{shiftApplicationOpen &&
					(
						<EditApplication
							application={shiftApplicationOpen}
							onClose={() => setShiftApplicationOpen(false)}
							updateApplications={updateApplications}
							email={state.email}
						/>)}
			</div>
			<div className="Jobs">
				{loading && (
					<>
						<Card loading />
						<Card loading />
					</>
				)}
				{applications.map((application) => (
					<Card className="Job" key={application._id} title={application.companyName} extra={
						<Button
							type="text"
							icon={<EditFilled />}
							onClick={() => setEditApplication(application)}
							id={application.jobId + 'edit'}
						/>
					}>

						ID: {application.jobId}
						<br />
						Title: {application.jobTitle}
						<br />
						{'URL: '}
						<a href={'//' + application.url} target={'_blank'}>
							{application.url}
						</a>
						<Button id={application.jobId + 'edit'} key="apply" onClick={() => setShiftApplicationOpen(application)}>
							Applied?
						</Button>

					</Card>
				))}
				{applications.length === 0 && <Typography.Text>No Saved Jobs</Typography.Text>}
			</div>
		</div>
	);
}
