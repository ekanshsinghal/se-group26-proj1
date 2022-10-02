import { Button, Checkbox, Form, Input, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import './LoginPage.scss';

export default function LoginPage() {
	const onFinish = (values) => console.log(values);

	return (
		<div className="LoginPage">
			<div className="Box">
				<Form
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off"
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: 'Please input your email!',
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
					<Form.Item wrapperCol={{ span: 24 }}>
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
