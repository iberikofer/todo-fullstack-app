'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRegister } from '@/hooks/useAuth';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const registerFormSchema = z
  .object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    email: z.string().trim().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const { mutate: registerUser, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-white p-8 shadow-sm border border-[#22333B]/10">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#5E8B7E]/15 text-[#5E8B7E] font-bold text-lg mb-3">
          ✓
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#22333B]">
          Create Account
        </h1>
        <p className="text-sm text-[#22333B]/70 mt-1">
          Join TODO App to organize, prioritize, and track your work
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
          label="Full Name"
          type="text"
          autoComplete="name"
          placeholder="Alex Smith"
          error={errors.name?.message}
          {...register('name')}
        />

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
          autoComplete="new-password"
          placeholder="At least 6 characters"
          error={errors.password?.message}
          {...register('password')}
        />

        <Input
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full mt-2"
          isLoading={isPending}
        >
          Create Account
        </Button>
      </form>

      <div className="mt-6 pt-5 border-t border-[#22333B]/8 text-center text-xs text-[#22333B]/70">
        Already have an account?{' '}
        <Link
          href="/login"
          className="font-semibold text-[#5E8B7E] hover:text-[#4D7368] transition-colors underline-offset-2 hover:underline"
        >
          Sign in here
        </Link>
      </div>
    </div>
  );
}
