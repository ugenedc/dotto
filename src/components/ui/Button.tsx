import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: Size;
    fullWidth?: boolean;
  }
>;

const base = "inline-flex items-center justify-center rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-[--color-ring] disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-[--color-primary] text-[--color-primary-foreground] hover:opacity-90",
  secondary: "border border-[--color-border] bg-[--color-card] hover:bg-[--color-muted]",
  ghost: "hover:bg-[--color-muted]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...props}
    >
      {children}
    </button>
  );
}


