"use client";

import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: "default" | "glass" | "neon" | "gradient";
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantStyles = {
  default: "bg-card-bg border border-card-border",
  glass: "glass-card",
  neon: "bg-card-bg neon-border",
  gradient: "bg-gradient-to-br from-card-bg to-surface border border-card-border",
};

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  variant = "default",
  hover = true,
  padding = "md",
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`rounded-2xl ${variantStyles[variant]} ${paddingStyles[padding]} ${
        hover ? "transition-shadow duration-300 hover:shadow-xl hover:shadow-neon/5" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
