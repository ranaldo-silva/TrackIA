import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode; // propriedade children
}

function Button({ label, onClick, className, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`font-bold rounded ${className}`} 
    >
      {children || label} {/* Renderiza children se presente, senão renderiza label */}
    </button>
  );
}

export default Button;