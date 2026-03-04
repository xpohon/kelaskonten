interface BadgeProps {
  children: React.ReactNode;
  variant?: "neon" | "purple" | "muted" | "success" | "warning" | "error";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  neon: "bg-neon/10 text-neon border-neon/20",
  purple: "bg-purple/10 text-purple-light border-purple/20",
  muted: "bg-card-bg text-muted border-card-border",
  success: "bg-green-500/10 text-green-400 border-green-500/20",
  warning: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  error: "bg-red-500/10 text-red-400 border-red-500/20",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export default function Badge({
  children,
  variant = "neon",
  size = "sm",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
