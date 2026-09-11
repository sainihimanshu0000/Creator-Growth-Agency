import {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

type Shared = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = Shared &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = Shared &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "btn-primary",
  secondary:
    "border border-line bg-transparent text-ink hover:border-accent hover:text-accent",
  ghost: "text-ink-muted hover:text-accent",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-sm tracking-wide",
  sm: "px-3.5 py-2 text-xs tracking-wide",
};

function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const primaryStyle =
    variant === "primary" ? ({ color: "#0c0e0c", backgroundColor: "#c8f542" } as const) : undefined;

  if ("href" in props && props.href) {
    const { href, style, ...rest } = props;
    const mergedStyle = primaryStyle ? { ...primaryStyle, ...style } : style;
    if (isInternalHref(href)) {
      return (
        <Link href={href} className={classes} style={mergedStyle} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} style={mergedStyle} {...rest}>
        {children}
      </a>
    );
  }

  const { style, ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>;
  const mergedStyle = primaryStyle ? { ...primaryStyle, ...style } : style;

  return (
    <button className={classes} style={mergedStyle} {...buttonProps}>
      {children}
    </button>
  );
}
