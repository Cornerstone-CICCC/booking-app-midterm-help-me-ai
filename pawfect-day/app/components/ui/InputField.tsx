

import type { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export default function InputField({
  label,
  type = "text",
  placeholder = "",
  error = "",
  required = false,
  id,
  className = "",
  ...inputProps
}: InputFieldProps) {
  const inputId = id ?? inputProps.name;

  return (
    <div className="mb-4">
      <label htmlFor={inputId} className="block text-md font-semibold text-brown mb-1">
        {label} 
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
        className={
            `w-full rounded-md border border-warm-border bg-white
             px-3 py-2 text-md text-brown 
             hover:border-brown
               focus-visible:outline-terra focus-visible:ring-2 focus-visible:ring-terra-light focus-visible:ring-offset-0

             ${
          error ? "border-red-500" : ""
        } ${className}`}
        {...inputProps}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
