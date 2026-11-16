import { Metadata } from 'next';
import LoginForm from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Sign In | TODO App',
  description: 'Sign in to access your task dashboard',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 bg-[#EFF3F1]">
      <LoginForm />
    </main>
  );
}
