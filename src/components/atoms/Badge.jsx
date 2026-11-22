import React from "react";

const badgeClass = {
  primary: "xp-badge info",
  success: "xp-badge success",
  warning: "xp-badge warning",
  danger: "xp-badge danger",
  slate: "xp-badge",
  purple: "xp-badge",
};

export default function Badge({
  children,
  variant = "primary",
  size,
  className = "",
}) {
  const chosen = badgeClass[variant] || "xp-badge";
  return (
    <span className={`${chosen} ${className}`}>
      {children}
    </span>
  );
}
