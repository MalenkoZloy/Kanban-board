import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import React, {ReactNode, useEffect, useState} from "react";
import {dataMock} from '../../../mockData';
import {ObjType} from '../../../types';

const KANBAN_DATA = 'kanbanData';

interface LayoutProps {
	children: ReactNode;
}

function Layout({ children }: LayoutProps) {
	const [data, setData] = useState<ObjType[]>([]);
	
	useEffect(() => {
		const storedData = localStorage.getItem(KANBAN_DATA);
		if (storedData) {
			setData(JSON.parse(storedData));
		} else {
			localStorage.setItem(KANBAN_DATA, JSON.stringify(dataMock));
			setData(dataMock);
		}
	}, []);
	
	const backlogCount = data.find(col => col.title.toLowerCase() === 'backlog')?.issues.length || 0;
	const finishedCount = data.find(col => col.title.toLowerCase() === 'finished')?.issues.length || 0;
	
	return (
		<>
			<Header />
			<main>
				{React.cloneElement(children as React.ReactElement, { data, setData })}
			</main>
			<Footer backlogCount={backlogCount} finishedCount={finishedCount} />
		</>
	);
}

export default Layout;
