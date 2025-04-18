import './UserDropdown.scss'
import userAvatar from '../../../assets/Images/Avatars/Kanban-User-Avatar.png'
import arrowDown from '../../../assets/Images/SVG/Arrow Down Kanban.svg'
import arrowTop from '../../../assets/Images/SVG/Arrow top Kanban.svg'
import {useState} from 'react';

function UserDropdown() {
	const [isOpenUser, setIsOpenUser] = useState(false)
	
	return (
		<div className="userDropdown">
			<img src={userAvatar}
				 alt="аватар"/>
			<button
				className='userDropdown_button'
				onClick={() => setIsOpenUser(!isOpenUser)}
			>
				<img src={isOpenUser ? arrowTop : arrowDown}
					 alt="стрелка"
					 className='userDropdown_arrow'
				/>
			</button>
			
			{isOpenUser && (
				<>
					<div className="userDropdown_corner"></div>
					<div className='userDropdown_profile'>
						<p>Profile</p>
						<p>Log Out</p>
					</div>
				</>
			)}
		</div>
	)
}

export default UserDropdown;