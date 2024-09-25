import React from 'react'

interface ButtonProps {
    bcolor: string;
    hovereffect: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ bcolor, hovereffect, onClick = () => {}, children }) => {
  return (
    <button className={`border border-${bcolor}-500 bg-${bcolor}-500 font-semibold text-white py-1 px-2 rounded ${hovereffect ? "hover:scale-105 transform" : ""}`} onClick={onClick}>{children}</button>
  )
}

export default Button