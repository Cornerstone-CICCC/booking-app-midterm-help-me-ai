import type { SelectHTMLAttributes } from "react";

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: string[];
  placeholder?: string;
}

export default function Dropdown({
  label,
  options,
  placeholder = "Select an option",
  id,
  className = "",
  ...selectProps
}: DropdownProps) {
  const selectId = id ?? selectProps.name;
  return (
    <div className="mb-4">
      <label htmlFor={selectId} className="mb-1 block text-base
       font-semibold text-brown">
        {label}
      </label>

      <select
        id={selectId}
        className={`
          w-full
          rounded-md
          border
          border-warm-border
          bg-white
          px-3
          py-2
          text-base
          text-brown
          hover:border-brown
          focus-visible:outline-terra
          focus-visible:ring-2
          focus-visible:ring-terra-light
          focus-visible:ring-offset-0
          ${className}
        `}
        required={selectProps.required}
        {...selectProps}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
