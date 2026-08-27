import type { ComponentProps } from "react";
import Link from "next/link";


import {
  buttonStyles,
  type ButtonSize,
  type ButtonVariant,
} from "./Button";

interface ButtonLinkProps
  extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

export default function ButtonLink({
  variant = "primary",
  size = "medium",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonStyles({
        variant,
        size,
        className,
      })}
      {...props}
    />
  );
}