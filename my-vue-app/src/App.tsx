import './App.scss';
import KanbanBoard from "./shared/Components/KanbanBoard/KanbanBoard";
import {ObjType} from './types';
import {Route, Routes} from "react-router-dom";
import TaskDetails from './shared/Components/TaskDetails/TaskDetails';


const KANBAN_DATA = 'kanbanData';

interface AppProps {
	data: ObjType[];
	setData: React.Dispatch<React.SetStateAction<ObjType[]>>;
}

function App({ data, setData }: AppProps) {
	const addIssueToBacklog = (name: string) => {
		const updatedData = data.map((column) => {
			if (column.title.toLowerCase() === 'backlog') {
				const newIssue = {
					id: crypto.randomUUID(),
					name,
					description: '',
				};
				return {
					...column,
					issues: [...column.issues, newIssue],
				};
			}
			return column;
		});
		
		setData(updatedData);
		localStorage.setItem(KANBAN_DATA, JSON.stringify(updatedData));
	};
	
	const moveIssue = (fromTitle: string, toTitle: string, issueId: string) => {
		const updatedData = data.map((column) => {
			if (column.title.toLowerCase() === fromTitle.toLowerCase()) {
				return {
					...column,
					issues: column.issues.filter(issue => issue.id !== issueId),
				};
			}
			if (column.title.toLowerCase() === toTitle.toLowerCase()) {
				const movedIssue = data
					.find(col => col.title.toLowerCase() === fromTitle.toLowerCase())
					?.issues.find(issue => issue.id === issueId);
				
				if (movedIssue) {
					return {
						...column,
						issues: [...column.issues, movedIssue],
					};
				}
			}
			return column;
		});
		
		setData(updatedData);
		localStorage.setItem(KANBAN_DATA, JSON.stringify(updatedData));
	};
	
	return (
		<Routes>
			<Route
				path="/"
				element={
					<div className="board_container">
						{data.map((column, idx) => {
							const currentTitle = column.title.toLowerCase();
							const prevColumn = data[idx - 1];
							
							return (
								<KanbanBoard
									key={column.title}
									object={column}
									onAddIssue={currentTitle === 'backlog' ? addIssueToBacklog : undefined}
									onMoveIssue={currentTitle !== 'backlog' ? moveIssue : undefined}
									availableIssues={prevColumn?.issues ?? []}
								/>
							);
						})}
					</div>
				}
			/>
			
			<Route path="/tasks/:id" element={<TaskDetails />} />
		</Routes>
	);
}

export default App;
