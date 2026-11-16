'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Trash2, X } from 'lucide-react';
import Button from '@/components/ui/Button';

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isDeleting?: boolean;
}

const emptySubscribe = () => () => {};

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  isDeleting = false,
}: DeleteConfirmModalProps) {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isDeleting) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isDeleting]);

  if (!isOpen || !isClient) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#22333B]/30 backdrop-blur-[2px] transition-opacity animate-in fade-in"
      onClick={e => {
        if (e.target === e.currentTarget && !isDeleting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl border border-[#22333B]/10 text-[#22333B] relative animate-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isDeleting}
          className="absolute right-4 top-4 p-1.5 rounded-md text-[#22333B]/50 hover:text-[#22333B] hover:bg-[#22333B]/5 transition-colors cursor-pointer disabled:opacity-50"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center shrink-0">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h3
              id="delete-modal-title"
              className="text-base font-bold text-[#22333B] tracking-tight"
            >
              Delete Task
            </h3>
            <p className="text-xs text-[#22333B]/70 mt-0.5">
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
          </div>
        </div>

        {/* Task Title Preview */}
        <div className="my-4 px-3.5 py-2.5 rounded-md bg-[#EFF3F1]/80 border border-[#22333B]/8 text-xs font-semibold text-[#22333B] truncate">
          &ldquo;{title}&rdquo;
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#22333B]/8">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2.5 rounded-md text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all shadow-xs cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isDeleting ? 'Deleting...' : 'Delete Task'}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
