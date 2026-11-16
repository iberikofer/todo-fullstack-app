import { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Register | TODO App',
  description: 'Create an account to start managing tasks',
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 bg-[#EFF3F1]">
      <RegisterForm />
    </main>
  );
}
