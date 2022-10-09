import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, message, Skeleton, Typography } from 'antd';
import { useLocation } from 'react-router-dom';

import './Profile.scss';
import axios from 'axios';

export default function Profile() {
	const [loading, setloading] = useState(true);
	const { state } = useLocation();
	const [initialValues, setInitialValues] = useState({ email: state.email });

	useEffect(() => {
		axios
			.get('/api/view_profile?email=' + state.email)
			.then(({ data }) => setInitialValues({ ...initialValues, ...data }))
			.catch((err) => message.error(err.response.data?.error))
			.finally(() => setloading(false));
	}, []);

	const saveProfile = (values) => {
		const loading = message.loading('Loading...', 0);
		axios
			.post('/api/modify_profile', values)
			.then(({ data }) => console.log(data))
			.catch((err) => message.error(err.response.data?.error))
			.finally(() => loading());
	};

	return (
		<div className="Profile">
			<Typography.Title>Profile Page</Typography.Title>
			{loading ? (
				<Skeleton active />
			) : (
				<Form
					size="large"
					requiredMark={false}
					labelCol={{ span: 3 }}
					wrapperCol={{ span: 9 }}
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
					<Form.Item wrapperCol={{ span: 4, offset: 4 }}>
						<Button type="primary" htmlType="submit" block id="save-profile">
							Save
						</Button>
					</Form.Item>
				</Form>
			)}
		</div>
	);
}
