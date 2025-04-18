import './KanbanBoard.scss';
import {IssueType, ObjType} from '../../../types';
import {useState} from "react";
import {Link} from "react-router-dom"; // ⬅️ Добавляем

interface Props {
    object: ObjType;
    onAddIssue?: (name: string) => void;
    onMoveIssue?: (fromTitle: string, toTitle: string, issueId: string) => void;
    availableIssues?: IssueType[];
}

function KanbanBoard({ object, onAddIssue, onMoveIssue, availableIssues = [] }: Props) {
    const { title, issues } = object;
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedIssueId, setSelectedIssueId] = useState('');
    
    const handleAdd = () => {
        if (inputValue.trim()) {
            onAddIssue?.(inputValue);
        }
        setInputValue('');
        setIsInputOpen(false);
    };
    
    const handleMove = () => {
        if (selectedIssueId) {
            const prevColumnTitle = getPreviousColumnTitle(title.toLowerCase());
            onMoveIssue?.(prevColumnTitle, title.toLowerCase(), selectedIssueId);
            setSelectedIssueId('');
            setIsInputOpen(false);
        }
    };
    
    const getPreviousColumnTitle = (current: string): string => {
        const order = ['backlog', 'ready', 'in progress', 'finished'];
        const index = order.indexOf(current);
        return order[index - 1];
    };
    
    return (
        <div className="board">
            <h1 className="board_title">{title}</h1>
            
            <div className="board_task-list">
                {issues.map((issue) => (
                    <Link
                        to={`/tasks/${issue.id}`}
                        key={issue.id}
                        className="board_task-card"
                    >
                        {issue.name}
                    </Link>
                ))}
            </div>
            
            {isInputOpen && onAddIssue && (
                <div>
                    <input
                        className='board_input'
                        type="text"
                        placeholder="Enter task name"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button className='board_button-submit' onClick={handleAdd}>Submit</button>
                </div>
            )}
            
            {isInputOpen && onMoveIssue && (
                <div>
                    <select
                        value={selectedIssueId}
                        onChange={(e) => setSelectedIssueId(e.target.value)}
                    >
                        <option value="">Select task</option>
                        {availableIssues.map((issue) => (
                            <option key={issue.id} value={issue.id}>{issue.name}</option>
                        ))}
                    </select>
                    <button onClick={handleMove}>Submit</button>
                </div>
            )}
            
            {(onAddIssue || (onMoveIssue && availableIssues.length > 0)) && !isInputOpen && (
                <button
                    className="board_add-task"
                    onClick={() => setIsInputOpen(true)}
                >
                    + Add card
                </button>
            )}
        </div>
    );
}

export default KanbanBoard;
