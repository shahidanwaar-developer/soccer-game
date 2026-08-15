
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';
import { AppShell } from './components/layout/AppShell';

// Pages
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import DepositPage from './pages/DepositPage';
import ChatPage from './pages/ChatPage';
import MatchesPage from './pages/MatchesPage';
import StandingsPage from './pages/StandingsPage';
import NotificationsPage from './pages/NotificationsPage';
import ExhibitionPage from './pages/ExhibitionPage';
import OneVsOnePage from './pages/OneVsOnePage';
import TournamentsPage from './pages/TournamentsPage';
import TournamentDetailsPage from './pages/TournamentDetailsPage';
import TeamPage from './pages/TeamPage';
import TransfersPage from './pages/TransfersPage';
import BonusesPage from './pages/BonusesPage';

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <Router>
          <AppShell>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/deposit" element={<DepositPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/matches" element={<MatchesPage />} />
              <Route path="/standings" element={<StandingsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/exhibition" element={<ExhibitionPage />} />
              <Route path="/1v1" element={<OneVsOnePage />} />
              <Route path="/tournaments" element={<TournamentsPage />} />
              <Route path="/tournaments/:id" element={<TournamentDetailsPage />} />
              <Route path="/team" element={<TeamPage />} />
              <Route path="/transfers" element={<TransfersPage />} />
              <Route path="/bonuses" element={<BonusesPage />} />
            </Routes>
          </AppShell>
        </Router>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;
