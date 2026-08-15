import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useUser } from '../context/UserContext';
import { PageHeader } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge, RatingBadge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';

import { mockPlayers } from '../data/mockData';

type MatchmakingStep = 'idle' | 'searching' | 'found' | 'lobby' | 'result';

export default function OneVsOnePage() {
  const { user, updateRating } = useUser();
  const [step, setStep] = useState<MatchmakingStep>('idle');
  const [opponent, setOpponent] = useState<typeof mockPlayers[0] | null>(null);
  const [matchResult, setMatchResult] = useState<'win' | 'loss' | 'draw' | null>(null);
  const [searchTime, setSearchTime] = useState(0);
  const [ready, setReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);

  useEffect(() => {
    if (step !== 'searching') return;

    const interval = setInterval(() => {
      setSearchTime((prev) => prev + 1);

      // Simulate finding opponent after 3-8 seconds
      if (searchTime > 2 && searchTime < 8 && Math.random() < 0.3) {
        const randomOpponent = mockPlayers[Math.floor(Math.random() * mockPlayers.length)];
        setOpponent(randomOpponent);
        setStep('found');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [step, searchTime]);

  useEffect(() => {
    if (step !== 'lobby') return;

    const readyTimer = setTimeout(() => {
      setOpponentReady(true);
    }, 2000);

    return () => clearTimeout(readyTimer);
  }, [step]);

  const handleStartSearch = () => {
    setStep('searching');
    setSearchTime(0);
    setOpponent(null);
  };

  const handleCancelSearch = () => {
    setStep('idle');
    setSearchTime(0);
  };

  const handleAcceptOpponent = () => {
    setStep('lobby');
    setReady(false);
    setOpponentReady(false);
  };

  const handleStartMatch = () => {
    // Simulate match result
    const results: ('win' | 'loss' | 'draw')[] = ['win', 'loss', 'draw'];
    const result = results[Math.floor(Math.random() * results.length)];
    setMatchResult(result);

    // Update rating
    if (result === 'win') updateRating(1);
    else if (result === 'loss') updateRating(-1);

    setTimeout(() => setStep('result'), 2000);
  };

  const handleNewMatch = () => {
    setStep('idle');
    setOpponent(null);
    setMatchResult(null);
    setReady(false);
    setOpponentReady(false);
    setSearchTime(0);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="1v1 Match" subtitle="Head-to-head competitive matchmaking" />

      {/* Idle State */}
      {step === 'idle' && (
        <Card className="space-y-6">
          <div className="text-center space-y-4">
            <Icon icon="lucide:swords" className="text-6xl text-orange-500 mb-4" />
            <h2 className="text-2xl font-bold text-white">Find an Opponent</h2>
            <p className="text-gray-400">
              Challenge another player in a competitive 1v1 match. Your rating may change based on the result.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-t border-b border-gray-700">
            <div>
              <p className="text-sm text-gray-400 mb-2">Your Profile</p>
              <div className="flex items-center gap-4 bg-gray-700 rounded-lg p-4">
                <Avatar src={user.avatar} name={user.name} size="lg" />
                <div>
                  <p className="font-bold text-white">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.team}</p>
                  <div className="mt-2 flex gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Rating</p>
                      <p className="font-bold text-yellow-400">{user.rating}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Record</p>
                      <p className="font-bold text-white">{user.wins}W {user.losses}L</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">Match Info</p>
              <div className="space-y-2 bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Match Type</span>
                  <span className="text-white font-semibold">1v1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Entry Fee</span>
                  <span className="text-white font-semibold">$0 (Practice)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Rating Change</span>
                  <span className="text-white font-semibold">±1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Wait Time</span>
                  <span className="text-white font-semibold">5 seconds</span>
                </div>
              </div>
            </div>
          </div>

          <Button fullWidth size="lg" variant="primary" onClick={handleStartSearch}>
            <Icon icon="solar:magnifer-bold" className="text-xl" />
            Find Opponent
          </Button>
        </Card>
      )}

      {/* Searching State */}
      {step === 'searching' && (
        <Card>
          <div className="text-center space-y-8 py-12">
            <div>
              <div className="inline-block">
                <svg className="w-16 h-16 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    opacity="0.75"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mt-4 mb-2">Finding Your Opponent...</h2>
              <p className="text-gray-400">This may take a few moments</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-blue-400">{searchTime}s</p>
              <p className="text-gray-400 text-sm">Searching</p>
            </div>

            <Button variant="danger" onClick={handleCancelSearch} size="lg">
              Cancel Search
            </Button>
          </div>
        </Card>
      )}

      {/* Opponent Found */}
      {step === 'found' && opponent && (
        <Card>
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-white">Opponent Found!</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
              {/* Player 1 */}
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <Avatar src={user.avatar} name={user.name} size="xl" />
                  <h3 className="text-lg font-bold text-white mt-3">{user.name}</h3>
                  <p className="text-sm text-gray-400">{user.team}</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating</span>
                    <span className="font-bold text-yellow-400">{user.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Rate</span>
                    <span className="font-bold text-white">
                      {((user.wins / (user.wins + user.losses + user.draws)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* VS */}
              <div className="flex flex-col items-center justify-center">
                <div className="text-4xl font-bold text-gray-500 mb-4">VS</div>
                <StatusBadge status="accepted" />
              </div>

              {/* Player 2 */}
              <div className="space-y-4">
                <div className="flex flex-col items-center">
                  <Avatar src={opponent.avatar} name={opponent.name} size="xl" />
                  <h3 className="text-lg font-bold text-white mt-3">{opponent.name}</h3>
                  <p className="text-sm text-gray-400">{opponent.team}</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating</span>
                    <span className="font-bold text-yellow-400">{opponent.rating}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Win Rate</span>
                    <span className="font-bold text-white">
                      {((opponent.wins / (opponent.wins + opponent.losses + opponent.draws)) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
              <p className="text-blue-200">
                <Icon icon="solar:info-circle-bold" className="inline mr-2" />
                Your rating may change based on the match result
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Button variant="outline" onClick={handleCancelSearch} className="flex-1">
                Decline
              </Button>
              <Button variant="primary" onClick={handleAcceptOpponent} className="flex-1">
                Accept Match
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Match Lobby */}
      {step === 'lobby' && opponent && (
        <Card>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Match Lobby</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Your Status */}
              <div className="bg-gray-700 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar src={user.avatar} name={user.name} size="md" />
                    <p className="font-bold text-white">{user.name}</p>
                  </div>
                  {ready ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <Icon icon="solar:check-circle-bold" />
                      Ready
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Icon icon="solar:clock-bold" />
                      Waiting
                    </div>
                  )}
                </div>
                <Button fullWidth variant={ready ? 'secondary' : 'primary'} onClick={() => setReady(!ready)}>
                  {ready ? 'Not Ready' : 'Ready'}
                </Button>
              </div>

              {/* Opponent Status */}
              <div className="bg-gray-700 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar src={opponent.avatar} name={opponent.name} size="md" />
                    <p className="font-bold text-white">{opponent.name}</p>
                  </div>
                  {opponentReady ? (
                    <div className="flex items-center gap-2 text-green-400">
                      <Icon icon="solar:check-circle-bold" />
                      Ready
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-yellow-400">
                      <Icon icon="solar:clock-bold" />
                      Waiting
                    </div>
                  )}
                </div>
                <Button fullWidth variant="secondary" disabled>
                  {opponentReady ? 'Ready' : 'Waiting...'}
                </Button>
              </div>
            </div>

            <div className="border-t border-gray-600 pt-6">
              <Button
                fullWidth
                size="lg"
                variant="primary"
                onClick={handleStartMatch}
                disabled={!ready || !opponentReady}
              >
                <Icon icon="solar:play-circle-bold" className="text-xl" />
                Start Match
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Match Result */}
      {step === 'result' && opponent && matchResult && (
        <Card className="bg-linear-to-r from-blue-900 to-blue-800">
          <div className="text-center space-y-6 py-12">
            <div>
              <p className="text-xl text-gray-300 mb-2">Match Complete</p>
              <h2 className="text-5xl font-bold text-white mb-4">
                {matchResult === 'win'
                  ? 'Victory!'
                  : matchResult === 'loss'
                    ? 'Defeat'
                    : 'Draw'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-t border-b border-blue-700">
              <div>
                <RatingBadge rating={user.rating} change={matchResult === 'win' ? 1 : matchResult === 'loss' ? -1 : 0} />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-lg font-bold text-white mb-2">vs {opponent.name}</p>
                <p className="text-sm text-gray-300">{opponent.team}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button fullWidth size="lg" variant="primary" onClick={handleNewMatch}>
                <Icon icon="solar:swords-bold" className="text-xl" />
                Play Again
              </Button>
              <Button fullWidth size="lg" variant="outline">
                View Match Details
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
