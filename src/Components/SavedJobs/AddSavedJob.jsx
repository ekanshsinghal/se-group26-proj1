/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import axios from 'axios';

export default function AddSavedJob({ isOpen, onClose, updateApplications }) {
	const [form] = Form.useForm();

	const closeForm = () => {
		form.resetFields();
		onClose();
	};

	const onOk = () => {
		form.validateFields()
			.then((values) => {
				axios
					.post('/api/add_application', { ...values, status: 'saved' })
					.then(({ data }) => {
						message.success(data.message);
						updateApplications();
						closeForm();
					})
					.catch((err) => message.error(err.response.data.error));
			})
			.catch((err) => message.error(err));
	};

	return (
		<Modal
			title="Add Application"
			open={isOpen}
			onOk={onOk}
			onCancel={closeForm}
			width={700}
			centered
			footer={[
				<Button onClick={closeForm} key="cancel">
					Cancel
				</Button>,
				<Button type="primary" onClick={onOk} id="add-submit" key="ok">
					Add
				</Button>,
			]}
		>
			<Form form={form} layout="vertical" requiredMark={false}>
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
