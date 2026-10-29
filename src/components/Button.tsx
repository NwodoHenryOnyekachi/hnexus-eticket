import { type ReactNode } from "react"
import { Icon } from "./Icon"
import { type IconName } from "../types"

type ButtonProps = {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost"
  icon?: IconName
  onClick?: () => void
  className?: string
}

export function Button({
  children,
  variant = "primary",
  icon,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button className={`button button-${variant} ${className}`} onClick={onClick}>
      {icon && <Icon name={icon} size={18} />}
      <span>{children}</span>
    </button>
  )
}
