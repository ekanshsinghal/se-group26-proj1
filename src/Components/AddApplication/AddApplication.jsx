/* eslint-disable react/prop-types */
import React from 'react';
import { Button, DatePicker, Form, Input, message, Modal, Select } from 'antd';
import axios from 'axios';

const statuses = {
	applied: 'Applied',
	inReview: 'In Review',
	interview: 'Interview',
	rejected: 'Rejected',
	accepted: 'Accepted',
};

export default function AddApplication({ isOpen, onClose, updateApplications }) {
	const [form] = Form.useForm();

	const closeForm = () => {
		form.resetFields();
		onClose();
	};

	const onOk = () => {
		form.validateFields()
			.then((values) => {
				axios
					.post('/api/add_application', values)
					.then(({ data }) => {
						message.success(data.message);
						updateApplications();
						closeForm();
					})
					.catch((err) => message.error(err.response.data.error));
			})
			.catch(({ errorFields }) => console.log(errorFields));
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
						{Object.keys(statuses).map((key) => (
							<Select.Option value={key} key={key}>
								{statuses[key]}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
			</Form>
		</Modal>
	);
}
