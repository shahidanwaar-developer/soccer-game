import { useState } from 'react';
import { PageHeader } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { mockTeams } from '../data/mockData';

export default function TeamPage() {

  const [activeTab, setActiveTab] = useState('squad');
  const [selectedFormation, setSelectedFormation] = useState('4-3-3');
  const [team] = useState(mockTeams[0]);

  return (
    <div className="space-y-6">
      <PageHeader title="Manage Team" subtitle="Configure your squad" />

      {/* Team Header */}
      <Card>
        <div className="flex items-center gap-6">
          <div className="text-5xl">{team.logo}</div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white">{team.name}</h2>
            <p className="text-gray-400 mt-1">{team.squad.length} Players</p>
          </div>
          <div className="text-right space-y-2">
            <div>
              <p className="text-sm text-gray-400">Team Rating</p>
              <p className="text-3xl font-bold text-yellow-400">{team.rating}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Formation</p>
              <p className="text-2xl font-bold text-white">{selectedFormation}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Statistics Tab */}
      {activeTab === 'statistics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-bold text-white mb-4">Team Performance</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                <span className="text-gray-400">Total Matches</span>
                <span className="font-bold text-white">156</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                <span className="text-gray-400">Total Wins</span>
                <span className="font-bold text-green-400">98</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                <span className="text-gray-400">Total Losses</span>
                <span className="font-bold text-red-400">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Win Rate</span>
                <span className="font-bold text-yellow-400">62.8%</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-white mb-4">Top Performers</h3>
            <div className="space-y-3">
              {team.squad.slice(0, 3).map((player) => (
                <div key={player.id} className="flex items-center justify-between pb-3 border-b border-gray-700 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-white">{player.name}</p>
                    <p className="text-xs text-gray-500">{player.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Rating</p>
                    <p className="font-bold text-yellow-400">{player.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
