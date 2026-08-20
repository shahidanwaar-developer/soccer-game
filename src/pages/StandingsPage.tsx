import { useState } from 'react';
import { Icon } from '@iconify/react';
import { PageHeader, SearchInput } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { Select } from '../components/ui/Input';
import { mockPlayers } from '../data/mockData';

export default function StandingsPage() {
  const [filter, setFilter] = useState('global');
  const [searchTerm, setSearchTerm] = useState('');

  const filterOptions = [
    { value: 'global', label: 'Global' },
    { value: 'friends', label: 'Friends' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
  ];

  const sortedPlayers = [...mockPlayers].sort((a, b) => b.rating - a.rating);
  const filteredPlayers = sortedPlayers.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Standings" subtitle="Global player rankings" />

      <div className="flex flex-col md:flex-row gap-4 md:items-end">
        <Select
          label="Filter By"
          options={filterOptions}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="md:w-48"
        />
        <SearchInput
          placeholder="Search players..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Icon icon="solar:magnifer-bold" />}
          className="flex-1"
        />
      </div>

      <Card className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-3 text-sm font-semibold text-gray-300">Rank</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-300">Player</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-300">Team</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-300 text-center">Rating</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-300 text-center">W-L-D</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-300 text-right">Win %</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player, index) => {
              const totalMatches = player.wins + player.losses + player.draws;
              const winRate = totalMatches ? (player.wins / totalMatches * 100).toFixed(1) : 0;
              const isCurrentUser = player.name === 'Xavier Emmanuel';

              return (
                <tr
                  key={player.id}
                  className={`border-b border-gray-700 last:border-0 ${
                    isCurrentUser ? 'bg-blue-900/30' : 'hover:bg-gray-700/50'
                  } transition-colors`}
                >
                  <td className="px-4 py-3">
                    <span className={`font-bold text-lg ${
                      index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-orange-400' : 'text-gray-400'
                    }`}>
                      #{index + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-white">{player.name}</p>
                      <p className="text-xs text-gray-500">{player.position}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{player.team}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-bold text-yellow-400">{player.rating}</span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-300">
                    {player.wins}-{player.losses}-{player.draws}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-semibold text-green-400">{winRate}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
