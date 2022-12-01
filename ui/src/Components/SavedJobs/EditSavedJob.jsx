/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import moment from 'moment';
export default function EditSavedJob({ application, onClose, updateApplications, email }) {
    console.log(application)
    const [form] = Form.useForm();
    const { state } = useLocation();

    const closeForm = () => {
        form.resetFields();
        onClose();
    };
    const updateApplication = (values) => {
        const loading = message.loading('Saving...', 0);
        console.log(values)
        axios
            .post(`${config.base_url}/modify_application`, {
                ...values,
                _id: application._id,
                email,
                description: "",
                status: "saved",
                date: moment()
                
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
			.post(`${config.base_url}/delete_application`, { ...application, email })
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
                <Button type="primary" onClick={() => form.submit()} id="add-submit" key="ok">
                    Edit
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" requiredMark={false} onFinish={updateApplication}
                initialValues={{
                    companyName: application.companyName,
                    jobId: application.jobId,
                    jobTitle: application.jobTitle,
                    url: application.url,
                    status: application.status
                }}
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
