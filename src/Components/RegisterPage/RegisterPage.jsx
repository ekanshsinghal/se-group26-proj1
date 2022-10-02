import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import './RegisterPage.scss';

export default function RegisterPage() {
	const onFinish = (values) => {
		console.log(values);
	};

	return (
		<div className="RegisterPage">
			<div className="Box">
				<Form
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item
						label="First Name"
						name="fname"
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
						name="lname"
						rules={[
							{
								required: true,
								message: 'Please input your last name!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: 'Please input your email address!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						label="Confirm Password"
						name="confirmPassword"
						rules={[
							{
								required: true,
								message: 'Please input your confirm password!',
							},
						]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item wrapperCol={{ span: 24 }}>
						<Button type="primary" htmlType="submit" block>
							Log In
						</Button>
					</Form.Item>
				</Form>
				<Typography>
					Already have an account? <Link to="/login">Click here</Link>{' '}
					to login.
				</Typography>
			</div>
		</div>
	);
}
