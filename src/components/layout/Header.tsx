import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useNotifications } from '../../context/NotificationContext';
import { useUser } from '../../context/UserContext';
import { Avatar } from '../ui/Avatar';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: 'solar:home-2-bold' },
  { label: 'My Account', path: '/account', icon: 'solar:user-circle-bold' },
  { label: 'Deposit', path: '/deposit', icon: 'solar:wallet-bold' },
  { label: 'Chat', path: '/chat', icon: 'solar:chat-round-dots-bold' },
  { label: 'My Matches', path: '/matches', icon: 'solar:football-bold' },
  { label: 'Standings', path: '/standings', icon: 'solar:ranking-bold' },
  { label: 'Exhibition', path: '/exhibition', icon: 'solar:play-circle-bold' },
  { label: '1v1 Match', path: '/1v1', icon: 'lucide:swords' },
  { label: 'Tournaments', path: '/tournaments', icon: 'lucide:trophy' },
  { label: 'Manage Team', path: '/team', icon: 'solar:users-group-rounded-bold' },
  { label: 'Transfers', path: '/transfers', icon: 'solar:transfer-horizontal-bold' },
  { label: 'Bonuses', path: '/bonuses', icon: 'solar:gift-bold' },
];

export function Header() {
  const location = useLocation();
  const { user } = useUser();
  const { unreadCount } = useNotifications();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const currentPage = navItems.find((item) => item.path === location.pathname)?.label || 'Dashboard';

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block sticky top-0 z-40 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between h-16 px-6">
          <div>
            <h2 className="text-lg font-bold text-white">{currentPage}</h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Balance */}
            <div className="flex items-center gap-2 bg-gray-700 rounded-lg px-4 py-2">
              <Icon icon="solar:wallet-bold" className="text-blue-400 text-xl" />
              <div>
                <p className="text-xs text-gray-400">Balance</p>
                <p className="text-lg font-bold text-white">${user.balance.toLocaleString()}</p>
              </div>
            </div>

            {/* Notifications */}
            <Link
              to="/notifications"
              className="relative p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Icon icon="solar:bell-bold" className="text-gray-300 text-xl hover:text-white" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <Link to="/account" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Avatar src={user.avatar} name={user.name} size="md" />
              <div className="text-sm">
                <p className="font-semibold text-white">{user.name}</p>
                <p className="text-gray-400">Rating: {user.rating}</p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <Icon icon="solar:football-bold" className="text-blue-500 text-2xl" />
            <span className="font-bold text-white text-lg">Soccer</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Balance */}
            <div className="flex items-center gap-1.5 bg-gray-700 rounded-lg px-3 py-1.5">
              <Icon icon="solar:wallet-bold" className="text-blue-400 text-sm" />
              <p className="font-bold text-white text-sm">${user.balance.toLocaleString()}</p>
            </div>

            {/* Menu Toggle */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {showMobileMenu ? (
                <Icon icon="solar:close-circle-bold" className="text-white text-2xl" />
              ) : (
                <Icon icon="solar:menu-dots-bold" className="text-white text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <nav className="bg-gray-800 border-t border-gray-700 max-h-96 overflow-y-auto">
            {navItems.slice(0, 6).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setShowMobileMenu(false)}
                className={`flex items-center gap-3 px-4 py-3 border-l-4 transition-colors ${
                  location.pathname === item.path
                    ? 'border-blue-500 bg-gray-700 text-blue-400'
                    : 'border-transparent text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Icon icon={item.icon} className="text-xl" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-gray-800 border-r border-gray-700 fixed left-0 top-16 bottom-0 overflow-y-auto">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3 px-6 py-4 border-b border-gray-700 hover:opacity-80">
        <Icon icon="solar:football-bold" className="text-blue-500 text-2xl" />
        <span className="font-bold text-white text-lg">Soccer</span>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Icon icon={item.icon} className="text-xl flex-shrink-0" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export function MobileBottomNav() {
  const location = useLocation();
  const { unreadCount } = useNotifications();

  const bottomNavItems: NavItem[] = [
    { label: 'Home', path: '/', icon: 'solar:home-2-bold' },
    { label: 'Matches', path: '/matches', icon: 'solar:football-bold' },
    { label: 'Chat', path: '/chat', icon: 'solar:chat-round-dots-bold', badge: unreadCount },
    { label: 'Account', path: '/account', icon: 'solar:user-circle-bold' },
    { label: 'More', path: '#', icon: 'solar:menu-dots-bold' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gray-800 border-t border-gray-700">
      <div className="flex items-center justify-around">
        {bottomNavItems.map((item) => (
          <Link
            key={item.path}
            to={item.path === '#' ? '/notifications' : item.path}
            className={`flex-1 flex flex-col items-center justify-center py-3 transition-colors relative ${
              location.pathname === item.path ? 'text-blue-400' : 'text-gray-400'
            }`}
          >
            <Icon icon={item.icon} className="text-2xl" />
            <span className="text-xs mt-1">{item.label}</span>
            {item.badge && item.badge > 0 && (
              <span className="absolute top-0 right-1/4 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
