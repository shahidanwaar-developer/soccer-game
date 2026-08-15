import React from 'react';
import { Button } from './Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  actionLoading?: boolean;
  actionVariant?: 'primary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  actionLabel,
  onAction,
  actionLoading = false,
  actionVariant = 'primary',
  size = 'md',
}: ModalProps) {
  if (!isOpen) return null;

  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className={`relative bg-gray-800 rounded-xl shadow-2xl border border-gray-700 ${maxWidthClass} w-full mx-4`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
        {(actionLabel || onAction) && (
          <div className="flex gap-3 p-6 border-t border-gray-700">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            {actionLabel && (
              <Button
                variant={actionVariant}
                onClick={onAction}
                loading={actionLoading}
                className="flex-1"
              >
                {actionLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
