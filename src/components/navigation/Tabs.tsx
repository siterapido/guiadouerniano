'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  children?: (activeTab: string) => React.ReactNode;
  variant?: 'line' | 'pill';
}

export function Tabs({ tabs, defaultTab, activeTab: controlledTab, onChange, className, children, variant = 'line' }: TabsProps) {
  const [internalTab, setInternalTab] = useState(defaultTab ?? tabs[0]?.id ?? '');
  const active = controlledTab ?? internalTab;

  function handleChange(id: string) {
    if (!controlledTab) setInternalTab(id);
    onChange?.(id);
  }

  return (
    <div className={cn('w-full', className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={cn(
          'flex',
          variant === 'line'
            ? 'border-b border-[--neutro-200]'
            : 'bg-[--neutro-100] rounded-xl p-1 gap-1'
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            id={`tab-${tab.id}`}
            aria-controls={`panel-${tab.id}`}
            aria-selected={active === tab.id}
            disabled={tab.disabled}
            onClick={() => handleChange(tab.id)}
            className={cn(
              'flex items-center gap-2 text-sm font-medium transition-all duration-150 min-h-[44px]',
              'focus:outline-none focus-visible:ring-2 focus-visible:ring-[--azul-correnteza]',
              variant === 'line'
                ? cn(
                    'px-4 pb-3 pt-2 border-b-2 -mb-px',
                    active === tab.id
                      ? 'border-[--azul-correnteza] text-[--azul-correnteza]'
                      : 'border-transparent text-[--neutro-600] hover:text-[--neutro-900]'
                  )
                : cn(
                    'flex-1 justify-center px-3 rounded-lg',
                    active === tab.id
                      ? 'bg-white text-[--azul-correnteza] shadow-sm'
                      : 'text-[--neutro-600] hover:text-[--neutro-900]'
                  ),
              tab.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {children && (
        <div
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          tabIndex={0}
          className="focus:outline-none"
        >
          {children(active)}
        </div>
      )}
    </div>
  );
}
