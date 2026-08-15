import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useUser } from '../context/UserContext';
import { PageHeader } from '../components/ui/Utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { mockTransactions } from '../data/mockData';

export default function DepositPage() {
  const { user, updateBalance, addTransaction } = useUser();
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [depositing, setDepositing] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [transactions] = useState(mockTransactions);

  const predefinedAmounts = [50, 100, 250, 500, 1000];

  const handleSelectAmount = (val: number) => {
    setSelectedAmount(val);
    setAmount(val.toString());
    setCustomAmount('');
  };

  const handleCustomAmount = (val: string) => {
    setCustomAmount(val);
    setAmount(val);
    setSelectedAmount(null);
  };

  const handleDeposit = async () => {
    const depositAmount = parseFloat(amount);
    if (depositAmount <= 0) return;

    setDepositing(true);
    
    // Simulate deposit processing
    setTimeout(() => {
      updateBalance(depositAmount);
      addTransaction({
        id: `tx_${Date.now()}`,
        type: 'deposit',
        amount: depositAmount,
        currency: 'USD',
        status: 'completed',
        date: new Date().toISOString().split('T')[0],
        description: 'Deposit via Card',
      });

      setDepositing(false);
      setShowConfirmModal(false);
      setAmount('');
      setCustomAmount('');
      setSelectedAmount(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Deposit" subtitle="Add funds to your account" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deposit Form */}
        <Card className="lg:col-span-2">
          <div className="space-y-6">
            {/* Current Balance */}
            <div className="bg-linear-to-r from-blue-900 to-blue-800 rounded-lg p-6">
              <p className="text-gray-200 mb-2">Current Balance</p>
              <p className="text-4xl font-bold text-white">${user.balance.toLocaleString()}</p>
            </div>

            {/* Amount Selection */}
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-3">Quick Amount Selection</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {predefinedAmounts.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleSelectAmount(value)}
                    className={`px-4 py-3 rounded-lg font-semibold transition-all ${
                      selectedAmount === value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    }`}
                  >
                    ${value}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <Input
                label="Custom Amount (USD)"
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => handleCustomAmount(e.target.value)}
                min="1"
                step="0.01"
              />
            </div>

            {/* Payment Method */}
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-3">Payment Method</p>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 border-2 border-gray-700 hover:border-gray-600">
                  <input type="radio" name="payment" defaultChecked className="w-4 h-4" />
                  <div>
                    <p className="font-semibold text-white">Credit/Debit Card</p>
                    <p className="text-xs text-gray-400">Visa, Mastercard, Amex</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 border-2 border-gray-700 hover:border-gray-600">
                  <input type="radio" name="payment" className="w-4 h-4" />
                  <div>
                    <p className="font-semibold text-white">PayPal</p>
                    <p className="text-xs text-gray-400">Fast and secure</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Deposit Button */}
            <Button
              fullWidth
              variant="primary"
              size="lg"
              onClick={() => {
                if (amount && parseFloat(amount) > 0) {
                  setShowConfirmModal(true);
                }
              }}
              disabled={!amount || parseFloat(amount) <= 0}
            >
              <Icon icon="solar:plus-circle-bold" className="text-xl" />
              Deposit ${parseFloat(amount) || '0'}
            </Button>

            {/* Info Box */}
            <div className="bg-blue-900 border border-blue-700 rounded-lg p-4">
              <p className="text-sm text-blue-200">
                <Icon icon="solar:info-circle-bold" className="inline mr-2" />
                Your deposit is processed instantly and securely.
              </p>
            </div>
          </div>
        </Card>

        {/* Transaction Summary & History */}
        <Card>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Recent Transactions</h3>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {transactions.slice(0, 10).map((tx) => (
                <div
                  key={tx.id}
                  className="pb-3 border-b border-gray-700 last:border-0"
                >
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-semibold text-white capitalize">{tx.type.replace('_', ' ')}</p>
                    <p className={`font-bold ${tx.type === 'deposit' ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.type === 'deposit' ? '+' : '-'}${tx.amount}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                  <p className="text-xs text-gray-500">{tx.description}</p>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full" size="sm">
              View All Transactions
            </Button>
          </div>
        </Card>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Deposit"
        actionLabel={depositing ? 'Processing...' : 'Confirm Deposit'}
        onAction={handleDeposit}
        actionLoading={depositing}
      >
        <div className="space-y-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Deposit Amount</p>
            <p className="text-3xl font-bold text-white">${parseFloat(amount || '0').toFixed(2)}</p>
          </div>

          <div className="bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">New Balance After Deposit</p>
            <p className="text-3xl font-bold text-green-400">
              ${(user.balance + parseFloat(amount || '0')).toFixed(2)}
            </p>
          </div>

          <p className="text-sm text-gray-300 text-center">
            Your account will be credited immediately after payment is processed.
          </p>
        </div>
      </Modal>
    </div>
  );
}
