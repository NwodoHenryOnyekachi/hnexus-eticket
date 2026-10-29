import { Button } from "./Button"
import { Icon } from "./Icon"
import { Logo } from "./Logo"
import { Menu } from "./Menu"
import { useUI } from "../context/UIContext"
import { navItems } from "../data/navigation"

export function Sidebar({
  active,
  setActive,
  open,
  onClose,
}: {
  active: string
  setActive: (label: string) => void
  open: boolean
  onClose: () => void
}) {
  const { toast, go } = useUI()
  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="sidebar-head">
        <Logo />
        <button className="icon-button mobile-only" onClick={onClose} aria-label="Close menu">
          <Icon name="close" />
        </button>
      </div>
      <button className="workspace" onClick={() => toast("Workspace: Stephen & Co.")}>
        <span className="workspace-avatar">SA</span>
        <span>
          <strong>Stephen & Co.</strong>
          <small>Organizer workspace</small>
        </span>
        <Icon name="chevron" size={16} />
      </button>
      <Button
        icon="plus"
        className="create-button"
        onClick={() => {
          setActive("Create Event")
          onClose()
        }}
      >
        Create Event
      </Button>
      <nav className="sidebar-nav" aria-label="Main navigation">
        <small className="nav-label">Workspace</small>
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-item ${active === item.label ? "active" : ""}`}
            onClick={() => {
              setActive(item.label)
              onClose()
            }}
          >
            <Icon name={item.icon} size={19} />
            <span>{item.label}</span>
            {item.label === "Orders & Attendees" && <i>12</i>}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button
          className="nav-item mobile-flex"
          onClick={() => {
            go("Explore")
          }}
        >
          <Icon name="search" size={19} />
          <span>Explore events</span>
        </button>
        <button
          className={`nav-item ${active === "Settings" ? "active" : ""}`}
          onClick={() => {
            setActive("Settings")
            onClose()
          }}
        >
          <Icon name="settings" size={19} />
          <span>Settings</span>
        </button>
        <button
          className={`nav-item ${active === "Help & Support" ? "active" : ""}`}
          onClick={() => {
            setActive("Help & Support")
            onClose()
          }}
        >
          <Icon name="help" size={19} />
          <span>Help & Support</span>
        </button>
        <div className="support-card">
          <span className="support-icon">
            <Icon name="help" size={18} />
          </span>
          <strong>Need a hand?</strong>
          <p>Our event experts are here to help.</p>
          <button
            onClick={() => {
              setActive("Help & Support")
              toast("Support request sent. An agent will reply shortly.")
              onClose()
            }}
          >
            Chat with support <Icon name="arrow" size={14} />
          </button>
        </div>
        <Menu
          up
          align="left"
          className="block"
          items={[
            {
              label: "Profile & settings",
              onClick: () => {
                setActive("Settings")
                onClose()
              },
            },
            { label: "Sign out", onClick: () => toast("Signed out (demo)") },
          ]}
          trigger={
            <button className="user-card">
              <div className="avatar">SO</div>
              <span>
                <strong>Stephen Ojo</strong>
                <small>stephen@hnexus.ng</small>
              </span>
              <Icon name="more" />
            </button>
          }
        />
      </div>
    </aside>
  )
}
