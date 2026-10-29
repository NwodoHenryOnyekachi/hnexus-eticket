import { useState } from "react"
import { Button } from "../components/Button"
import { EventCard } from "../components/EventCard"
import { Icon } from "../components/Icon"
import { Menu } from "../components/Menu"
import { useUI } from "../context/UIContext"

export function MyEventsPage({ toast }: { toast: (value: string) => void }) {
  const { list, go } = useUI()
  const [q, setQ] = useState("")
  const [status, setStatus] = useState("All statuses")
  const [month, setMonth] = useState("Any date")
  const [asList, setAsList] = useState(false)
  const shown = list.filter(
    (e) =>
      e.title.toLowerCase().includes(q.toLowerCase()) &&
      (status === "All statuses" || e.status === status) &&
      (month === "Any date" || e.date.includes(month)),
  )
  return (
    <section className="page-stack">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">Event management</p>
          <h1>My Events</h1>
          <p>Create, publish, and monitor every event from one place.</p>
        </div>
        <Button icon="plus" onClick={() => go("Create Event")}>
          Create Event
        </Button>
      </div>
      <div className="filter-bar">
        <div className="search-box">
          <Icon name="search" size={18} />
          <input
            placeholder="Search events..."
            aria-label="Search events"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <Menu
          align="left"
          trigger={<Button variant="secondary">{status}</Button>}
          items={["All statuses", "Published", "Selling fast", "Draft"].map((v) => ({
            label: v,
            on: v === status,
            onClick: () => setStatus(v),
          }))}
        />
        <Menu
          trigger={
            <Button variant="secondary" icon="calendar">
              {month}
            </Button>
          }
          items={["Any date", "May", "June", "July"].map((v) => ({
            label: v,
            on: v === month,
            onClick: () => setMonth(v),
          }))}
        />
        <button
          className="icon-button"
          aria-label="Toggle grid or list view"
          onClick={() => {
            setAsList((v) => !v)
            toast(asList ? "Grid view" : "List view")
          }}
        >
          <Icon name="grid" />
        </button>
      </div>
      <div className={`event-row-grid full-events ${asList ? "as-list" : ""}`}>
        {shown.map((event) => (
          <EventCard key={event.title} event={event} />
        ))}
      </div>
      {shown.length === 0 && <p className="empty">No events match your filters.</p>}
    </section>
  )
}
