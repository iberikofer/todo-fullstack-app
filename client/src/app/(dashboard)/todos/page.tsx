'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Plus,
  LogOut,
  User as UserIcon,
  CheckCircle2,
  Clock,
  ListTodo,
} from 'lucide-react';
import { Todo } from '@/types';
import { useCurrentUser, useLogout } from '@/hooks/useAuth';
import { useTodos } from '@/hooks/useTodos';
import TodoFilter, { FilterStatus } from '@/components/todos/TodoFilter';
import TodoList from '@/components/todos/TodoList';
import TodoFormModal from '@/components/todos/TodoForm';
import Button from '@/components/ui/Button';
import BrandLogo from '@/components/ui/BrandLogo';

function getInitialFilterStatus(): FilterStatus {
  if (typeof window === 'undefined') return 'ALL';
  try {
    const params = new URLSearchParams(window.location.search);
    const urlStatus = params.get('status')?.toUpperCase();
    if (urlStatus && ['ALL', 'TODO', 'IN_PROGRESS', 'DONE'].includes(urlStatus)) {
      return urlStatus as FilterStatus;
    }

    const saved = localStorage.getItem('todo_app_filter_status');
    if (saved && ['ALL', 'TODO', 'IN_PROGRESS', 'DONE'].includes(saved)) {
      return saved as FilterStatus;
    }
  } catch {
    // Ignore
  }
  return 'ALL';
}

