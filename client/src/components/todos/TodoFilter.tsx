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
      <div className="inline-flex p-1 rounded-xl bg-white border border-[#22333B]/10 shadow-2xs overflow-x-auto">
        {filterTabs.map(tab => {
          const isActive = currentStatus === tab.id;
          const count = counts ? counts[tab.id] : undefined;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onStatusChange(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#5E8B7E] text-white shadow-xs'
                  : 'text-[#22333B]/70 hover:text-[#22333B] hover:bg-[#EFF3F1]/80'
              }`}
            >
              <span>{tab.label}</span>
              {count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? 'bg-white/25 text-white'
                      : 'bg-[#22333B]/8 text-[#22333B]/70'
                  }`}
                >
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="relative w-full sm:w-64">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#22333B]/40 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-8 py-2 rounded-xl bg-white text-[#22333B] placeholder:text-[#22333B]/40 text-xs font-medium border border-[#22333B]/12 hover:border-[#22333B]/25 focus:border-[#5E8B7E] focus:ring-2 focus:ring-[#5E8B7E]/15 transition-all outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-[#22333B]/40 hover:text-[#22333B] cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
