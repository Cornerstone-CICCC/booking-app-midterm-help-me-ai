import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger";

export type ButtonSize =
  | "small"
  | "medium"
  | "large";


type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

export function buttonStyles({
  variant = "primary",
  size = "medium",
  className = "",
}: ButtonStyleOptions = {}) {
  const baseClasses = `
    inline-flex
    min-h-11
    items-center
    justify-center
    gap-2
    rounded-full
    font-semibold
    transition-colors
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-terra
    focus-visible:ring-offset-2
    disabled:cursor-not-allowed
    disabled:opacity-50
  `;

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-terra text-cream hover:bg-terra-dark",

    secondary:
      "border border-terra bg-transparent text-terra hover:bg-terra hover:text-cream",

    danger:
      "bg-red-700 text-white hover:bg-red-800",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  return `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `;
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export default function Button({
  variant = "primary",
  size = "medium",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({
        variant,
        size,
        className,
      })}
      {...props}
    />
  );
}