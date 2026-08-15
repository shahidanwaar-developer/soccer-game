import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useUser } from '../context/UserContext';
import { PageHeader } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { Carousel } from '../components/ui/Carousel';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/Badge';
import { mockCarouselSlides, mockMatches, mockTournaments } from '../data/mockData';

export default function HomePage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [selectedMatch] = useState(mockMatches[1]); // Upcoming match
  const recentMatches = mockMatches.filter((m) => m.status === 'completed').slice(0, 3);
  const activeTournaments = mockTournaments.filter((t) => ['upcoming', 'live'].includes(t.status));

  const quickActions = [
    { label: 'Exhibition', icon: 'solar:play-circle-bold', path: '/exhibition', color: 'from-purple-600 to-purple-800' },
    { label: '1v1 Match', icon: 'solar:sword-bold', path: '/1v1', color: 'from-orange-600 to-orange-800' },
    { label: 'Tournament', icon: 'solar:trophy-bold', path: '/tournaments', color: 'from-yellow-600 to-yellow-800' },
    { label: 'Manage Team', icon: 'solar:users-group-rounded-bold', path: '/team', color: 'from-blue-600 to-blue-800' },
    { label: 'Transfers', icon: 'solar:transfer-horizontal-bold', path: '/transfers', color: 'from-green-600 to-green-800' },
    { label: 'My Matches', icon: 'solar:football-bold', path: '/matches', color: 'from-red-600 to-red-800' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <PageHeader
          title={`Welcome back, ${user.name.split(' ')[0]}!`}
          subtitle="Here's your football platform dashboard"
        />
      </div>

      {/* Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Current Balance</p>
                <p className="text-4xl font-bold text-white">${user.balance.toLocaleString()}</p>
              </div>
              <Icon icon="solar:wallet-bold" className="text-blue-500 text-5xl" />
            </div>
            <Button
              onClick={() => navigate('/deposit')}
              className="w-full"
              variant="primary"
            >
              <Icon icon="solar:plus-circle-bold" className="text-lg" />
              Deposit Now
            </Button>
          </div>
        </Card>

        <Card className="md:col-span-1">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-400">Your Rating</p>
              <Icon icon="solar:star-bold" className="text-yellow-500 text-3xl" />
            </div>
            <p className="text-4xl font-bold text-white">{user.rating}</p>
            <p className="text-sm text-gray-400">Rank among players</p>
          </div>
        </Card>

        <Card className="md:col-span-1">
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-400">Match Record</p>
              <Icon icon="solar:chart-bold" className="text-green-500 text-3xl" />
            </div>
            <p className="text-3xl font-bold text-white">
              {user.wins}-{user.losses}-{user.draws}
            </p>
            <p className="text-sm text-gray-400">
              Win Rate: {((user.wins / user.totalMatches) * 100).toFixed(1)}%
            </p>
          </div>
        </Card>
      </div>

      {/* Carousel */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Featured Events</h2>
        <Carousel slides={mockCarouselSlides} autoPlayInterval={4000} />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className={`bg-linear-to-br ${action.color} rounded-lg p-6 text-white font-semibold hover:shadow-xl transition-all transform hover:scale-105 active:scale-95`}
            >
              <Icon icon={action.icon} className="text-4xl mb-2" />
              <p>{action.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Match & Recent Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Match */}
        {selectedMatch && (
          <Card className="lg:col-span-1">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Upcoming Match</h3>
                <StatusBadge status="upcoming" size="sm" />
              </div>

              <div className="space-y-3 border-t border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Your Team</p>
                    <p className="font-semibold text-white">{selectedMatch.team1.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Opponent</p>
                    <p className="font-semibold text-white">{selectedMatch.team2.name}</p>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-3">
                  <p className="text-xs text-gray-400">Match Time</p>
                  <p className="font-semibold text-white">
                    {selectedMatch.scheduledDate
                      ? new Date(selectedMatch.scheduledDate).toLocaleString()
                      : 'Scheduled'}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-2">Match Type</p>
                  <span className="inline-block px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm font-semibold capitalize">
                    {selectedMatch.type.replace('-', ' ')}
                  </span>
                </div>

                <Button className="w-full" variant="primary">
                  View Match
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Recent Results */}
        <Card className="lg:col-span-2">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Recent Results</h3>

            <div className="space-y-3">
              {recentMatches.length > 0 ? (
                recentMatches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between pb-3 border-b border-gray-700 last:border-0"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-white">vs {match.player2.name}</p>
                      <p className="text-xs text-gray-400">{match.matchDate}</p>
                    </div>

                    <div className="text-center">
                      <div className="font-bold text-white">
                        {match.score ? `${match.score.team1}-${match.score.team2}` : 'N/A'}
                      </div>
                      <div className={`text-xs font-semibold ${
                        match.result === 'win'
                          ? 'text-green-400'
                          : match.result === 'loss'
                            ? 'text-red-400'
                            : 'text-gray-400'
                      }`}>
                        {match.result?.toUpperCase()}
                      </div>
                    </div>

                    <div className={`text-right min-w-fit ml-4 ${
                      match.ratingChange && match.ratingChange > 0
                        ? 'text-green-400'
                        : match.ratingChange && match.ratingChange < 0
                          ? 'text-red-400'
                          : 'text-gray-400'
                    }`}>
                      <div className="font-semibold">
                        {match.ratingChange ? (match.ratingChange > 0 ? '+' : '') + match.ratingChange : '0'}
                      </div>
                      <div className="text-xs">Rating</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">No completed matches yet</p>
              )}
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/matches')}
            >
              View All Matches
            </Button>
          </div>
        </Card>
      </div>

      {/* Active Tournaments */}
      {activeTournaments.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Active Tournaments</h2>
            <Button variant="outline" size="sm" onClick={() => navigate('/tournaments')}>
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeTournaments.slice(0, 2).map((tournament) => (
              <Card key={tournament.id} hoverable onClick={() => navigate(`/tournaments/${tournament.id}`)}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">{tournament.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{tournament.description}</p>
                    </div>
                    <StatusBadge status={tournament.status} size="sm" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-gray-700 rounded-lg p-3">
                    <div>
                      <p className="text-xs text-gray-400">Participants</p>
                      <p className="font-semibold text-white">
                        {tournament.participants}/{tournament.maxParticipants}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Prize Pool</p>
                      <p className="font-semibold text-white">${tournament.prizePool.toLocaleString()}</p>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    variant={tournament.joined ? 'outline' : 'primary'}
                  >
                    {tournament.joined ? 'View Tournament' : 'Join Tournament'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
