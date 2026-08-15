import { createContext, useContext, useState, useCallback } from 'react';
import type { CurrentUser, Transaction } from '../types';
import { mockCurrentUser, mockTransactions } from '../data/mockData';

interface UserContextType {
  user: CurrentUser;
  updateBalance: (amount: number) => void;
  updateRating: (change: number) => void;
  updateProfile: (updates: Partial<CurrentUser>) => void;
  addTransaction: (transaction: Transaction) => void;
  transactions: Transaction[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CurrentUser>(mockCurrentUser);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  const updateBalance = useCallback((amount: number) => {
    setUser((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance + amount),
    }));
  }, []);

  const updateRating = useCallback((change: number) => {
    setUser((prev) => ({
      ...prev,
      rating: Math.max(0, prev.rating + change),
    }));
  }, []);

  const updateProfile = useCallback((updates: Partial<CurrentUser>) => {
    setUser((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const addTransaction = useCallback((transaction: Transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  }, []);

  return (
    <UserContext.Provider value={{ user, updateBalance, updateRating, updateProfile, addTransaction, transactions }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
