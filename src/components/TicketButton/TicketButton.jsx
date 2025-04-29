import './ticketbutton.css';

function TicketButton({ onClick, text, className = '' }) {
  return (
	<button 
		onClick={onClick} 
		className={`custom-button ${className}`}>
		{text}
  	</button>
  );
}

export default TicketButton;