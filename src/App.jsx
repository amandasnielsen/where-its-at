import LandingPage from "./pages/LandingPage/LandingPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import TicketsPage from "./pages/TicketsPage/TicketsPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TicketQuantity from "./pages/TicketQuantityPage/TicketQuantityPage";
import OrderPage from "./pages/OrderPage/OrderPage";

function App() {
  return (
    <BrowserRouter>
      <section className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/event/:eventId" element={<TicketQuantity />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
