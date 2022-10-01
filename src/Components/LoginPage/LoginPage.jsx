import { Button, Checkbox, Form, Input, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import './LoginPage.scss';

export default function LoginPage() {
	return (
		<div className="LoginPage">
			<div className="Box">
				<Form>
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
						name="remember"
						valuePropName="checked"
						wrapperCol={{ offset: 8, span: 16 }}
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" block>
							Log In
						</Button>
					</Form.Item>
				</Form>
				<Typography>
					Don&#39;t have a account?{' '}
					<Link to="/register">Click here</Link> to register.
				</Typography>
			</div>
		</div>
	);
}
