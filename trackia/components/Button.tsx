import React from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode; // Adicione a propriedade children
}

function Button({ label, onClick, className, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`font-bold rounded ${className}`} // Remova text-white e py-2 px-4, pois eles podem ser definidos no componente pai
    >
      {children || label} {/* Renderiza children se presente, senão renderiza label */}
    </button>
  );
}

export default Button;