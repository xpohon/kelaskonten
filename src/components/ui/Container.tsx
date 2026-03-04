import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeStyles = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export default function Container({
  children,
  className = "",
  size = "xl",
}: ContainerProps) {
  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeStyles[size]} ${className}`}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  padding?: "sm" | "md" | "lg";
}

const paddingStyles = {
  sm: "py-12 sm:py-16",
  md: "py-16 sm:py-24",
  lg: "py-24 sm:py-32",
};

export function Section({
  children,
  className = "",
  id,
  padding = "md",
}: SectionProps) {
  return (
    <section id={id} className={`${paddingStyles[padding]} ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeader({
  badge,
  title,
  description,
  className = "",
  align = "center",
}: {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`${align === "center" ? "text-center" : ""} mb-12 sm:mb-16 ${className}`}
    >
      {badge && (
        <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-neon bg-neon/10 border border-neon/20 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
