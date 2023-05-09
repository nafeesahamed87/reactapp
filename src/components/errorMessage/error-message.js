import React from "react";

export default function ErrorMessage({ children, className }) {
  return (
    <span
      data-testid="error-message"
      className={`text-danger${className || ""}`}
    >
      {children}
    </span>
  );
}
