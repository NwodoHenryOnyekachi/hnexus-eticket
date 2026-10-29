import { useState } from "react"
import { Icon } from "./Icon"
import { Logo } from "./Logo"
import { Menu } from "./Menu"
import { useUI } from "../context/UIContext"

export function Topbar({ onMenu, onDiscover }: { onMenu: () => void; onDiscover: () => void }) {
  const { toast, go } = useUI()
  const [read, setRead] = useState(false)
  return (
    <header className="topbar">
      <button className="mobile-only logo-btn" onClick={onMenu} aria-label="Open menu">
        <Logo compact />
      </button>
      <div className="search-box">
        <Icon name="search" size={18} />
        <input
          aria-label="Search"
          placeholder="Search events, attendees, orders..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toast(`Searching for "${e.currentTarget.value}"`)
              go("Orders & Attendees")
            }
          }}
        />
        <kbd>⌘ K</kbd>
      </div>
      <div className="top-actions">
        <button className="public-link" onClick={onDiscover}>
          Explore events <Icon name="arrow" size={16} />
        </button>
        <Menu
          trigger={
            <button className="icon-button notification" aria-label="Notifications">
              <Icon name="bell" size={20} />
              {!read && <span />}
            </button>
          }
          items={[
            { label: "New order · Amara Okafor (VIP)", onClick: () => go("Orders & Attendees") },
            { label: "Lagos Summit is 70% sold", onClick: () => go("My Events") },
            { label: "Check-in opens soon", onClick: () => go("Check-In") },
            {
              label: "Mark all as read",
              onClick: () => {
                setRead(true)
                toast("All caught up")
              },
            },
          ]}
        />
        <Menu
          trigger={
            <button className="top-avatar avatar-btn" aria-label="Account menu">
              SO
            </button>
          }
          items={[
            { label: "Profile & settings", onClick: () => go("Settings") },
            { label: "Help & Support", onClick: () => go("Help & Support") },
            { label: "Sign out", onClick: () => toast("Signed out (demo)") },
          ]}
        />
      </div>
    </header>
  )
}
