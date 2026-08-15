import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useUser } from '../context/UserContext';
import { PageHeader, SearchInput, EmptyState } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { mockPlayers } from '../data/mockData';

interface SignedPlayer {
  id: string;
  playerId: string;
  playerName: string;
  position: string;
  rating: number;
  price: number;
  signedDate: string;
}

export default function TransfersPage() {
  const { user, updateBalance } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [positionFilter, setPositionFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [selectedPlayer, setSelectedPlayer] = useState<typeof mockPlayers[0] | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [signingPlayer, setSigningPlayer] = useState(false);
  const [signedPlayers, setSignedPlayers] = useState<SignedPlayer[]>([]);

  // Generate player prices based on rating
  const getPlayerPrice = (player: typeof mockPlayers[0]) => {
    return Math.round((player.rating - 1000) * 5);
  };

  // Filter players
  let filteredPlayers = mockPlayers.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = positionFilter === 'all' || p.position === positionFilter;
    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === 'high' && p.rating >= 1300) ||
      (ratingFilter === 'mid' && p.rating >= 1200 && p.rating < 1300) ||
      (ratingFilter === 'low' && p.rating < 1200);

    return matchesSearch && matchesPosition && matchesRating;
  });

  const handleSignPlayer = async () => {
    if (!selectedPlayer) return;

    const price = getPlayerPrice(selectedPlayer);
    if (user.balance < price) {
      alert('Insufficient balance to sign this player');
      return;
    }

    setSigningPlayer(true);

    // Simulate signing process
    setTimeout(() => {
      updateBalance(-price);
      setSignedPlayers([
        ...signedPlayers,
        {
          id: `sp_${Date.now()}`,
          playerId: selectedPlayer.id,
          playerName: selectedPlayer.name,
          position: selectedPlayer.position,
          rating: selectedPlayer.rating,
          price,
          signedDate: new Date().toISOString().split('T')[0],
        },
      ]);

      setSigningPlayer(false);
      setShowConfirmModal(false);
      setSelectedPlayer(null);
    }, 1500);
  };

  const positionOptions = [
    { value: 'all', label: 'All Positions' },
    { value: 'Goalkeeper', label: 'Goalkeeper' },
    { value: 'Defender', label: 'Defender' },
    { value: 'Midfielder', label: 'Midfielder' },
    { value: 'Forward', label: 'Forward' },
    { value: 'Striker', label: 'Striker' },
  ];

  const ratingOptions = [
    { value: 'all', label: 'Any Rating' },
    { value: 'high', label: '1300+ (Premium)' },
    { value: 'mid', label: '1200-1299 (Elite)' },
    { value: 'low', label: 'Below 1200' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Transfers" subtitle="Sign premium players to improve your squad" />

      {/* Signed Players */}
      {signedPlayers.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Your Signed Players</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-700">
            {signedPlayers.map((p) => (
              <Card key={p.id}>
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-white">{p.playerName}</h3>
                      <p className="text-xs text-gray-400">{p.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Signed</p>
                      <p className="text-xs text-white">{p.signedDate}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-gray-700 rounded-lg p-2 text-sm">
                    <div>
                      <p className="text-gray-400">Rating</p>
                      <p className="font-bold text-yellow-400">{p.rating}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Cost</p>
                      <p className="font-bold text-red-400">${p.price.toLocaleString()}</p>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" fullWidth>
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search & Filters */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Available Players</h3>

          <SearchInput
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Icon icon="solar:magnifer-bold" />}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Position"
              options={positionOptions}
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)}
            />
            <Select
              label="Rating"
              options={ratingOptions}
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            />
          </div>

          <p className="text-sm text-gray-400">{filteredPlayers.length} players available</p>
        </div>
      </Card>

      {/* Player Grid */}
      {filteredPlayers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => {
            const price = getPlayerPrice(player);
            const alreadySigned = signedPlayers.some((p) => p.playerId === player.id);

            return (
              <Card
                key={player.id}
                hoverable
                onClick={() => !alreadySigned && setSelectedPlayer(player)}
                className={alreadySigned ? 'opacity-50 cursor-not-allowed' : ''}
              >
                <div className="space-y-4">
                  {/* Player Info */}
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-white text-lg">{player.name}</h3>
                        <p className="text-xs text-gray-400">{player.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Rating</p>
                        <p className="text-xl font-bold text-yellow-400">{player.rating}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 bg-gray-700 rounded-lg p-2 text-xs">
                    <div className="text-center">
                      <p className="text-gray-400">Wins</p>
                      <p className="font-bold text-white">{player.wins}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400">Losses</p>
                      <p className="font-bold text-white">{player.losses}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-400">Draws</p>
                      <p className="font-bold text-white">{player.draws}</p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-blue-900 border border-blue-700 rounded-lg p-3 text-center">
                    <p className="text-xs text-blue-200">Transfer Cost</p>
                    <p className="text-2xl font-bold text-white">${price.toLocaleString()}</p>
                  </div>

                  {/* Button */}
                  <Button
                    fullWidth
                    variant={alreadySigned ? 'secondary' : 'primary'}
                    disabled={alreadySigned || user.balance < price}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!alreadySigned) {
                        setSelectedPlayer(player);
                        setShowConfirmModal(true);
                      }
                    }}
                  >
                    {alreadySigned ? 'Signed' : user.balance < price ? 'Insufficient Balance' : 'Sign Player'}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="🔍"
          title="No Players Found"
          description="Adjust your filters to find available players"
        />
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Player Transfer"
        actionLabel={signingPlayer ? 'Processing...' : 'Confirm Transfer'}
        onAction={handleSignPlayer}
        actionLoading={signingPlayer}
      >
        {selectedPlayer && (
          <div className="space-y-4">
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400 mb-2">Player</p>
              <p className="text-xl font-bold text-white">{selectedPlayer.name}</p>
              <p className="text-xs text-gray-500">{selectedPlayer.position}</p>
              <p className="text-sm text-yellow-400 font-semibold mt-2">Rating: {selectedPlayer.rating}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-900 rounded-lg p-3">
                <p className="text-xs text-red-200 mb-1">Transfer Cost</p>
                <p className="text-2xl font-bold text-white">${getPlayerPrice(selectedPlayer).toLocaleString()}</p>
              </div>
              <div className="bg-green-900 rounded-lg p-3">
                <p className="text-xs text-green-200 mb-1">Remaining Balance</p>
                <p className="text-2xl font-bold text-white">
                  ${(user.balance - getPlayerPrice(selectedPlayer)).toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-300">
              Are you sure you want to sign {selectedPlayer.name}? This transaction cannot be reversed.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
