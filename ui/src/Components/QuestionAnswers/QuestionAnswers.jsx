import React from 'react';
import { Button, Card, Tag, Typography } from 'antd';
import { EditFilled, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import config from '../../config';
import addQuestion from '../AddQuestion/AddQuestion';
import editQuestion from '../AddQuestion/EditQuestion';

export default function Questionanswers() {
    const [questions, Setquestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addquestionOpen, SetAddquestionOpen] = useState(false);
    const [editQuestion, seteditQuestion] = useState(false);
    const { state } = useLocation();

    useEffect(() => {
        updateQuestions();
    }, []);

    const updateQuestions = () => {
        axios
            .get(`${config.base_url}/view_questions?email=` + state.email)
            .then(({ data }) => Setquestions(data.questions))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    const toggleAddQuestion = () => SetAddquestionOpen(!addquestionOpen);
    return (
        <div className="LandingPage">
            <div className="SubHeader">
                <div className="flex" />
                <Button
                    id="add-application"
                    type="primary"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={toggleAddQuestion}
                >
                    Add Application
                </Button>
                <AddApplication
                    isOpen={AddquestionOpen}
                    onClose={toggleAddQuestion}
                    updateApplications={updateQuestions}
                />
            </div>
            <div>
                <p>{questions.title}</p>
                <p>{questions.ans}</p>
            </div>

        </div>
    );
}
