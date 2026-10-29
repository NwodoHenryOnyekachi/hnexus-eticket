import { useState } from "react"
import { Button } from "../components/Button"
import { Icon } from "../components/Icon"
import { Logo } from "../components/Logo"
import { Menu } from "../components/Menu"
import { useUI } from "../context/UIContext"
import { tags, type EventItem } from "../data/events"

export function Discovery({ onClose, onCreate }: { onClose: () => void; onCreate: () => void }) {
  const { toast, list } = useUI()
  const [q, setQ] = useState("")
  const [cat, setCat] = useState("")
  const [city, setCity] = useState("Lagos")
  const [saved, setSaved] = useState<string[]>([])
  const shown = list.filter(
    (e) =>
      e.status !== "Draft" &&
      (e.title + e.venue).toLowerCase().includes(q.toLowerCase()) &&
      (!cat || (tags[e.title] ?? []).includes(cat)),
  )
  const price = (e: EventItem) =>
    e.venue === "Online event"
      ? "From ₦15,000"
      : e.title.includes("Worship")
        ? "From ₦8,500"
        : "From ₦25,000"
  const to = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  return (
    <div className="discovery">
      <header className="public-nav">
        <Logo />
        <nav>
          <button onClick={() => to("featured")}>Discover</button>
          <button onClick={() => to("popular")}>Categories</button>
          <button onClick={() => toast("Browse, buy tickets, get a QR code, scan at the door")}>
            How it works
          </button>
        </nav>
        <div>
          <Button variant="ghost" onClick={onClose}>
            Organizer dashboard
          </Button>
          <Button onClick={onCreate}>List your event</Button>
        </div>
      </header>
      <main>
        <section className="public-hero">
          <div className="hero-glow" />
          <div className="hero-copy">
            <span className="hero-label">Made for memorable moments</span>
            <h1>
              Find your next <em>experience.</em>
            </h1>
            <p>
              Discover inspiring events, secure your tickets, and check in effortlessly — all in one
              place.
            </p>
            <div className="hero-search">
              <Icon name="search" />
              <input
                placeholder="Search events, artists, or venues"
                aria-label="Search events"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") to("featured")
                }}
              />
              <Menu
                align="left"
                trigger={
                  <button className="city">
                    {city} <Icon name="chevron" size={14} />
                  </button>
                }
                items={["Lagos", "Abuja", "Port Harcourt"].map((c) => ({
                  label: c,
                  on: c === city,
                  onClick: () => {
                    setCity(c)
                    toast(`Showing events in ${c}`)
                  },
                }))}
              />
              <Button onClick={() => to("featured")}>Find events</Button>
            </div>
            <div className="popular" id="popular">
              <span>Popular:</span>
              {["Conferences", "Concerts", "Church", "Business"].map((c) => (
                <button
                  key={c}
                  className={cat === c ? "on" : ""}
                  onClick={() => setCat(cat === c ? "" : c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="featured" id="featured">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Curated for you</p>
              <h2>Featured experiences</h2>
            </div>
            <button
              className="text-button"
              onClick={() => {
                setQ("")
                setCat("")
                toast("Showing all events")
              }}
            >
              Explore all events <Icon name="arrow" size={15} />
            </button>
          </div>
          <div className="public-events">
            {shown.map((event) => (
              <article
                key={event.title}
                role="button"
                tabIndex={0}
                onClick={() => toast(`Opening tickets for ${event.title}`)}
              >
                <div className="public-image">
                  <img src={event.image} alt="" />
                  <span>{event.venue === "Online event" ? "Online" : "Featured"}</span>
                  <button
                    aria-label="Save event"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSaved((s) =>
                        s.includes(event.title)
                          ? s.filter((t) => t !== event.title)
                          : [...s, event.title],
                      )
                      toast(
                        saved.includes(event.title) ? "Removed from saved" : "Saved to your list",
                      )
                    }}
                  >
                    {saved.includes(event.title) ? "♥" : "♡"}
                  </button>
                </div>
                <div className="public-event-body">
                  <p>{event.date.toUpperCase()}</p>
                  <h3>{event.title}</h3>
                  <span>{event.venue}</span>
                  <footer>
                    <strong>{price(event)}</strong>
                    <small>{event.sold.split("/")[0]} going</small>
                  </footer>
                </div>
              </article>
            ))}
          </div>
          {shown.length === 0 && <p className="empty">No events match your search.</p>}
        </section>
      </main>
    </div>
  )
}
