import React, { useEffect, useState } from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Empty } from 'antd';
import './QA.scss'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import AddQuestion from './AddQuestion';
import EditQuestion from './EditQuestion';

export default function QA() {
	const [questions, setQuestions] = useState([]);
	const [addQuestionOpen, setAddQuestionOpen] = useState(false);
	const [editQuestions, setEditQuestions] = useState(false);
	const [loading, setLoading] = useState(true);
	const { state } = useLocation();

	useEffect(() => {
		updateQuestions();
	}, []);
	const updateQuestions = () => {
		axios
			.get(`${config.base_url}/view_questions?email=` + state.email)
			.then((res) => {
				return res.data;
			})
			.then((data) => setQuestions(data.questions))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}
	const toggleAddQuestion = () => setAddQuestionOpen(!addQuestionOpen);

	return (
		<div className="QAs">
			<div className="SubHeader">
				<div className="flex" />
				<div className="SubHeader">
					<div className="flex" />
					<Button
						id="add-questions"
						type="primary"
						size="large"
						icon={<PlusOutlined />}
						onClick={toggleAddQuestion}
					>
						Add Question
					</Button>
					<AddQuestion
						isOpen={addQuestionOpen}
						onClose={toggleAddQuestion}
						updateQuestions={updateQuestions}
					/>
				</div>
			</div>
			<div className="QA">
				{loading && (
					<>
						<Card loading />
						<Card loading />
					</>
				)}
				{questions.map((qa) => (
					<Card className="QACard" key={qa._id} title={qa.question}
                    extra={<Button
                         icon={<EditOutlined/>}
                         onClick={() => setEditQuestions(qa)}
                         >Edit</Button>}
					>
						Answer: {qa.answer}
					</Card>
				))}
				{questions.length === 0 && <Empty />}
			</div>
			{editQuestions && (
				<EditQuestion
					question={editQuestions}
					onClose={() => setEditQuestions(false)}
					updateQuestions={updateQuestions}
					email={state.email}
				/>
			)}
		</div>
	);

}
