import './navbuttons.css';
import { useNavigate } from 'react-router-dom';

function NavButtons() {

	const navigate = useNavigate();

	return (
		<div className="navbuttons">
			<button
				onClick={() => navigate('/events')} 
				className="button__nav"
				>Events
			</button>
			<button 
				onClick={() => navigate('/order')} 
				className="button__nav"
				>Order
			</button>
			<button 
				onClick={() => navigate('/tickets')} 
				className="button__nav"
				>My Tickets
			</button>
	</div>
  )
}

export default NavButtons;