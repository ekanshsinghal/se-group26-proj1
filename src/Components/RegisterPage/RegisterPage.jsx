import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import './RegisterPage.scss';

export default function RegisterPage() {
	return (
		<div className="RegisterPage">
			<div className="Box">
				<Form>
					<Form.Item
						label="Full Name"
						name="name"
						rules={[
							{
								required: true,
								message: 'Please input your full name!',
							},
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Username"
						name="username"
						rules={[
							{
								required: true,
								message: 'Please input your username!',
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
					<Form.Item>
						<Button type="primary" htmlType="submit" block>
							Log In
						</Button>
					</Form.Item>
				</Form>
				<Typography>
					Already have a account? <Link to="/login">Click here</Link>{' '}
					to login.
				</Typography>
			</div>
		</div>
	);
}
