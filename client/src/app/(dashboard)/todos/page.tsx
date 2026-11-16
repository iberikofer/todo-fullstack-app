'use client';

import React, { useState } from 'react';
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

export default function TodosDashboardPage() {
  const { data: user, isLoading: isUserLoading } = useCurrentUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const [currentStatus, setCurrentStatus] = useState<FilterStatus>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  // Fetch todos with current filters
  const { data: todosData, isLoading: isTodosLoading } = useTodos({
    status: currentStatus,
    page: currentPage,
    limit: 10,
    search: searchQuery,
  });

  // Fetch summary counts (unfiltered)
  const { data: allData } = useTodos({ limit: 100 });
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
            <div className="w-9 h-9 rounded-xl bg-[#5E8B7E] text-white flex items-center justify-center font-bold text-base shadow-xs">
              ✓
            </div>
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
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 text-right">
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-[#22333B] leading-tight">
                  {isUserLoading ? 'Loading...' : user?.name || 'User'}
                </p>
                <p className="text-[11px] text-[#22333B]/60">{user?.email || ''}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#5E8B7E]/15 text-[#5E8B7E] flex items-center justify-center font-bold text-xs">
                <UserIcon className="w-4 h-4" />
              </div>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => logout()}
              disabled={isLoggingOut}
              className="text-xs text-[#22333B]/80 hover:text-rose-600 hover:border-rose-200"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
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
            variant="primary"
            size="md"
            onClick={handleOpenCreateModal}
            className="shadow-xs self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>

        {/* Metrics Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
          <div className="rounded-2xl bg-white p-4 border border-[#22333B]/10 shadow-2xs">
            <div className="flex items-center justify-between text-[#22333B]/60 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Total
              </span>
              <ListTodo className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold text-[#22333B]">{counts.ALL}</p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-[#22333B]/10 shadow-2xs">
            <div className="flex items-center justify-between text-[#22333B]/60 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">
                To Do
              </span>
              <div className="w-2 h-2 rounded-full bg-[#22333B]" />
            </div>
            <p className="text-2xl font-bold text-[#22333B]">{counts.TODO}</p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-[#22333B]/10 shadow-2xs">
            <div className="flex items-center justify-between text-[#8A5E35] mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">
                In Progress
              </span>
              <Clock className="w-4 h-4 text-[#C7A17A]" />
            </div>
            <p className="text-2xl font-bold text-[#8A5E35]">{counts.IN_PROGRESS}</p>
          </div>

          <div className="rounded-2xl bg-white p-4 border border-[#22333B]/10 shadow-2xs">
            <div className="flex items-center justify-between text-[#3B6055] mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Completed
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#5E8B7E]" />
            </div>
            <p className="text-2xl font-bold text-[#3B6055]">{counts.DONE}</p>
          </div>
        </div>

        {/* Filters & Search */}
        <TodoFilter
          currentStatus={currentStatus}
          onStatusChange={handleStatusFilterChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          counts={counts}
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
      />
    </div>
  );
}
