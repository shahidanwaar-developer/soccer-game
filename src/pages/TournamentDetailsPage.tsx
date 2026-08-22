
import { useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { PageHeader, Tabs } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/Badge';
import { mockTournaments, mockPlayers } from '../data/mockData';
import { useState } from 'react';

export default function TournamentDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  
  const tournament = mockTournaments.find((t) => t.id === id);
  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Bracket', value: 'bracket' },
    { label: 'Participants', value: 'participants' },
    { label: 'Rules', value: 'rules' },
  ];

  if (!tournament) {
    return (
      <div className="text-center py-12">
        <Icon icon="solar:sad-smile-bold" className="text-4xl text-gray-500 mb-4" />
        <p className="text-gray-400">Tournament not found</p>
      </div>
    );
  }

  return (
  <div className="space-y-6">
      <PageHeader title={tournament.name} />

      {/* Header Card */}
      <Card>
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="md:w-1/3">
              <div className="bg-linear-to-br from-purple-600 to-blue-600 rounded-lg h-64 flex items-center justify-center overflow-hidden">
                {tournament.imageUrl ? (
                  <img
                    src={tournament.imageUrl}
                    alt={tournament.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon icon="lucide:trophy" className="text-6xl text-white/50" />
                )}
              </div>
            </div>

            {/* Details */}
            <div className="md:w-2/3 space-y-4">
              <div className="flex items-center gap-2">
                <StatusBadge status={tournament.status} />
                <p className="text-sm text-gray-400">{tournament.startDate}</p>
              </div>

              <p className="text-lg text-gray-300">{tournament.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-700 rounded-lg p-4">
                <div>
                  <p className="text-xs text-gray-400">Participants</p>
                  <p className="text-2xl font-bold text-white">
                    {tournament.participants}/{tournament.maxParticipants}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Prize Pool</p>
                  <p className="text-2xl font-bold text-green-400">${tournament.prizePool.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Entry Fee</p>
                  <p className="text-2xl font-bold text-blue-400">${tournament.entryFee}</p>
                </div>
              </div>

              <Button fullWidth size="lg" variant={tournament.joined ? 'outline' : 'primary'}>
                {tournament.joined ? 'Tournament Joined' : 'Join Tournament'}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-bold text-white mb-4">Tournament Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400">Status</p>
                <p className="font-semibold text-white capitalize">{tournament.status}</p>
              </div>
              <div>
                <p className="text-gray-400">Start Date</p>
                <p className="font-semibold text-white">{tournament.startDate}</p>
              </div>
              {tournament.endDate && (
                <div>
                  <p className="text-gray-400">End Date</p>
                  <p className="font-semibold text-white">{tournament.endDate}</p>
                </div>
              )}
              <div>
                <p className="text-gray-400">Entry Fee</p>
                <p className="font-semibold text-white">${tournament.entryFee}</p>
              </div>
              <div>
                <p className="text-gray-400">Prize Pool</p>
                <p className="font-semibold text-green-400">${tournament.prizePool.toLocaleString()}</p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-white mb-4">Prize Distribution</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:medal-1-bold" className="text-yellow-500 text-xl" />
                  <span className="font-semibold text-white">1st Place</span>
                </div>
                <span className="text-green-400 font-bold">${(tournament.prizePool * 0.5).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:medal-2-bold" className="text-gray-400 text-xl" />
                  <span className="font-semibold text-white">2nd Place</span>
                </div>
                <span className="text-green-400 font-bold">${(tournament.prizePool * 0.3).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Icon icon="solar:medal-3-bold" className="text-orange-600 text-xl" />
                  <span className="font-semibold text-white">3rd Place</span>
                </div>
                <span className="text-green-400 font-bold">${(tournament.prizePool * 0.2).toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Bracket Tab */}
      {activeTab === 'bracket' && (
        <Card>
          <p className="text-gray-400 text-center py-12">Tournament bracket coming soon...</p>
        </Card>
      )}

      {/* Participants Tab */}
      {activeTab === 'participants' && (
        <Card>
          <p className="text-sm text-gray-400 mb-4">{tournament.participants} / {tournament.maxParticipants} participants</p>
          <div className="space-y-2">
            {mockPlayers.slice(0, 5).map((player, index) => (
              <div key={player.id} className="flex items-center justify-between pb-2 border-b border-gray-700 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-semibold">#{index + 1}</span>
                  <div>
                    <p className="font-semibold text-white">{player.name}</p>
                    <p className="text-xs text-gray-500">{player.team}</p>
                  </div>
                </div>
                <span className="text-yellow-400 font-bold">{player.rating}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Rules Tab */}
      {activeTab === 'rules' && (
        <Card>
          <div className="space-y-4">
            <h3 className="font-bold text-white">Tournament Rules</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>Each player participates in a single-elimination bracket</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>Matches are played in real-time on the platform</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>Rating changes apply to all tournament matches</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>Winners advance to the next round</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-400">•</span>
                <span>Prize distribution is based on final placement</span>
              </li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
}
