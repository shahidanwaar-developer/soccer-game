import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useUser } from '../context/UserContext';
import { PageHeader, Tabs } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockBonuses } from '../data/mockData';

export default function BonusesPage() {
  const { updateBalance } = useUser();
  const [activeTab, setActiveTab] = useState('available');
  const [claimedBonuses, setClaimedBonuses] = useState<string[]>(['bonus1']);
  const [claimingBonus, setClaimingBonus] = useState<string | null>(null);

  const tabs = [
    { label: 'Available', value: 'available' },
    { label: 'Claimed', value: 'claimed' },
  ];

  const handleClaimBonus = async (bonus: typeof mockBonuses[0]) => {
    if (claimedBonuses.includes(bonus.id)) return;

    setClaimingBonus(bonus.id);

    // Simulate claiming process
    setTimeout(() => {
      updateBalance(bonus.amount);
      setClaimedBonuses([...claimedBonuses, bonus.id]);
      setClaimingBonus(null);
    }, 1000);
  };

  const availableBonuses = mockBonuses.filter((b) => b.status === 'available' && !claimedBonuses.includes(b.id));
  const claimedBonusesList = mockBonuses.filter((b) => claimedBonuses.includes(b.id));

  const renderBonusCards = (bonuses: typeof mockBonuses, isClaimed: boolean = false) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bonuses.length > 0 ? (
        bonuses.map((bonus) => (
          <Card key={bonus.id}>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{bonus.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{bonus.description}</p>
                </div>
                <Icon icon="solar:gift-bold" className="text-3xl text-yellow-500" />
              </div>

              {/* Progress Bar */}
              {bonus.progress && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-gray-400">Progress</p>
                    <p className="text-xs font-semibold text-white">
                      {bonus.progress.current}/{bonus.progress.total}
                    </p>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${(bonus.progress.current / bonus.progress.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Reward Amount */}
              <div className="bg-linear-to-r from-green-900 to-green-800 rounded-lg p-3">
                <p className="text-xs text-green-200 mb-1">Reward</p>
                <p className="text-2xl font-bold text-white">+${bonus.amount}</p>
              </div>

              {/* Expiry Date */}
              {bonus.expiryDate && (
                <p className="text-xs text-gray-500">Expires: {bonus.expiryDate}</p>
              )}

              {/* Action Button */}
              {isClaimed ? (
                <Button fullWidth variant="secondary" disabled>
                  <Icon icon="solar:check-circle-bold" />
                  Claimed
                </Button>
              ) : bonus.progress && bonus.progress.current < bonus.progress.total ? (
                <div className="bg-blue-900 border border-blue-700 rounded-lg p-3 text-center">
                  <p className="text-sm text-blue-200">
                    Complete {bonus.progress.total - bonus.progress.current} more actions to unlock
                  </p>
                </div>
              ) : (
                <Button
                  fullWidth
                  variant="primary"
                  loading={claimingBonus === bonus.id}
                  onClick={() => handleClaimBonus(bonus)}
                >
                  <Icon icon="solar:star-bold" />
                  Claim Bonus
                </Button>
              )}
            </div>
          </Card>
        ))
      ) : (
        <div className="md:col-span-2 text-center py-12">
          <Icon icon="solar:box-bold" className="text-4xl text-gray-500 mb-4" />
          <p className="text-gray-400">No {isClaimed ? 'unclaimed' : 'claimed'} bonuses</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bonuses & Rewards"
        subtitle={`Total unclaimed rewards: $${mockBonuses
          .filter((b) => !claimedBonuses.includes(b.id))
          .reduce((sum, b) => sum + b.amount, 0)}`}
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div>
            <p className="text-sm text-gray-400 mb-2">Available Bonuses</p>
            <p className="text-3xl font-bold text-white">{availableBonuses.length}</p>
            <p className="text-xs text-gray-500 mt-2">Waiting to be claimed</p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-400 mb-2">Claimed Rewards</p>
            <p className="text-3xl font-bold text-green-400">${mockBonuses
              .filter((b) => claimedBonuses.includes(b.id))
              .reduce((sum, b) => sum + b.amount, 0)
              .toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Total claimed</p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-400 mb-2">Potential Rewards</p>
            <p className="text-3xl font-bold text-yellow-400">${mockBonuses
              .filter((b) => !claimedBonuses.includes(b.id))
              .reduce((sum, b) => sum + b.amount, 0)
              .toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-2">Still available</p>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Available Bonuses */}
      {activeTab === 'available' && renderBonusCards(availableBonuses)}

      {/* Claimed Bonuses */}
      {activeTab === 'claimed' && renderBonusCards(claimedBonusesList, true)}

      {/* How It Works */}
      <Card>
        <h3 className="text-lg font-bold text-white mb-4">How It Works</h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">1</div>
            <div>
              <p className="font-semibold text-white">Complete Challenges</p>
              <p className="text-sm text-gray-400">Participate in matches and tournaments to progress</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">2</div>
            <div>
              <p className="font-semibold text-white">Unlock Rewards</p>
              <p className="text-sm text-gray-400">Meet requirements to unlock bonus rewards</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">3</div>
            <div>
              <p className="font-semibold text-white">Claim & Enjoy</p>
              <p className="text-sm text-gray-400">Claim bonuses and add them to your account balance</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
