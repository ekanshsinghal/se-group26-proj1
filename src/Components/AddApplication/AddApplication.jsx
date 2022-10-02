/* eslint-disable react/prop-types */
import React from 'react';
import { DatePicker, Form, Input, Modal, Select } from 'antd';

export default function AddApplication({ isOpen, onClose }) {
	const [form] = Form.useForm();

	const onOk = () => {
		form.validateFields()
			.then((values) => {
				console.log(values);
				onClose();
				form.resetFields();
			})
			.catch(({ errorFields }) => console.log(errorFields));
	};

	return (
		<Modal
			title="Add Application"
			open={isOpen}
			onOk={onOk}
			okText="Add"
			onCancel={onClose}
			width={700}
			centered
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
					]}
				>
					<Input placeholder="Enter URL / Application Link" />
				</Form.Item>
				<Form.Item
					label="Applied Date"
					name="date"
					rules={[
						{
							required: true,
							message: 'Please enter Applied Date!',
						},
					]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item
					label="Status"
					name="status"
					rules={[
						{
							required: true,
							message: 'Please enter Status!',
						},
					]}
				>
					<Select>
						<Select.Option value="applied">Applied</Select.Option>
						<Select.Option value="inConsideration">
							In Consideration
						</Select.Option>
						<Select.Option value="rejected">Rejected</Select.Option>
						<Select.Option value="accepted">Accepted</Select.Option>
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
}
