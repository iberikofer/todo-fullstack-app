export default function TodosPlaceholderPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#EFF3F1] text-[#22333B]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-[#22333B]/10 text-center">
        <h1 className="text-xl font-bold text-[#22333B] mb-2">Todos Dashboard</h1>
        <p className="text-xs text-[#22333B]/70 mb-4">
          Scheduled for implementation in Phase 7 (CRUD, Status Filtering, Pagination).
        </p>
        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#C7A17A]/20 text-[#22333B]">
          In Development
        </span>
      </div>
    </main>
  );
}

