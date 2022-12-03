/* eslint-disable react/prop-types */
import React from 'react';
import { Button, DatePicker, Form, Input, message, Modal, Select } from 'antd';
import moment from 'moment';
import axios from 'axios';
import config from '../../config';

export default function EditQuestion({ question, onClose, updateQuestions, email }) {
    const [form] = Form.useForm();

    const closeForm = () => {
        form.resetFields();
        onClose();
    };

    const updateQuestion = (values) => {
        console.log(values)
        const loading = message.loading('Saving...', 0);
        axios
            .post(`${config.base_url}/modify_question`, {
                ...values,
                _id: question._id,
                email,
            })
            .then(({ data }) => {
                message.success(data.message);
                updateQuestions();
            })
            .catch((err) => message.error(err.response.data?.error))
            .finally(() => {
                loading();
                closeForm();
            });
    };

    const deleteQuestion = () => {
        axios
            .post(`${config.base_url}/delete_question`, { ...question, email })
            .then(({ data }) => {
                message.success(data.message);
                updateQuestion();
            })
            .catch((err) => message.error(err.response.data?.error));
        closeForm();
    };

    return (
        <Modal
            title="Edit Question"
            open={true}
            onCancel={closeForm}
            width={700}
            centered
            footer={[
                <Button type="primary" danger onClick={deleteQuestion} id="delete" key="delete">
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
                    question: question.question,
                    answer: question.answer,
                }}
                onFinish={updateQuestion}
            >
                <Form.Item
                    label="Question"
                    name="question"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter Question!',
                        },
                    ]}
                >
                    <Input placeholder="Enter Question" />
                </Form.Item>
                <Form.Item
                    label="Answer"
                    name="answer">
                    <Input.TextArea placeholder="Enter Answer" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
