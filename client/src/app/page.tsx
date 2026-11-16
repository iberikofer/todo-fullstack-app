import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Database,
  Layers,
} from 'lucide-react';
import BrandLogo from '@/components/ui/BrandLogo';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#EFF3F1] text-[#22333B] flex flex-col justify-between">
      {/* Top Header */}
      <header className="w-full border-b border-[#22333B]/8 bg-white/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BrandLogo className="w-8 h-8 rounded-md shadow-xs" />
            <span className="font-bold text-base tracking-tight text-[#22333B]">
              TODO App
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-3.5 py-1.5 text-xs font-semibold text-[#22333B]/80 hover:text-[#22333B] rounded-lg hover:bg-[#22333B]/5 transition-all duration-150 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#5E8B7E] hover:bg-[#4D7368] rounded-lg transition-all duration-150 hover:-translate-y-0.5 active:scale-95 shadow-xs hover:shadow-sm cursor-pointer"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#22333B] max-w-2xl leading-[1.15]">
          Organize your tasks with <span className="text-[#5E8B7E]">calm</span>,{' '}
          <span className="text-[#C7A17A]">tactile</span> clarity.
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#22333B]/70 max-w-xl leading-relaxed">
          A full-stack task management platform built with Next.js 15, Express.js,
          Prisma ORM, and PostgreSQL. Designed without distractions or neon glow.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/todos"
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-[#5E8B7E] hover:bg-[#4D7368] text-white font-semibold text-sm transition-all duration-150 shadow-xs hover:shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 cursor-pointer"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto px-6 py-3 rounded-md bg-white hover:bg-[#EFF3F1] text-[#22333B] hover:text-[#8A5E35] hover:border-[#C7A17A]/40 font-semibold text-sm transition-all duration-150 border border-[#22333B]/15 shadow-xs hover:shadow-sm flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 cursor-pointer"
          >
            <span>Create Account</span>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 w-full text-left">
          <div className="rounded-lg bg-white p-6 border border-[#22333B]/10 shadow-xs hover:border-[#5E8B7E]/40 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div className="w-10 h-10 rounded-md bg-[#5E8B7E]/15 text-[#5E8B7E] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#22333B]">
              CRUD & Status Flow
            </h3>
            <p className="mt-1.5 text-xs text-[#22333B]/70 leading-relaxed">
              Create, update, and delete tasks with 1-click status cycling between To
              Do, In Progress, and Completed.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 border border-[#C7A17A]/30 shadow-xs hover:border-[#C7A17A]/60 hover:shadow-md hover:-translate-y-1 transition-all duration-200 bg-linear-to-b from-white to-[#C7A17A]/5">
            <div className="w-10 h-10 rounded-md bg-[#C7A17A]/20 text-[#8A5E35] flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-[#C7A17A]" />
            </div>
            <h3 className="text-base font-bold text-[#22333B]">
              Filtering & Pagination
            </h3>
            <p className="mt-1.5 text-xs text-[#22333B]/70 leading-relaxed">
              Instant keyword search and status tab filtering powered by TanStack
              Query v5 with optimistic client caching.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 border border-[#22333B]/10 shadow-xs hover:border-[#22333B]/30 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
            <div className="w-10 h-10 rounded-md bg-[#22333B]/10 text-[#22333B] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-[#22333B]" />
            </div>
            <h3 className="text-base font-bold text-[#22333B]">Secure JWT Auth</h3>
            <p className="mt-1.5 text-xs text-[#22333B]/70 leading-relaxed">
              HttpOnly session cookies protecting user tokens from XSS attacks,
              accompanied by Edge route protection middleware.
            </p>
          </div>
        </div>

        {/* Tech Stack Banner */}
        <div className="mt-12 rounded-lg bg-white/80 border border-[#22333B]/8 p-4 sm:p-5 w-full flex flex-wrap items-center justify-around gap-4 text-xs font-medium text-[#22333B]/70">
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#5E8B7E]" />
            <span>Next.js 15 App Router</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C7A17A]" />
            <span>TanStack Query v5</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Database className="w-4 h-4 text-[#5E8B7E]" />
            <span>PostgreSQL 17 + Prisma</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#22333B]" />
            <span>Express.js + Zod</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#22333B]/8 bg-white/50 py-6 text-center text-xs text-[#22333B]/50">
        <p>TODO App • Built with modern engineering standards & clean craft</p>
      </footer>
    </div>
  );
}
