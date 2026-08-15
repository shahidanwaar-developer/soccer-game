import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useUser } from '../context/UserContext';
import { PageHeader, Tabs } from '../components/ui/Utils';
import { Card, StatCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';


export default function AccountPage() {
  const { user, updateProfile } = useUser();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    email: user.email || '',
  });

  const handleSaveProfile = () => {
    updateProfile({
      name: editData.name,
      email: editData.email,
    });
    setIsEditing(false);
  };

  const tabs = [
    { label: 'Overview', value: 'overview' },
    { label: 'Statistics', value: 'statistics' },
    { label: 'Settings', value: 'settings' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Account"
        action={
          !isEditing && (
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              <Icon icon="solar:pen-2-bold" className="text-lg" />
              Edit Profile
            </Button>
          )
        }
      />

      {/* Profile Header */}
      <Card className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar src={user.avatar} name={user.name} size="xl" />

        <div className="flex-1 text-center md:text-left">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleSaveProfile}
                  className="flex-1"
                >
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({ name: user.name, email: user.email || '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-white">{user.name}</h2>
              <p className="text-gray-400 mt-1">{user.email}</p>
              <p className="text-sm text-gray-500 mt-2">Joined {user.joinedDate}</p>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 md:ml-auto">
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-500">{user.rating}</p>
            <p className="text-xs text-gray-400 mt-1">Rating</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">${user.balance}</p>
            <p className="text-xs text-gray-400 mt-1">Balance</p>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            label="Total Matches"
            value={user.totalMatches}
            icon="🎮"
            change={{ value: `${user.successRate.toFixed(1)}%`, type: 'positive' }}
          />
          <StatCard
            label="Wins"
            value={user.wins}
            icon="🏆"
            change={{ value: `+${user.wins}`, type: 'positive' }}
          />
          <StatCard
            label="Losses"
            value={user.losses}
            icon="📉"
            change={{ value: `-${user.losses}`, type: 'negative' }}
          />
          <StatCard
            label="Draws"
            value={user.draws}
            icon="⚖️"
            change={{ value: `${user.draws}`, type: 'neutral' }}
          />
        </div>
      )}

      {/* Statistics Tab */}
      {activeTab === 'statistics' && (
        <Card>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">Win Rate</p>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${user.successRate}%` }}
                />
              </div>
              <p className="text-white font-semibold mt-2">{user.successRate.toFixed(1)}%</p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
              <div>
                <p className="text-xs text-gray-400">Match Record</p>
                <p className="text-2xl font-bold text-white">
                  {user.wins}-{user.losses}-{user.draws}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Avg per Match</p>
                <p className="text-2xl font-bold text-white">
                  {(user.rating / user.totalMatches).toFixed(0)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Current Rating</p>
                <p className="text-2xl font-bold text-yellow-500">{user.rating}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <Card>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-700">
              <div>
                <p className="font-semibold text-white">Email Notifications</p>
                <p className="text-sm text-gray-400">Receive match updates and promotions</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-gray-700">
              <div>
                <p className="font-semibold text-white">Sound Notifications</p>
                <p className="text-sm text-gray-400">Play sounds for match events</p>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-400">Add extra security to your account</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
