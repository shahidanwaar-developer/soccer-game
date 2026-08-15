import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { PageHeader } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/Badge';

export default function ExhibitionPage() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'finished'>('idle');
  const [matchTime, setMatchTime] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setMatchTime((prev) => {
        if (prev >= 90) {
          setGameState('finished');
          return prev;
        }
        return prev + 1;
      });

      // Simulate ball movement
      setBallPosition({
        x: Math.random() * 100,
        y: Math.random() * 100,
      });

      // Simulate random scoring
      if (Math.random() < 0.02) {
        if (Math.random() < 0.6) {
          setPlayerScore((prev) => prev + 1);
        } else {
          setOpponentScore((prev) => prev + 1);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [gameState]);

  const startMatch = () => {
    setGameState('playing');
    setMatchTime(0);
    setPlayerScore(0);
    setOpponentScore(0);
  };

  const endMatch = () => {
    setGameState('finished');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Exhibition Match" subtitle="Practice your skills against a simulated opponent" />

      {gameState === 'idle' ? (
        <Card>
          <div className="space-y-6">
            <div className="text-center">
              <Icon icon="solar:football-bold" className="text-6xl text-blue-500 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Ready to Play?</h2>
              <p className="text-gray-400">
                Challenge our AI opponent in a friendly exhibition match. No rating change, just for fun!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-t border-b border-gray-700">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">Your Team</p>
                <p className="text-3xl font-bold text-white mb-4">Thunder United</p>
                <div className="bg-gray-700 rounded-lg p-4 text-left space-y-2">
                  <p className="text-sm"><span className="text-gray-400">Formation:</span> <span className="text-white font-semibold">4-3-3</span></p>
                  <p className="text-sm"><span className="text-gray-400">Rating:</span> <span className="text-white font-semibold">1240</span></p>
                  <p className="text-sm"><span className="text-gray-400">Squad:</span> <span className="text-white font-semibold">11 Players</span></p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400 mb-2">Opponent</p>
                <p className="text-3xl font-bold text-white mb-4">AI Elite</p>
                <div className="bg-gray-700 rounded-lg p-4 text-left space-y-2">
                  <p className="text-sm"><span className="text-gray-400">Formation:</span> <span className="text-white font-semibold">3-5-2</span></p>
                  <p className="text-sm"><span className="text-gray-400">Difficulty:</span> <span className="text-yellow-400 font-semibold">Medium</span></p>
                  <p className="text-sm"><span className="text-gray-400">Style:</span> <span className="text-white font-semibold">Balanced</span></p>
                </div>
              </div>
            </div>

            <div className="bg-blue-900 border border-blue-700 rounded-lg p-4 text-center">
              <p className="text-blue-200">
                <Icon icon="solar:info-circle-bold" className="inline mr-2" />
                This match does not affect your rating. Play freely and enjoy!
              </p>
            </div>

            <Button
              fullWidth
              size="lg"
              variant="primary"
              onClick={startMatch}
            >
              <Icon icon="solar:play-circle-bold" className="text-xl" />
              Start Match
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* Match Status Bar */}
          <Card className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <StatusBadge status="live" size="md" />
              <div>
                <p className="text-sm text-gray-400">Match Time</p>
                <p className="text-2xl font-bold text-white">{matchTime}' / 90'</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-4xl font-bold text-white">
                {playerScore} - {opponentScore}
              </p>
              <p className="text-xs text-gray-400 mt-1">Thunder United vs AI Elite</p>
            </div>

            <Button variant="danger" size="sm" onClick={endMatch}>
              End Match
            </Button>
          </Card>

          {/* Pitch Visualization */}
          <Card>
            <div className="bg-gradient-to-b from-green-900 to-green-800 rounded-lg p-8 aspect-video flex items-center justify-center relative overflow-hidden border-4 border-green-700">
              {/* Pitch Lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-full h-px bg-white/10" />
                <div className="absolute h-full w-1/3 border-r border-white/10" style={{ left: '33.33%' }} />
                <div className="absolute h-full w-1/3 border-l border-white/10" style={{ left: '66.66%' }} />
              </div>

              {/* Ball */}
              <div
                className="absolute w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-1000"
                style={{
                  left: `${ballPosition.x}%`,
                  top: `${ballPosition.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />

              {/* Teams Position */}
              <div className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 text-xs text-white font-semibold">
                <div>YOU</div>
                <div>YOU</div>
                <div>YOU</div>
              </div>

              <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-8 text-xs text-red-400 font-semibold">
                <div>AI</div>
                <div>AI</div>
                <div>AI</div>
              </div>
            </div>
          </Card>

          {/* Match Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <p className="text-sm text-gray-400 mb-4">Your Team Stats</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Possession</span>
                  <span className="font-bold text-white">58%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Shots</span>
                  <span className="font-bold text-white">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Passes</span>
                  <span className="font-bold text-white">342</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Accuracy</span>
                  <span className="font-bold text-green-400">87%</span>
                </div>
              </div>
            </Card>

            <Card>
              <p className="text-sm text-gray-400 mb-4">Opponent Stats</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Possession</span>
                  <span className="font-bold text-white">42%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Shots</span>
                  <span className="font-bold text-white">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Passes</span>
                  <span className="font-bold text-white">256</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Accuracy</span>
                  <span className="font-bold text-green-400">82%</span>
                </div>
              </div>
            </Card>
          </div>

          {gameState === 'finished' && (
            <Card className="bg-gradient-to-r from-blue-900 to-blue-800">
              <div className="text-center space-y-6">
                <div>
                  <p className="text-xl text-gray-300 mb-2">Match Result</p>
                  <p className="text-5xl font-bold text-white">
                    {playerScore > opponentScore
                      ? 'Victory!'
                      : playerScore < opponentScore
                        ? 'Defeat!'
                        : 'Draw!'}
                  </p>
                </div>

                <p className="text-3xl font-bold text-gray-200">
                  {playerScore} - {opponentScore}
                </p>

                <p className="text-gray-300">
                  Thank you for playing! This match does not affect your rating.
                </p>

                <Button
                  variant="primary"
                  onClick={() => {
                    setGameState('idle');
                    setMatchTime(0);
                    setPlayerScore(0);
                    setOpponentScore(0);
                  }}
                >
                  Play Again
                </Button>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
