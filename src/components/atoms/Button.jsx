import React from "react";

const variantClass = {
  primary: "xp-button primary",
  secondary: "xp-button",
  neutral: "xp-button",
  danger: "xp-button danger",
  warning: "xp-button warning",
  ghost: "xp-button",
};

export default function Button({
  variant = "primary",
  size,
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  const chosen = variantClass[variant] || "xp-button";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${chosen} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
