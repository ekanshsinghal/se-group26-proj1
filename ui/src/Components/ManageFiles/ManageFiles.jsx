import React, { useEffect, useState } from 'react';
import {
	DeleteOutlined,
	DownloadOutlined,
	EditOutlined,
	FilePdfOutlined,
	PlusOutlined,
	UploadOutlined,
} from '@ant-design/icons';
import { Button, Card, Empty, message, Spin, Tooltip } from 'antd';
import './ManageFiles.scss';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import AddFile from './AddFile';

export default function ManageFiles() {
	const [addFileVisible, setAddFileVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const [loadingDownload, setLoadingDownload] = useState(false);
	const [loadingDelete, setLoadingDelete] = useState(false);
	const [files, setFiles] = useState([]);
	const { state } = useLocation();
	useEffect(() => {
		updateFiles();
	}, []);
	const updateFiles = () => {
		axios
			.get(`${config.base_url}/view_files?email=` + state.email)
			.then(({ data }) => setFiles(data.files))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	};
	const onDownload = (file) => {
		setLoadingDownload(true);
		axios
			.post(`${config.base_url}/download_file`, file, { responseType: 'blob' })
			.then((response) => {
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement('a');
				link.href = url;
				link.setAttribute('download', file.filename.split('--;--')[1]);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
				window.URL.revokeObjectURL(href);
			})
			.catch((err) => console.log(err))
			.finally(() => setLoadingDownload(false));
	};
	const onDeleteFile = (file) => {
		setLoadingDelete(true);
		axios
			.post(`${config.base_url}/delete_file`, file)
			.then((response) => {
				message.success(response.data.message);
				updateFiles();
			})
			.catch((err) => console.log(err))
			.finally(setLoadingDelete(false));
	};
	const toggleAddFile = () => setAddFileVisible(!addFileVisible);
	return (
		<div className="ManageFiles">
			<div className="SubHeader">
				<div className="flex" />
				<div className="SubHeader">
					<div className="flex" />
					<Tooltip title={files.length >= 4 ? 'Maximum 2 files per user' : 'Upload File'}>
						<Button
							id="add-file"
							type="primary"
							size="large"
							icon={<UploadOutlined />}
							onClick={toggleAddFile}
							disabled={files.length >= 4}
						>
							Upload New File
						</Button>
					</Tooltip>
					<AddFile
						isOpen={addFileVisible}
						onClose={toggleAddFile}
						updateFiles={updateFiles}
						toggleAddFile={toggleAddFile}
					/>
				</div>
			</div>
			<div className="ManageFile">
				{loading && (
					<>
						<Card loading />
					</>
				)}
				{loadingDownload && <Spin></Spin>}
				{loadingDelete && <Spin></Spin>}
				{files.map((file) => (
					<Card
						className="ManageFileCard"
						key={file._id}
						title={file.filename.split('--;--')[1]}
						extra={
							<Button
								loading={loadingDelete}
								onClick={() => onDeleteFile(file)}
								icon={<DeleteOutlined />}
								type="danger"
							>
								Delete
							</Button>
						}
					>
						<Button
							icon={<DownloadOutlined />}
							type="primary"
							onClick={() => onDownload(file)}
							disabled={loadingDownload}
						>
							Download
						</Button>
					</Card>
				))}
				{files.length === 0 && !loading && <Empty />}
			</div>
		</div>
	);
}
