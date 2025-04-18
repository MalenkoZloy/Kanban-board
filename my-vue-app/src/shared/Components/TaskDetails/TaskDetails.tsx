import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IssueType, ObjType} from '../../../types';
import "./TaskDetails.scss";

const KANBAN_DATA = 'kanbanData';

function TaskDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState<IssueType | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    
    useEffect(() => {
        const storedData = localStorage.getItem(KANBAN_DATA);
        if (storedData && id) {
            const parsedData: ObjType[] = JSON.parse(storedData);
            for (const column of parsedData) {
                const found = column.issues.find((issue) => issue.id === id);
                if (found) {
                    setTask(found);
                    setTitle(found.name);
                    setDescription(found.description || '');
                    break;
                }
            }
        }
    }, [id]);
    
    const handleSave = () => {
        const storedData = localStorage.getItem(KANBAN_DATA);
        if (!storedData || !task) return;
        
        const data: ObjType[] = JSON.parse(storedData);
        const updated = data.map(col => ({
            ...col,
            issues: col.issues.map(issue =>
                issue.id === task.id
                    ? { ...issue, name: title, description }
                    : issue
            )
        }));
        
        localStorage.setItem(KANBAN_DATA, JSON.stringify(updated));
        navigate('/');
    };
    
    if (!task) return <p>Loading...</p>;
    
    return (
        <div className="task-details">
            <button className="task-details__close" onClick={() => navigate('/')}>✖</button>
            
            <h2>Edit Task</h2>
            
            <label>Title:</label>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="task-details__input"
                readOnly
            />
            
            <label>Description:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="task-details__textarea"
            />
            
            <button className="task-details__save" onClick={handleSave}>Save</button>
        </div>
    );
}

export default TaskDetails;
