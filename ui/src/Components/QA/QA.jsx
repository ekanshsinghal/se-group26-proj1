import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Empty } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';
import './QA.scss'
export default function QA() {
    const [QAs, setQAs] = useState([]);
    const [addQAOpen, setAddQAOpen] = useState(false);
    const [editQAOpen, setEditAOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
		updateQAs();
	}, []);
    const updateQAs = () => {
        let numbers = ['1','2','3','4','5','6','7']
        setLoading(false)
		setQAs(numbers.map((n) => {
            return {
            'id': n,
            'question': 'Question '+ n,
            'answer': 'Answer '+ n
            }
        }));
    }
    return(
<div className="QAs">
			<div className="SubHeader">
				<div className="flex" />
				<Button
					id="add-qa"
					type="primary"
					size="large"
					icon={<PlusOutlined />}
					// onClick={toggleAddApplication}
				>
					Add QA
				</Button>
				{/* <AddSavedJob
					isOpen={addApplicationOpen}
					onClose={toggleAddApplication}
					updateApplications={updateApplications}
				/>
				{editApplication && (
					<EditSavedJob
						onClose={() => setEditApplication(false)}
						updateApplications={updateApplications}
						application={editApplication}
						email={state.email}
					/>)}
				{shiftApplicationOpen &&
					(
						<EditApplication
							application={shiftApplicationOpen}
							onClose={() => setShiftApplicationOpen(false)}
							updateApplications={updateApplications}
							email={state.email}
						/>)} */}
			</div>
			<div className="QA">
				{loading && (
					<>
						<Card loading />
						<Card loading />
					</>
				)}
				{QAs.map((qa) => (
					<Card className="QACard" key={qa.id} title={qa.question} 
                    // extra=
                    // {
					// 	<Button
					// 		type="text"
					// 		icon={<EditFilled />}
					// 		onClick={() => setEditApplication(application)}
					// 		id={application.jobId + 'edit'}
					// 	/>
					// }
                    >
						Answer: {qa.answer}
						{/* {'URL: '}
						<a href={'//' + application.url} target={'_blank'}>
							{application.url}
						</a>
						<br/>
						<br/>
						<Button type='primary' id={application.jobId + 'edit'} key="apply" onClick={() => setShiftApplicationOpen(application)}>
							Already Applied?
						</Button> */}
					</Card>
				))}
				{QAs.length === 0 && <Empty/>}
			</div>
		</div>
    );

}
