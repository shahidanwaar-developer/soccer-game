import { useState } from 'react';
import { Icon } from '@iconify/react';

import { PageHeader } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Utils';
import { mockTeams } from '../data/mockData';

export default function TeamPage() {

  const [activeTab, setActiveTab] = useState('squad');
  const [selectedFormation, setSelectedFormation] = useState('4-3-3');
  const [team] = useState(mockTeams[0]);

  const tabs = [
    { label: 'Squad', value: 'squad' },
    { label: 'Lineup', value: 'lineup' },
    { label: 'Formation', value: 'formation' },
    { label: 'Statistics', value: 'statistics' },
  ];

  const formations = ['4-3-3', '3-5-2', '5-3-2', '4-4-2'];

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

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Squad Tab */}
      {activeTab === 'squad' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.squad.map((player) => (
            <Card key={player.id} hoverable>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-lg bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <p className="font-bold text-white text-lg">
                    {player.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white">{player.name}</h3>
                  <p className="text-sm text-gray-400">{player.position}</p>
                  <div className="flex gap-4 mt-2">
                    <div>
                      <p className="text-xs text-gray-500">Rating</p>
                      <p className="font-bold text-yellow-400">{player.rating}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Matches</p>
                      <p className="font-bold text-white">{player.wins + player.losses + player.draws}</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon icon="solar:info-circle-bold" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Lineup Tab */}
      {activeTab === 'lineup' && (
        <Card>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Starting Lineup</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {team.startingLineup.map((player) => (
                  <div key={player.id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white">{player.name}</p>
                      <p className="text-xs text-gray-400">{player.position}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Rating</p>
                      <p className="font-bold text-yellow-400">{player.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-bold text-white mb-4">Substitutes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {team.substitutes.map((player) => (
                  <div key={player.id} className="bg-gray-700 rounded-lg p-4 flex items-center justify-between opacity-75">
                    <div>
                      <p className="font-bold text-white">{player.name}</p>
                      <p className="text-xs text-gray-400">{player.position}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Rating</p>
                      <p className="font-bold text-yellow-400">{player.rating}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="primary" className="w-full">
              Save Lineup
            </Button>
          </div>
        </Card>
      )}

      {/* Formation Tab */}
      {activeTab === 'formation' && (
        <Card>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Select Formation</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {formations.map((formation) => (
                  <button
                    key={formation}
                    onClick={() => setSelectedFormation(formation)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                      selectedFormation === formation
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    }`}
                  >
                    {formation}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-700 pt-6">
              <p className="text-sm text-gray-400 mb-4">Formation Preview</p>
              <div className="bg-green-900 rounded-lg p-8 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Icon icon="solar:football-bold" className="text-4xl text-white mb-2" />
                  <p className="text-white font-bold">{selectedFormation}</p>
                </div>
              </div>
            </div>

            <Button variant="primary" className="w-full">
              Apply Formation
            </Button>
          </div>
        </Card>
      )}

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
