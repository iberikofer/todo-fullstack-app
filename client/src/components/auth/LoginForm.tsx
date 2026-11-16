'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useLogin } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const loginFormSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const { mutate: login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-white p-8 shadow-sm border border-[#22333B]/10">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#5E8B7E]/15 text-[#5E8B7E] font-bold text-lg mb-3">
          ✓
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#22333B]">
          Welcome Back
        </h1>
        <p className="text-sm text-[#22333B]/70 mt-1">
          Sign in to access your tasks and productivity dashboard
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-700 flex items-start gap-2">
          <span className="font-semibold text-rose-800">Error:</span>
          <span>{error.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <Input
          label="Email Address"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full mt-2"
          isLoading={isPending}
        >
          Sign In
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-[#22333B]/8 text-center text-xs text-[#22333B]/70">
        Don&apos;t have an account yet?{' '}
        <Link
          href="/register"
          className="font-semibold text-[#5E8B7E] hover:text-[#4D7368] transition-colors underline-offset-2 hover:underline"
        >
          Create one now
        </Link>
      </div>
    </div>
  );
}
