import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { PageHeader } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/Badge';
import { mockTournaments } from '../data/mockData';

export default function TournamentsPage() {
  const navigate = useNavigate();
  const [tournaments] = useState(mockTournaments);
  const [joinedTournaments, setJoinedTournaments] = useState(
    tournaments.filter((t) => t.joined)
  );

  const handleJoinTournament = (tournament: typeof mockTournaments[0]) => {
    if (!joinedTournaments.find((t) => t.id === tournament.id)) {
      setJoinedTournaments([...joinedTournaments, tournament]);
    }
  };

  

  const upcomingTournaments = tournaments.filter((t) => t.status === 'upcoming');
  const liveTournaments = tournaments.filter((t) => t.status === 'live');
  const completedTournaments = tournaments.filter((t) => t.status === 'completed');

  return (
    <div className="space-y-8">
      <PageHeader
        title="Tournaments"
        subtitle={`You have joined ${joinedTournaments.length} tournament${joinedTournaments.length !== 1 ? 's' : ''}`}
      />

      {/* Joined Tournaments */}
      {joinedTournaments.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">My Tournaments</h2>
          {renderTournaments(joinedTournaments)}
        </div>
      )}

      

      {/* Upcoming Tournaments */}
      {upcomingTournaments.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Upcoming</h2>
          {renderTournaments(upcomingTournaments)}
        </div>
      )}

      {/* Completed Tournaments */}
      {completedTournaments.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Completed</h2>
          {renderTournaments(completedTournaments)}
        </div>
      )}
    </div>
  );
}
