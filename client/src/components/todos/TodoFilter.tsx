'use client';

import React from 'react';
import { Search, X } from 'lucide-react';
import { TodoStatus } from '@/types';

export type FilterStatus = 'ALL' | TodoStatus;

export interface TodoFilterProps {
  currentStatus: FilterStatus;
  onStatusChange: (status: FilterStatus) => void;
  searchQuery: string;
  onSearchChange: (search: string) => void;
  counts?: {
    ALL: number;
    TODO: number;
    IN_PROGRESS: number;
    DONE: number;
  };
}

const filterTabs: Array<{ id: FilterStatus; label: string }> = [
  { id: 'ALL', label: 'All Tasks' },
  { id: 'TODO', label: 'To Do' },
  { id: 'IN_PROGRESS', label: 'In Progress' },
  { id: 'DONE', label: 'Completed' },
];

export default function TodoFilter({
  currentStatus,
  onStatusChange,
  searchQuery,
  onSearchChange,
  counts,
}: TodoFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 mb-6">
      {/* Status filter tabs */}
      <div className="inline-flex p-1 rounded-md bg-white border border-[#22333B]/10 shadow-2xs overflow-x-auto shrink-0">
        {filterTabs.map(tab => {
          const isActive = currentStatus === tab.id;
          const count = counts ? counts[tab.id] : undefined;

          // Palette-aligned active styles: To Do is light gray by default (darkens to slate gray on hover), In Progress is warm caramel, Completed/All are sage green
          let activeStyle = 'bg-[#5E8B7E] hover:bg-[#4D7368] text-white shadow-xs';
          if (tab.id === 'TODO') {
            activeStyle =
              'bg-[#E5EAE7] text-[#22333B] border border-[#22333B]/15 hover:bg-[#5A6E75] hover:text-white hover:border-[#5A6E75] shadow-xs';
          } else if (tab.id === 'IN_PROGRESS') {
            activeStyle = 'bg-[#C7A17A] hover:bg-[#B38D66] text-white shadow-xs';
          }

          const inactiveBadgeStyle =
            tab.id === 'IN_PROGRESS'
              ? 'bg-[#C7A17A]/15 text-[#8A5E35]'
              : tab.id === 'TODO'
                ? 'bg-[#5A6E75]/15 text-[#3B4C53]'
                : 'bg-[#22333B]/8 text-[#22333B]/70';

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onStatusChange(tab.id)}
              className={`group px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-150 ease-out cursor-pointer whitespace-nowrap flex items-center gap-1.5 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 select-none ${
                isActive
                  ? activeStyle
                  : 'text-[#22333B]/70 hover:text-[#22333B] hover:bg-[#EFF3F1]/80'
              }`}
            >
              <span>{tab.label}</span>
              {count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors ${
                    isActive
                      ? tab.id === 'TODO'
                        ? 'bg-[#22333B]/12 text-[#22333B] group-hover:bg-white/25 group-hover:text-white'
                        : 'bg-white/25 text-white'
                      : inactiveBadgeStyle
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search Input - stretched to fill width between right edge and left filter tabs */}
      <div className="relative w-full sm:flex-1 min-w-0">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#22333B]/40 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-8 py-2 rounded-md bg-white text-[#22333B] placeholder:text-[#22333B]/40 text-xs font-medium border border-[#22333B]/12 hover:border-[#22333B]/25 focus:border-[#5E8B7E] focus:ring-2 focus:ring-[#5E8B7E]/15 transition-all outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-[#22333B]/40 hover:text-[#22333B] hover:scale-110 active:scale-90 transition-transform cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
