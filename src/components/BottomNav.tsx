import { Icon } from "./Icon"
import { type IconName } from "../types"

export function BottomNav({
  active,
  go,
  onMore,
}: {
  active: string
  go: (p: string) => void
  onMore: () => void
}) {
  const tabs: { label: string; short: string; icon: IconName; fab?: boolean }[] = [
    { label: "Overview", short: "Home", icon: "home" },
    { label: "My Events", short: "Events", icon: "events" },
    { label: "Create Event", short: "Create", icon: "plus", fab: true },
    { label: "Check-In", short: "Check-in", icon: "scan" },
  ]
  return (
    <nav className="bottom-nav" aria-label="Quick navigation">
      {tabs.map((t) => (
        <button
          key={t.label}
          className={`tab ${active === t.label ? "active" : ""} ${t.fab ? "fab" : ""}`}
          aria-current={active === t.label ? "page" : undefined}
          onClick={() => go(t.label)}
        >
          <span className="tab-icon">
            <Icon name={t.icon} size={t.fab ? 22 : 21} />
          </span>
          <span>{t.short}</span>
        </button>
      ))}
      <button className="tab" onClick={onMore} aria-label="More menu">
        <span className="tab-icon">
          <Icon name="menu" size={21} />
        </span>
        <span>More</span>
      </button>
    </nav>
  )
}
