// Player and Team Types
export interface Player {
  id: string;
  name: string;
  rating: number;
  position: string;
  team: string;
  avatar?: string;
  wins: number;
  losses: number;
  draws: number;
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
  rating: number;
  formation: string;
  squad: Player[];
  startingLineup: Player[];
  substitutes: Player[];
}

export interface CurrentUser extends Player {
  balance: number;
  email?: string;
  joinedDate?: string;
  totalMatches: number;
  successRate: number;
}

// Match Types
export interface Match {
  id: string;
  player1: Player;
  player2: Player;
  team1: Team;
  team2: Team;
  type: 'exhibition' | '1v1' | 'tournament';
  status: 'upcoming' | 'live' | 'completed';
  scheduledDate?: string;
  score?: {
    team1: number;
    team2: number;
  };
  result?: 'win' | 'loss' | 'draw';
  ratingChange?: number;
  matchDate?: string;
}

export interface MatchResult {
  matchId: string;
  result: 'win' | 'loss' | 'draw';
  score: {
    player: number;
    opponent: number;
  };
  ratingBefore: number;
  ratingChange: number;
  ratingAfter: number;
  opponentName: string;
  matchType: string;
  date: string;
}

// Tournament Types
export interface Tournament {
  id: string;
  name: string;
  description?: string;
  status: 'upcoming' | 'live' | 'completed';
  participants: number;
  maxParticipants: number;
  entryFee: number;
  prizePool: number;
  startDate: string;
  endDate?: string;
  imageUrl?: string;
  joined: boolean;
}

// Chat Types
export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// Notification Types
export type NotificationType =
  | 'match_invitation'
  | 'tournament_reminder'
  | 'opponent_found'
  | 'match_result'
  | 'transfer'
  | 'bonus'
  | 'deposit'
  | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'match_fee' | 'tournament_fee' | 'transfer';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  description: string;
}

// Bonus/Reward Types
export interface Bonus {
  id: string;
  name: string;
  description: string;
  icon?: string;
  amount: number;
  status: 'available' | 'claimed' | 'expired';
  expiryDate?: string;
  progress?: {
    current: number;
    total: number;
  };
}

// Carousel Types
export interface CarouselSlide {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  link?: string;
}

// Matchmaking Types
export interface MatchmakingState {
  status: 'idle' | 'searching' | 'found' | 'lobby' | 'playing' | 'result';
  opponentFound?: Player;
  estimatedWaitTime?: number;
}
