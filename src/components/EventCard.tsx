import { Icon } from "./Icon"
import { Menu } from "./Menu"
import { useUI } from "../context/UIContext"
import { type EventItem } from "../data/events"
import { copyLink } from "../utils/clipboard"

export function EventCard({ event }: { event: EventItem }) {
  const { open, toast, go } = useUI()
  return (
    <article className="event-card">
      <div className="event-image">
        <img src={event.image} alt="" />
        <span
          className={`status ${event.status === "Selling fast" ? "hot" : event.status === "Draft" ? "draft" : ""}`}
        >
          <i />
          {event.status}
        </span>
      </div>
      <Menu
        className="event-more"
        trigger={
          <button aria-label={`Options for ${event.title}`}>
            <Icon name="more" />
          </button>
        }
        items={[
          { label: "Manage event", onClick: () => open(event) },
          {
            label: "Copy event link",
            onClick: () => {
              copyLink(event.title)
              toast("Event link copied")
            },
          },
          { label: "Edit details", onClick: () => go("Create Event") },
        ]}
      />
      <div className="event-content">
        <p className="event-date">
          {event.date} · {event.time}
        </p>
        <h4>{event.title}</h4>
        <p className="event-venue">{event.venue}</p>
        <div className="event-stats">
          <span>
            <small>Tickets sold</small>
            <strong>{event.sold}</strong>
          </span>
          <span>
            <small>Revenue</small>
            <strong>{event.revenue}</strong>
          </span>
        </div>
        <div className="progress">
          <i style={{ width: `${event.percent}%` }} />
        </div>
        <button className="manage-link" onClick={() => open(event)}>
          Manage event <Icon name="arrow" size={15} />
        </button>
      </div>
    </article>
  )
}
