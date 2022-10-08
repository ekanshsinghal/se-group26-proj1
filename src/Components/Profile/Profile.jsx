import React from 'react';
import { Button, DatePicker, Form, Input, Typography, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

import './Profile.scss';

export default function Profile() {
	const { state } = useLocation();
	const saveProfile = (values) => console.log(values);

	return (
		<div className="Profile">
			<Typography.Title>Profile Page</Typography.Title>
			<Form
				size="large"
				requiredMark={false}
				labelCol={{ span: 3 }}
				wrapperCol={{ span: 9 }}
				onFinish={saveProfile}
				initialValues={{ email: state.email }}
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
		</div>
	);
}
