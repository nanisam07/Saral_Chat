'use client'

import { forwardRef } from 'react'

export const Input = forwardRef(function Input(
  { label, error, icon, rightIcon, className = '', ...props },
  ref
) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-xs font-medium text-slate-400 uppercase tracking-widest block">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`
            input-field
            ${icon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-12' : ''}
            ${error ? 'border-red-500/50 focus:border-red-500/70' : ''}
            ${className}
          `}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-400 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
})

export default Input
