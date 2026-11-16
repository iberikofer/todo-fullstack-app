import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-[#EFF3F1] text-[#22333B]">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-[#22333B]/10 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#5E8B7E]/15 text-[#5E8B7E] font-bold text-xl mb-4">
          ✓
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#22333B] mb-2">
          TODO App
        </h1>
        <p className="text-sm text-[#22333B]/70 mb-6">
          Full-Stack Task Management Platform with Next.js 15, Express & PostgreSQL
        </p>

        <div className="rounded-xl bg-[#EFF3F1]/70 p-4 border border-[#22333B]/5 text-xs text-[#22333B]/80 mb-6 space-y-1.5 text-left">
          <div className="flex items-center justify-between">
            <span>Frontend (Next.js):</span>
            <span className="font-semibold text-[#5E8B7E]">● Online (Port 3000)</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Backend (Express):</span>
            <span className="font-semibold text-[#5E8B7E]">● Online (Port 5000)</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Database (PostgreSQL 17):</span>
            <span className="font-semibold text-[#C7A17A]">● Ready for setup (Phase 2)</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5">
          <Link
            href="/todos"
            className="w-full py-2.5 px-4 rounded-xl font-medium text-white bg-[#5E8B7E] hover:bg-[#4d7368] transition-colors shadow-sm text-sm"
          >
            Go to Todos Dashboard
          </Link>
          <Link
            href="/login"
            className="w-full py-2.5 px-4 rounded-xl font-medium text-[#22333B] bg-transparent hover:bg-[#22333B]/5 border border-[#22333B]/15 transition-colors text-sm"
          >
            Sign In / Register
          </Link>
        </div>
      </div>
    </main>
  );
}
