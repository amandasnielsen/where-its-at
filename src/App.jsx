import LandingPage from "./pages/LandingPage/LandingPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import TicketsPage from "./pages/TicketsPage/TicketsPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TicketQuantity from "./pages/TicketQuantityPage/TicketQuantityPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <section className="app">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/event/:eventId" element={<TicketQuantity />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </section>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;