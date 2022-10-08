import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';

import './LoginPage.scss';

export default function LoginPage() {
	const navigate = useNavigate();

	const onFinish = (values) => {
		const loading = message.loading('Loading...', 0);
		axios
			.post('/api/login', values)
			.then(() => {
				navigate('/home', { state: { email: values.email } });
			})
			.catch((err) => {
				message.error(err.response.data?.error);
			})
			.finally(() => loading());
	};

	return (
		<div className="LoginPage">
			<Card bordered={false} title="Login">
				<Form
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
					size="large"
				>
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: 'Please input your email!',
							},
						]}
					>
						<Input
							prefix={<UserOutlined className="LoginIcons" />}
							placeholder="Email"
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input.Password
							prefix={<LockOutlined className="LoginIcons" />}
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{ offset: 8, span: 16 }}
					>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" block id="login-button">
							Log In
						</Button>
					</Form.Item>
				</Form>
				Don&#39;t have a account? <Link to="/register">Click here</Link> to register.
			</Card>
		</div>
	);
}
