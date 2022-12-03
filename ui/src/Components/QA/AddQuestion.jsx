import React from 'react';
import { Button, DatePicker, Form, Input, message, Modal, Select } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import config from '../../config';

export default function AddQuestion({ isOpen, onClose, updateQuestions }) {
    const [form] = Form.useForm();
    const { state } = useLocation();

    const closeForm = () => {
        form.resetFields();
        onClose();
    };

    const onOk = (values) => {
        axios
            .post(`${config.base_url}/add_question`, { ...values, email: state.email })
            .then(({ data }) => {
                message.success(data.message);
                updateQuestions();
                closeForm();
            })
            .catch((err) => message.error(err.response.data?.error));
    };

    return (
        <Modal
            title="Add Question"
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
                    label="Question"
                    name="question">
                    <Input placeholder="Enter Question" />
                </Form.Item>
                <Form.Item
                    label="Answer"
                    name="answer"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter Answer!',
                        },
                    ]}
                >
                    <Input.TextArea placeholder="Enter Answer" />
                </Form.Item>
            </Form>
        </Modal>
    );
}