export default function TodosDashboardPage() {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const [currentStatus, setCurrentStatus] = useState<FilterStatus>(
    getInitialFilterStatus,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUserMenuOpen]);

  // Fetch todos with current filters
  const { data: todosData, isLoading: isTodosLoading } = useTodos({
    status: currentStatus,
    page: currentPage,
    limit: 10,
    search: searchQuery,
  });

  // Fetch summary counts (unfiltered)
  const { data: allData, isLoading: isCountsLoading } = useTodos({ limit: 100 });
  const allTodos = allData?.data || [];

  const counts = {
    ALL: allTodos.length,
    TODO: allTodos.filter(t => t.status === 'TODO').length,
    IN_PROGRESS: allTodos.filter(t => t.status === 'IN_PROGRESS').length,
    DONE: allTodos.filter(t => t.status === 'DONE').length,
  };

  const handleOpenCreateModal = () => {
    setTodoToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (todo: Todo) => {
    setTodoToEdit(todo);
    setIsModalOpen(true);
  };

  const handleStatusFilterChange = (status: FilterStatus) => {
    setCurrentStatus(status);
    setCurrentPage(1);
    try {
      localStorage.setItem('todo_app_filter_status', status);
      const url = new URL(window.location.href);
      if (status === 'ALL') {
        url.searchParams.delete('status');
      } else {
        url.searchParams.set('status', status);
      }
      window.history.replaceState(
        null,
        '',
        url.pathname + (url.search ? url.search : ''),
      );
    } catch {
      // Ignore
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const activeTabLabels: Record<FilterStatus, string> = {
    ALL: 'All Tasks',
    TODO: 'To Do',
    IN_PROGRESS: 'In Progress',
    DONE: 'Completed',
  };

  return (
    <div className="min-h-screen bg-[#EFF3F1] text-[#22333B]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#22333B]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo className="w-9 h-9 rounded-md shadow-xs" />
            <div>
              <h1 className="text-base font-bold text-[#22333B] tracking-tight leading-none">
                TODO App
              </h1>
              <p className="text-[11px] text-[#22333B]/60 font-medium">
                Task Management Platform
              </p>
            </div>
          </div>

          {/* User Profile & Logout */}
          <div
            className="relative flex items-center gap-3 sm:gap-4"
            ref={userMenuRef}
          >
            {/* Desktop: Static Name & Email (Selectable & Copyable) */}
            <div className="hidden sm:block text-right select-text cursor-text">
              {isUserLoading ? (
                <div className="flex flex-col items-end gap-1.5 py-0.5">
                  <div className="h-3 w-20 rounded bg-[#22333B]/15 animate-pulse" />
                  <div className="h-2.5 w-28 rounded bg-[#22333B]/10 animate-pulse" />
                </div>
              ) : (
                <>
                  <p className="text-xs font-semibold text-[#22333B] leading-tight select-text">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-[11px] text-[#22333B]/60 select-text">
                    {user?.email || ''}
                  </p>
                </>
              )}
            </div>

            {/* Desktop Avatar Circle (Static SVG User icon) */}
            <div className="hidden sm:flex w-9 h-9 rounded-full bg-[#5E8B7E]/15 text-[#5E8B7E] border border-[#5E8B7E]/25 items-center justify-center font-bold text-sm shadow-xs select-none">
              <UserIcon className="w-4 h-4 text-[#5E8B7E]" />
            </div>

            {/* Mobile Avatar Button (Clickable, toggles dropdown on mobile only) */}
            <button
              type="button"
              onClick={() => setIsUserMenuOpen(prev => !prev)}
              className="sm:hidden w-9 h-9 rounded-full bg-[#5E8B7E]/15 text-[#5E8B7E] border border-[#5E8B7E]/25 flex items-center justify-center font-bold text-sm shadow-xs active:scale-90 transition-transform duration-150 cursor-pointer focus:outline-none"
              aria-expanded={isUserMenuOpen}
              aria-label="Toggle user profile menu"
            >
              <UserIcon className="w-4 h-4 text-[#5E8B7E]" />
            </button>

            {/* Desktop Logout Button (Strictly hidden on mobile) */}
            <div className="hidden sm:block">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => logout()}
                disabled={isLoggingOut}
                isLoading={isLoggingOut}
                className="text-xs text-[#22333B]/80 hover:text-rose-600 hover:border-rose-200"
                title="Sign Out"
              >
                {!isLoggingOut && <LogOut className="w-3.5 h-3.5" />}
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              </Button>
            </div>

            {/* Mobile Dropdown Popover */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-12 z-50 w-60 rounded-lg bg-white border border-[#22333B]/10 shadow-lg p-3.5 sm:hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#5E8B7E]/15 text-[#5E8B7E] border border-[#5E8B7E]/25 flex items-center justify-center font-bold text-xs shrink-0 select-none">
                    <UserIcon className="w-4 h-4 text-[#5E8B7E]" />
                  </div>
                  <div className="min-w-0 flex-1 select-text cursor-text">
                    {isUserLoading ? (
                      <div className="space-y-1.5 py-0.5">
                        <div className="h-3 w-20 rounded bg-[#22333B]/15 animate-pulse" />
                        <div className="h-2.5 w-28 rounded bg-[#22333B]/10 animate-pulse" />
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-bold text-[#22333B] truncate select-text">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-[11px] text-[#22333B]/60 truncate mt-0.5 select-text">
                          {user?.email || ''}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <div className="border-t border-[#22333B]/8 my-2" />
                <button
                  type="button"
                  onClick={() => {
                    setIsUserMenuOpen(false);
                    logout();
                  }}
                  disabled={isLoggingOut}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all duration-150 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Action Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#22333B]">
              Workspace Tasks
            </h2>
            <p className="text-sm text-[#22333B]/70 mt-1">
              Organize, filter, and complete your tasks efficiently
            </p>
          </div>

          <Button
            type="button"
            variant="accent"
            size="md"
            onClick={handleOpenCreateModal}
            className="shadow-xs hover:shadow-md self-start sm:self-auto font-semibold"
          >
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>

        {/* Metrics Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
          {/* Total */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleStatusFilterChange('ALL')}
            onKeyDown={e => e.key === 'Enter' && handleStatusFilterChange('ALL')}
            className={`group relative overflow-hidden rounded-lg bg-white p-4 border transition-all duration-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 cursor-pointer focus:outline-none ${
              currentStatus === 'ALL'
                ? 'border-[#22333B]/30 ring-1 ring-[#22333B]/10'
                : 'border-[#22333B]/10 hover:border-[#22333B]/25'
            }`}
          >
            <div className="flex items-center justify-between text-[#22333B]/60 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Total
              </span>
              <ListTodo className="w-4 h-4 text-[#22333B]/60 group-hover:text-[#22333B] transition-colors" />
            </div>
            {isCountsLoading ? (
              <div className="h-8 flex items-center">
                <span className="inline-block h-6 w-7 rounded-md bg-[#22333B]/12 animate-pulse" />
              </div>
            ) : (
              <p className="text-2xl font-bold text-[#22333B] animate-in fade-in duration-200">
                {counts.ALL}
              </p>
            )}
          </div>

          {/* To Do */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleStatusFilterChange('TODO')}
            onKeyDown={e => e.key === 'Enter' && handleStatusFilterChange('TODO')}
            className={`group relative overflow-hidden rounded-lg p-4 border transition-all duration-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 cursor-pointer focus:outline-none metric-shimmer-todo ${
              currentStatus === 'TODO'
                ? 'border-[#22333B]/40 ring-1 ring-[#22333B]/15'
                : 'border-[#22333B]/20 hover:border-[#22333B]/45'
            }`}
          >
            {/* Ambient hover tint */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-transparent via-transparent to-[#22333B]/10" />
            {/* Unidirectional white light sheen sweep on hover (never rewinds on mouse leave) */}
            <div className="pointer-events-none absolute inset-0 translate-x-[-150%] skew-x-[-20deg] group-hover:translate-x-[250%] transition-none group-hover:transition-transform group-hover:duration-1000 group-hover:ease-out opacity-0 group-hover:opacity-100 bg-linear-to-r from-transparent via-white/50 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-center justify-between text-[#22333B]/75 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  To Do
                </span>
                <div className="w-2 h-2 rounded-full bg-[#22333B] group-hover:scale-125 transition-transform duration-200" />
              </div>
              {isCountsLoading ? (
                <div className="h-8 flex items-center">
                  <span className="inline-block h-6 w-7 rounded-md bg-[#22333B]/12 animate-pulse" />
                </div>
              ) : (
                <p className="text-2xl font-bold text-[#22333B] animate-in fade-in duration-200">
                  {counts.TODO}
                </p>
              )}
            </div>
          </div>

          {/* In Progress */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleStatusFilterChange('IN_PROGRESS')}
            onKeyDown={e =>
              e.key === 'Enter' && handleStatusFilterChange('IN_PROGRESS')
            }
            className={`group relative overflow-hidden rounded-lg p-4 border transition-all duration-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 cursor-pointer focus:outline-none metric-shimmer-progress ${
              currentStatus === 'IN_PROGRESS'
                ? 'border-[#C7A17A]/60 ring-1 ring-[#C7A17A]/25'
                : 'border-[#C7A17A]/40 hover:border-[#C7A17A]/70'
            }`}
          >
            {/* Ambient hover tint */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-transparent via-transparent to-[#C7A17A]/15" />
            {/* Unidirectional white light sheen sweep on hover (never rewinds on mouse leave) */}
            <div className="pointer-events-none absolute inset-0 translate-x-[-150%] skew-x-[-20deg] group-hover:translate-x-[250%] transition-none group-hover:transition-transform group-hover:duration-1000 group-hover:ease-out opacity-0 group-hover:opacity-100 bg-linear-to-r from-transparent via-white/50 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-center justify-between text-[#8A5E35] mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  In Progress
                </span>
                <Clock className="w-4 h-4 text-[#C7A17A] group-hover:rotate-45 transition-transform duration-300" />
              </div>
              {isCountsLoading ? (
                <div className="h-8 flex items-center">
                  <span className="inline-block h-6 w-7 rounded-md bg-[#C7A17A]/20 animate-pulse" />
                </div>
              ) : (
                <p className="text-2xl font-bold text-[#8A5E35] animate-in fade-in duration-200">
                  {counts.IN_PROGRESS}
                </p>
              )}
            </div>
          </div>

          {/* Completed */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleStatusFilterChange('DONE')}
            onKeyDown={e => e.key === 'Enter' && handleStatusFilterChange('DONE')}
            className={`group relative overflow-hidden rounded-lg p-4 border transition-all duration-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 cursor-pointer focus:outline-none metric-shimmer-completed ${
              currentStatus === 'DONE'
                ? 'border-[#5E8B7E]/60 ring-1 ring-[#5E8B7E]/25'
                : 'border-[#5E8B7E]/40 hover:border-[#5E8B7E]/70'
            }`}
          >
            {/* Ambient hover tint */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-br from-transparent via-transparent to-[#5E8B7E]/15" />
            {/* Unidirectional white light sheen sweep on hover (never rewinds on mouse leave) */}
            <div className="pointer-events-none absolute inset-0 translate-x-[-150%] skew-x-[-20deg] group-hover:translate-x-[250%] transition-none group-hover:transition-transform group-hover:duration-1000 group-hover:ease-out opacity-0 group-hover:opacity-100 bg-linear-to-r from-transparent via-white/50 to-transparent" />

            <div className="relative z-10">
              <div className="flex items-center justify-between text-[#2D5449] mb-1">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Completed
                </span>
                <CheckCircle2 className="w-4 h-4 text-[#5E8B7E] group-hover:scale-110 transition-transform duration-200" />
              </div>
              {isCountsLoading ? (
                <div className="h-8 flex items-center">
                  <span className="inline-block h-6 w-7 rounded-md bg-[#5E8B7E]/20 animate-pulse" />
                </div>
              ) : (
                <p className="text-2xl font-bold text-[#2D5449] animate-in fade-in duration-200">
                  {counts.DONE}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <TodoFilter
          currentStatus={currentStatus}
          onStatusChange={handleStatusFilterChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          counts={isCountsLoading ? undefined : counts}
        />

        {/* Task List */}
        <TodoList
          todos={todosData?.data}
          isLoading={isTodosLoading}
          total={todosData?.total}
          page={currentPage}
          totalPages={todosData?.totalPages}
          onPageChange={setCurrentPage}
          onEdit={handleOpenEditModal}
          onAddNew={handleOpenCreateModal}
          currentFilterLabel={
            currentStatus !== 'ALL' ? activeTabLabels[currentStatus] : undefined
          }
        />
      </main>

      {/* Create / Edit Modal Dialog */}
      <TodoFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        todoToEdit={todoToEdit}
        onTaskCreated={() => {
          if (currentStatus === 'DONE' || currentStatus === 'IN_PROGRESS') {
            handleStatusFilterChange('ALL');
          }
        }}
      />
    </div>
  );
}
