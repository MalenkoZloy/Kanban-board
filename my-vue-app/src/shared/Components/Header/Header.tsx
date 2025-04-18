import './Header.scss';
import UserDropdown from '../UserDropdown/UserDropdown';


function Header() {
	return (
		<header className="app_header">
			<h1 className="app_header-title">Awesome Kanban Board</h1>
			<UserDropdown />
		</header>
	)
}

export default Header;