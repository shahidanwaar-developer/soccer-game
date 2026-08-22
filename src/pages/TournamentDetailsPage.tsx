
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
