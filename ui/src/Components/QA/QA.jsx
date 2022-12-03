import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Empty } from 'antd';
import './QA.scss'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import AddQuestion from '../AddQuestion/AddQuestion';
import EditQuestion from '../AddQuestion/EditQuestion';

export default function QA() {
	const [questions, setQuestions] = useState([]);
	const [addQuestionOpen, setAddQuestionOpen] = useState(false);
	const [editQuestionOpen, setEditQuestionOpen] = useState(false);
	const [editQuestions, setEditQuestions] = useState(false);
	const [loading, setLoading] = useState(true);
	const { state } = useLocation();

	useEffect(() => {
		updateQuestions();
		console.log(questions);
	}, []);
	const updateQuestions = () => {
		axios
			.get(`${config.base_url}/view_questions?email=` + state.email)
			.then((res) => {
				console.log(res);
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
				{questions.map((qa, index) => (
					<Card className="QACard" key={qa._id} title={qa.question}
					>
						Answer: {qa.answer}
					</Card>
				))}
				{questions.length === 0 && <Empty />}
			</div>
			{editQuestions && (
				<EditQuestion
					application={editApplication}
					onClose={() => setEditQuestions(false)}
					updateApplications={updateQuestions}
					email={state.email}
				/>
			)}
		</div>
	);

}
