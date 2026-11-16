import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-[#22333B]/85 tracking-wide uppercase"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full px-3.5 py-2.5 rounded-xl bg-white text-[#22333B] placeholder:text-[#22333B]/35 border text-sm transition-all duration-150 outline-none
            ${
              error
                ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200/50'
                : 'border-[#22333B]/15 hover:border-[#22333B]/30 focus:border-[#5E8B7E] focus:ring-2 focus:ring-[#5E8B7E]/20'
            }
            ${className}`}
          {...props}
        />
        {error ? (
          <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-0.5">
            <span aria-hidden="true">⚠</span>
            {error}
          </p>
        ) : helperText ? (
          <p className="text-xs text-[#22333B]/60 mt-0.5">{helperText}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;
