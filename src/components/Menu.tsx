import { type ReactNode, useEffect, useRef, useState } from "react"

export function Menu({
  trigger,
  items,
  up = false,
  align = "right",
  className = "",
}: {
  trigger: ReactNode
  items: { label: string; onClick: () => void; on?: boolean }[]
  up?: boolean
  align?: "left" | "right"
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!open) return
    const down = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", down)
    document.addEventListener("keydown", key)
    return () => {
      document.removeEventListener("mousedown", down)
      document.removeEventListener("keydown", key)
    }
  }, [open])
  return (
    <span className={`menu ${className}`} ref={ref}>
      <span className="menu-trigger" onClick={() => setOpen((o) => !o)}>
        {trigger}
      </span>
      {open && (
        <div className={`menu-pop ${up ? "up" : ""} ${align}`} role="menu">
          {items.map((it) => (
            <button
              key={it.label}
              role="menuitem"
              className={`mi ${it.on ? "on" : ""}`}
              onClick={() => {
                setOpen(false)
                it.onClick()
              }}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </span>
  )
}
