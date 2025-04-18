import './Footer.scss';

interface FooterProps {
	backlogCount: number;
	finishedCount: number;
}

function Footer({ backlogCount, finishedCount }: FooterProps) {
	return (
		<footer className="footer">
			<div className="footer__info">
				<span>Backlog: {backlogCount}</span>
				<span>Finished: {finishedCount}</span>
			</div>
			<span className="footer__text" >Kanban board by Коробков Иван 2025 год</span>
		</footer>
	);
}

export default Footer;
