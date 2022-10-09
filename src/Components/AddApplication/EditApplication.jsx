/* eslint-disable react/prop-types */
import React from 'react';
import { Button, DatePicker, Form, Input, message, Modal, Select } from 'antd';
import moment from 'moment';
import axios from 'axios';

const statuses = {
	applied: 'Applied',
	inReview: 'In Review',
	interview: 'Interview',
	rejected: 'Rejected',
	accepted: 'Accepted',
};

export default function EditApplication({ application, onClose, updateApplications, email }) {
	const [form] = Form.useForm();

	const closeForm = () => {
		form.resetFields();
		onClose();
	};

	const updateApplication = (values) => {
		const loading = message.loading('Saving...', 0);
		axios
			.post('/api/modify_application', {
				...values,
				_id: application._id,
				email,
			})
			.then(({ data }) => {
				message.success(data.message);
				updateApplications();
			})
			.catch((err) => message.error(err.response.data?.error))
			.finally(() => {
				loading();
				closeForm();
			});
	};

	const deleteApplication = () => {
		axios
			.post('/api/delete_application', { ...application, email })
			.then(({ data }) => {
				message.success(data.message);
				updateApplications();
			})
			.catch((err) => message.error(err.response.data?.error));
		closeForm();
	};

	return (
		<Modal
			title="Edit Application"
			open={true}
			onCancel={closeForm}
			width={700}
			centered
			footer={[
				<Button type="primary" danger onClick={deleteApplication} id="delete" key="delete">
					Delete
				</Button>,
				<Button type="primary" onClick={() => form.submit()} id="save" key="save">
					Save
				</Button>,
			]}
		>
			<Form
				form={form}
				layout="vertical"
				requiredMark={false}
				initialValues={{
					companyName: application.companyName,
					jobId: application.jobId,
					jobTitle: application.jobTitle,
					description: application.description,
					url: application.url,
					status: application.status,
					date: moment(application.date),
				}}
				onFinish={updateApplication}
			>
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
				<Form.Item label="Notes" name="description">
					<Input.TextArea placeholder="Enter Notes" />
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
