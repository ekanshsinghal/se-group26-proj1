/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function AddSavedJob({ isOpen, onClose, updateApplications }) {
	const [form] = Form.useForm();
	const { state } = useLocation();

	const closeForm = () => {
		form.resetFields();
		onClose();
	};

	const onOk = (values) => {
		axios
			.post('/api/add_application', { ...values, status: 'saved', email: state.email })
			.then(({ data }) => {
				message.success(data.message);
				updateApplications();
				closeForm();
			})
			.catch((err) => message.error(err.response.data?.error));
	};

	return (
		<Modal
			title="Add Application"
			open={isOpen}
			onCancel={closeForm}
			width={700}
			centered
			footer={[
				<Button onClick={closeForm} key="cancel" id="cancel">
					Cancel
				</Button>,
				<Button type="primary" onClick={() => form.submit()} id="add-submit" key="ok">
					Add
				</Button>,
			]}
		>
			<Form form={form} layout="vertical" requiredMark={false} onFinish={onOk}>
				<Form.Item
					label="Company Name"
					name="companyName"
					rules={[
						{
							required: true,
							message: 'Please enter Company Name!',
						},
					]}
				>
					<Input placeholder="Enter Company Name" />
				</Form.Item>
				<Form.Item
					label="Job Title"
					name="jobTitle"
					rules={[
						{
							required: true,
							message: 'Please enter Job Title!',
						},
					]}
				>
					<Input placeholder="Enter Job Title" />
				</Form.Item>
				<Form.Item
					label="Job Id"
					name="jobId"
					rules={[
						{
							required: true,
							message: 'Please enter Job Id!',
						},
					]}
				>
					<Input placeholder="Enter Job Id" />
				</Form.Item>
				<Form.Item
					label="URL / Application Link"
					name="url"
					rules={[
						{
							required: true,
							message: 'Please enter URL / Application Link!',
						},
						{
							type: 'url',
							warningOnly: true,
						},
					]}
				>
					<Input placeholder="Enter URL / Application Link" />
				</Form.Item>
			</Form>
		</Modal>
	);
}
