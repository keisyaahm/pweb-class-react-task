import React from "react";

export default function Input({
  type = "text",
  id,
  name,
  value,
  onChange,
  placeholder = "",
  hasError = false,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`xp-input ${className}`}
      {...props}
    />
  );
}
