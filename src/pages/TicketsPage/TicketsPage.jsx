import Ticket from '../../components/Ticket/Ticket';
import NavButtons from '../../components/NavButtons/NavButtons';
import Confetti from 'react-confetti';
import './ticketspage.css';
import { useEffect, useState } from 'react';

function TicketsPage() {
  // State to keep track of window-size
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  // State to show confetti-rain
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Function that updates window-size if changed
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 20000); // Show confetti for 20 seconds

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="tickets__page">
      <h1>Your Tickets</h1>
      {showConfetti && (
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height} 
          numberOfPieces={200} 
        />
      )}
      <Ticket />
      <NavButtons />
    </section>
  );
}

export default TicketsPage;
