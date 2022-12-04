/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Form, Input, Spin, Modal, Upload } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import config from '../../config';
const { Dragger } = Upload;
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';
export default function AddFile({ isOpen, onClose, updateFiles, toggleAddFile }) {
	const [form] = Form.useForm();
	const { state } = useLocation();
	const [fileListDisplay, setFileListDisplay] = useState([]);
	const closeForm = () => {
		form.resetFields();
		onClose();
	};
	const uploadFile = async (options) => {
		const { onSuccess, file, onProgress } = options;
		setFileListDisplay([file]);
		const fmData = new FormData();
		const configReq = {
			headers: { 'content-type': 'multipart/form-data' },
			onUploadProgress: (event) => {
				onProgress({ percent: (event.loaded / event.total) * 100 });
			},
		};
		fmData.append('file', file);
		const blob = new Blob([state.email], {
			type: 'application/json',
		});
		fmData.append('email', blob);
		try {
			axios
				.post(`${config.base_url}/upload_file`, fmData, configReq)
				.then(() => updateFiles())
				.then(() => closeForm())
				.then(() => setFileListDisplay([]))
				.then(onSuccess('Ok'));
		} catch (err) {}
	};
	return (
		<Modal
			title="Upload New File"
			open={isOpen}
			onCancel={closeForm}
			width={700}
			centered
			footer={null}
		>
			{fileListDisplay.length == 1 ? (
				<div style={{ textAlign: 'center' }}>
					<Spin />
				</div>
			) : (
				<Dragger
					name="file"
					accept=".pdf"
					customRequest={uploadFile}
					fileList={fileListDisplay}
				>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">Add Resume or Cover Letter (PDF Only) </p>
					<p className="ant-upload-hint">Drop it like it's hot!</p>
				</Dragger>
			)}
		</Modal>
	);
}
