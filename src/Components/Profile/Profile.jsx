import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, message, Skeleton, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import './Profile.scss';

export default function Profile() {
	const [form] = Form.useForm();
	const [loading, setloading] = useState(true);
	const [profileExists, setProfileExists] = useState(false);
	const { state } = useLocation();
	const [initialValues, setInitialValues] = useState();

	useEffect(() => {
		axios
			.get('/api/view_profile?email=' + state.email)
			.then(({ data }) => {
				if (Object.keys(data.profile).length === 0) {
					setInitialValues({ email: state.email });
					setProfileExists(false);
				} else {
					setInitialValues(data.profile);
					setProfileExists(true);
				}
			})
			.catch((err) => message.error(err.response?.data?.error))
			.finally(() => setloading(false));
	}, []);

	const saveProfile = (values) => {
		const loading = message.loading('Loading...', 0);
		axios
			.post('/api/create_profile', values)
			.then(() => message.success('Profile created.'))
			.catch((err) => message.error(err.response.data?.error))
			.finally(() => loading());
	};

	const modifyProfile = () => {
		form.validateFields()
			.then((values) =>
				axios
					.post('/api/modify_profile', { ...values, _id: initialValues._id })
					.then(() => message.success('Profile Updated.'))
					.catch(() => message.error('Failed to update the profile.'))
			)
			.catch((err) => console.log(err));
	};

	const deleteProfile = () => {
		axios
			.post('/api/clear_profile', { email: initialValues.email, _id: initialValues._id })
			.then(() => message.success('Profile Deleted.'))
			.catch(() => message.error('Failed to delete the profile.'));
	};

	return (
		<div className="Profile">
			<Typography.Title>Profile Page</Typography.Title>
			{loading ? (
				<Skeleton active />
			) : (
				<Form
					form={form}
					size="large"
					requiredMark={false}
					labelCol={{ span: 4 }}
					wrapperCol={{ span: 10 }}
					onFinish={saveProfile}
					initialValues={initialValues}
				>
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								required: true,
								message: 'Please input your email!',
							},
							{
								type: 'email',
								message: 'The input is not valid E-mail!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="First Name"
						name="firstName"
						rules={[
							{
								required: true,
								message: 'Please input your first name!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Last Name"
						name="lastName"
						rules={[
							{
								required: true,
								message: 'Please input your last name!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item label="Phone" name="phone">
						<Input />
					</Form.Item>
					<Form.Item label="City" name="city">
						<Input />
					</Form.Item>
					<Form.Item label="State" name="state">
						<Input />
					</Form.Item>
					{/* <Form.Item label="Resume" name="resume">
					<Upload>
						<Button icon={<UploadOutlined />}>Click to Upload</Button>
					</Upload>
				</Form.Item> */}
					<Form.Item label="GitHub" name="gitHub">
						<Input />
					</Form.Item>
					<Form.Item label="LinkedIn" name="linkedin">
						<Input />
					</Form.Item>
					<Form.Item label="About" name="about">
						<Input.TextArea />
					</Form.Item>

					<Typography.Title level={4}>Job Details</Typography.Title>
					<Form.Item label="Company Name" name="companyName">
						<Input />
					</Form.Item>
					<Form.Item label="Job Title" name="jobTitle">
						<Input />
					</Form.Item>
					<Form.Item label="City" name="jobCity">
						<Input />
					</Form.Item>
					<Form.Item label="State" name="jobState">
						<Input />
					</Form.Item>
					<Form.Item label="Job Start/End Date" name="jobDate">
						<DatePicker.RangePicker />
					</Form.Item>
					<Form.Item label="Description" name="description">
						<Input.TextArea />
					</Form.Item>

					<Typography.Title level={4}>Education</Typography.Title>
					<Form.Item label="Institution" name="institution">
						<Input />
					</Form.Item>
					<Form.Item label="Major" name="major">
						<Input />
					</Form.Item>
					<Form.Item label="Degree" name="degree">
						<Input />
					</Form.Item>
					<Form.Item label="City" name="universityCity">
						<Input />
					</Form.Item>
					<Form.Item label="State" name="universityState">
						<Input />
					</Form.Item>
					<Form.Item label="Start/End Date" name="universityDate">
						<DatePicker.RangePicker />
					</Form.Item>
					{profileExists ? (
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								width: '60%',
							}}
						>
							<Button
								type="primary"
								id="delete-profile"
								danger
								onClick={deleteProfile}
							>
								Delete Profile
							</Button>
							<Button type="primary" id="modify-profile" onClick={modifyProfile}>
								Update Profile
							</Button>
						</div>
					) : (
						<Form.Item wrapperCol={{ span: 4, offset: 4 }}>
							<Button type="primary" htmlType="submit" block id="save-profile">
								Save Profile
							</Button>
						</Form.Item>
					)}
				</Form>
			)}
		</div>
	);
}
