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

  const renderTournaments = (list: typeof tournaments) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((tournament) => (
        <Card
          key={tournament.id}
          hoverable
          onClick={() => navigate(`/tournaments/${tournament.id}`)}
          className="flex flex-col"
        >
          <div className="space-y-4 flex-1">
            {/* Image Placeholder */}
            <div className="bg-linear-to-br from-purple-600 to-blue-600 rounded-lg h-32 flex items-center justify-center overflow-hidden">
              {tournament.imageUrl ? (
                <img
                  src={tournament.imageUrl}
                  alt={tournament.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon icon="lucide:trophy" className="text-4xl text-white/50" />
              )}
            </div>

            {/* Content */}
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-white flex-1">{tournament.name}</h3>
                <StatusBadge status={tournament.status} size="sm" />
              </div>
              <p className="text-sm text-gray-400 mb-4">{tournament.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-2 bg-gray-700 rounded-lg p-3 text-sm">
              <div>
                <p className="text-gray-400">Participants</p>
                <p className="font-bold text-white">
                  {tournament.participants}/{tournament.maxParticipants}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Prize Pool</p>
                <p className="font-bold text-green-400">${tournament.prizePool.toLocaleString()}</p>
              </div>
            </div>

            {/* Entry Fee */}
            <div className="bg-blue-900 border border-blue-700 rounded-lg p-2 text-center">
              <p className="text-xs text-blue-200">Entry Fee</p>
              <p className="text-lg font-bold text-white">${tournament.entryFee}</p>
            </div>
          </div>

          {/* Action Button */}
          <Button
            fullWidth
            variant={tournament.joined ? 'outline' : 'primary'}
            onClick={(e) => {
              e.stopPropagation();
              if (!tournament.joined) {
                handleJoinTournament(tournament);
              }
            }}
            className="mt-4"
          >
            {tournament.joined ? 'Joined' : 'Join Tournament'}
          </Button>
        </Card>
      ))}
    </div>
  );

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

      {/* Live Tournaments */}
      {liveTournaments.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Live Now
          </h2>
          {renderTournaments(liveTournaments)}
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
