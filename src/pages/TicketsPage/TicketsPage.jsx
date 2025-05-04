import Ticket from '../../components/Ticket/Ticket';
import NavButtons from '../../components/NavButtons/NavButtons';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';

function TicketsPage() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="tickets__page">
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
