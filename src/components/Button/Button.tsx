import React from 'react'

interface ButtonProps {
    color: string;
    onClick: () => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ color, onClick, children }) => {
  return (
    <button className={`border border-${color}-500 text-${color}-500 py-1 px-2`} onClick={onClick}>{children}</button>
  )
}

export default Button