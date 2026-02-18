'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
};

export function Modal({ isOpen, onClose, title, description, children, size = 'md', className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [onClose]);

  // Close on backdrop click
  function handleClick(e: React.MouseEvent<HTMLDialogElement>) {
    const rect = dialogRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (
      e.clientX < rect.left || e.clientX > rect.right ||
      e.clientY < rect.top || e.clientY > rect.bottom
    ) {
      onClose();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleClick}
      onCancel={onClose}
      className={cn(
        'w-full m-auto rounded-2xl shadow-xl border border-[--neutro-200] bg-white',
        'backdrop:bg-black/50 backdrop:backdrop-blur-sm',
        'open:animate-[scaleIn_0.2s_ease-out]',
        sizeStyles[size],
        className
      )}
    >
      <div className="p-6">
        {/* Header */}
        {(title || true) && (
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              {title && (
                <h2 className="text-lg font-bold font-display text-[--neutro-950]">{title}</h2>
              )}
              {description && (
                <p className="text-sm text-[--neutro-600] mt-1">{description}</p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Fechar modal"
              className="flex-shrink-0 -mr-2 -mt-2"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </Button>
          </div>
        )}

        {/* Content */}
        {children}
      </div>
    </dialog>
  );
}
