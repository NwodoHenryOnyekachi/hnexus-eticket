import { useEffect } from "react"
import { Button } from "./Button"
import { Icon } from "./Icon"
import { useUI } from "../context/UIContext"
import { type EventItem } from "../data/events"
import { copyLink } from "../utils/clipboard"

export function EventModal({ event, onClose }: { event: EventItem; onClose: () => void }) {
  const { toast, go, setStatus } = useUI()
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", k)
    return () => document.removeEventListener("keydown", k)
  }, [onClose])
  const live = event.status !== "Draft"
  return (
    <div className="modal-back" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={event.title}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={event.image} alt="" />
        <button className="icon-button modal-x" onClick={onClose} aria-label="Close">
          <Icon name="close" />
        </button>
        <div className="modal-body">
          <p className="event-date">
            {event.date} · {event.time}
          </p>
          <h3>{event.title}</h3>
          <p className="event-venue" style={{ whiteSpace: "normal" }}>
            {event.venue}
          </p>
          <div className="event-stats">
            <span>
              <small>Tickets sold</small>
              <strong>{event.sold}</strong>
            </span>
            <span>
              <small>Revenue</small>
              <strong>{event.revenue}</strong>
            </span>
            <span>
              <small>Status</small>
              <strong>{event.status}</strong>
            </span>
          </div>
          <div className="progress">
            <i style={{ width: `${event.percent}%` }} />
          </div>
          <div className="modal-actions">
            <Button
              icon="download"
              variant="secondary"
              onClick={() => {
                copyLink(event.title)
                toast("Event link copied")
              }}
            >
              Copy link
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                onClose()
                go("Create Event")
              }}
            >
              Edit event
            </Button>
            <Button
              onClick={() => {
                setStatus(event.title, live ? "Draft" : "Published")
                toast(live ? "Event unpublished" : "Event published")
              }}
            >
              {live ? "Unpublish" : "Publish"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
