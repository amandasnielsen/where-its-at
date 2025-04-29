import './navbuttons.css';
import { useNavigate } from 'react-router-dom';

function NavButtons() {

	const navigate = useNavigate();

	return (
		<div className="navbuttons">
			<button
				onClick={() => navigate('/events')} 
				className="button__events"
				>Events
			</button>
			<button 
				onClick={() => navigate('/tickets')} 
				className="button__tickets"
				>My Tickets
			</button>
	</div>
  )
}

export default NavButtons;