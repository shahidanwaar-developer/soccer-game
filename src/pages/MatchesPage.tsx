import { useState } from 'react';
import { Icon } from '@iconify/react';
import { PageHeader, Tabs } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/Badge';
import { mockMatches } from '../data/mockData';

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingMatches = mockMatches.filter((m) => m.status === 'upcoming');
  const liveMatches = mockMatches.filter((m) => m.status === 'live');
  const completedMatches = mockMatches.filter((m) => m.status === 'completed');

  const tabs = [
    { label: `Upcoming (${upcomingMatches.length})`, value: 'upcoming' },
    { label: `Live (${liveMatches.length})`, value: 'live' },
    { label: `Completed (${completedMatches.length})`, value: 'completed' },
  ];

  const renderMatches = () => {
    let matches = [];
    if (activeTab === 'upcoming') matches = upcomingMatches;
    else if (activeTab === 'live') matches = liveMatches;
    else matches = completedMatches;

    if (matches.length === 0) {
      return (
        <div className="text-center py-12">
          <Icon icon="solar:sad-smile-bold" className="text-4xl text-gray-500 mb-4" />
          <p className="text-gray-400">No {activeTab} matches at the moment</p>
        </div>
      );
    }

    return matches.map((match) => (
      <Card key={match.id} hoverable className="mb-4 last:mb-0">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold px-2 py-1 bg-blue-900 text-blue-200 rounded capitalize">
                  {match.type.replace('-', ' ')}
                </span>
                <StatusBadge status={match.status} size="sm" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            {/* Team 1 */}
            <div className="text-center">
              <p className="font-bold text-white mb-2">{match.team1.name}</p>
              <p className="text-sm text-gray-400">({match.player1.name})</p>
              <p className="text-xs text-gray-500">Rating: {match.player1.rating}</p>
            </div>

            {/* Score or Time */}
            <div className="text-center">
              {match.status === 'completed' && match.score ? (
                <div>
                  <p className="text-3xl font-bold text-white">
                    {match.score.team1} - {match.score.team2}
                  </p>
                  {match.result && (
                    <p
                      className={`text-sm font-bold mt-2 ${
                        match.result === 'win'
                          ? 'text-green-400'
                          : match.result === 'loss'
                            ? 'text-red-400'
                            : 'text-gray-400'
                      }`}
                    >
                      {match.result.toUpperCase()}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  {match.status === 'live' ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm font-bold text-red-500">LIVE</span>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">
                      {match.scheduledDate
                        ? new Date(match.scheduledDate).toLocaleTimeString()
                        : 'Scheduled'}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Team 2 */}
            <div className="text-center">
              <p className="font-bold text-white mb-2">{match.team2.name}</p>
              <p className="text-sm text-gray-400">({match.player2.name})</p>
              <p className="text-xs text-gray-500">Rating: {match.player2.rating}</p>
            </div>
          </div>

          {match.status === 'completed' && match.ratingChange !== undefined && (
            <div className="bg-gray-700 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Rating Change</p>
              <p
                className={`text-lg font-bold ${
                  match.ratingChange > 0
                    ? 'text-green-400'
                    : match.ratingChange < 0
                      ? 'text-red-400'
                      : 'text-gray-400'
                }`}
              >
                {match.ratingChange > 0 ? '+' : ''}{match.ratingChange}
              </p>
            </div>
          )}
        </div>
      </Card>
    ));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="My Matches" subtitle="View all your matches" />

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div>{renderMatches()}</div>
    </div>
  );
}
