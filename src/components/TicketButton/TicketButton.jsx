import './ticketbutton.css';

function TicketButton({ onClick, text, className, disabled = '' }) {
  return (
	<button 
		onClick={onClick}
		disabled={disabled}
		className={`custom-button ${className}`}>
		{text}
  	</button>
  );
}

export default TicketButton;