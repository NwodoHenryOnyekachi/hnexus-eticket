import { useState } from "react"
import { Button } from "../components/Button"
import { Icon } from "../components/Icon"
import { useUI } from "../context/UIContext"
import { events, type EventItem } from "../data/events"

const stepNames = ["Event details", "Location", "Tickets", "Registration", "Review"]

export function CreateEventPage() {
  const { toast, go, add } = useUI()
  const [step, setStep] = useState(0)
  const [f, setF] = useState({
    title: "",
    description: "",
    category: "",
    format: "In-person",
    date: "",
    time: "",
    venue: "",
    city: "Lagos",
    ticket: "General admission",
    price: "5000",
    qty: "200",
    phone: true,
    approval: false,
  })
  const set = (k: keyof typeof f, v: string | boolean) => setF((p) => ({ ...p, [k]: v }))
  const field = (k: keyof typeof f, label: string, type = "text", ph = "") => (
    <label>
      {label}
      <input
        type={type}
        placeholder={ph}
        value={String(f[k])}
        onChange={(e) => set(k, e.target.value)}
      />
    </label>
  )
  const check = (k: "phone" | "approval", label: string) => (
    <label className="toggle">
      <span>{label}</span>
      <input type="checkbox" checked={f[k]} onChange={() => set(k, !f[k])} />
    </label>
  )
  const build = (status: string): EventItem => ({
    ...events[0],
    title: f.title.trim(),
    date: f.date
      ? new Date(f.date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Date to be confirmed",
    time: f.time || "TBC",
    venue: f.format === "Online" ? "Online event" : f.venue || f.city,
    sold: `0 / ${f.qty}`,
    percent: 0,
    revenue: "₦0",
    status,
  })
  const save = (status: string) => {
    if (!f.title.trim()) {
      setStep(0)
      return toast("Add an event title first")
    }
    add(build(status))
    toast(status === "Draft" ? "Draft saved" : "Event published")
    go("My Events")
  }
  const next = () => {
    if (step === 0 && !f.title.trim()) return toast("Add an event title first")
    if (step === 4) return save("Published")
    setStep(step + 1)
  }
  return (
    <section className="page-stack wizard">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">Create event</p>
          <h1>{step === 0 ? "Tell us about your event" : stepNames[step]}</h1>
          <p>You can save as draft and finish setup at any time.</p>
        </div>
        <span className="autosave">
          <Icon name="check" size={14} /> Step {step + 1} of 5
        </span>
      </div>
      <div className="steps">
        {stepNames.map((item, i) => (
          <span
            key={item}
            role="button"
            tabIndex={0}
            className={`${i === step ? "active" : ""} ${i < step ? "done" : ""}`}
            onClick={() => setStep(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setStep(i)
            }}
          >
            <i>{i < step ? "✓" : i + 1}</i>
            {item}
          </span>
        ))}
      </div>
      <div className="form-layout">
        <article className="panel form-panel">
          <div className="form-section">
            {step === 0 && (
              <>
                <h3>Event details</h3>
                <p>Give attendees the information they need to understand your event.</p>
                {field("title", "Event title", "text", "e.g. Africa Product Summit 2025")}
                <label>
                  Event description
                  <textarea
                    rows={5}
                    placeholder="Tell people what makes your event special..."
                    value={f.description}
                    onChange={(e) => set("description", e.target.value)}
                  />
                </label>
                <div className="form-row">
                  <label>
                    Category
                    <select value={f.category} onChange={(e) => set("category", e.target.value)}>
                      <option value="" disabled>
                        Select a category
                      </option>
                      <option>Conference</option>
                      <option>Concert</option>
                      <option>Business</option>
                    </select>
                  </label>
                  <label>
                    Event format
                    <select value={f.format} onChange={(e) => set("format", e.target.value)}>
                      <option>In-person</option>
                      <option>Online</option>
                      <option>Hybrid</option>
                    </select>
                  </label>
                </div>
                <div className="form-row">
                  {field("date", "Start date", "date")}
                  {field("time", "Start time", "time")}
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <h3>Location</h3>
                <p>Where will guests join you?</p>
                {f.format === "Online" ? (
                  <p>This is an online event, so no venue is needed.</p>
                ) : (
                  <>
                    {field("venue", "Venue name", "text", "e.g. Eko Convention Centre")}
                    {field("city", "City")}
                  </>
                )}
              </>
            )}
            {step === 2 && (
              <>
                <h3>Tickets</h3>
                <p>Set up your first ticket type. You can add more later.</p>
                {field("ticket", "Ticket name")}
                <div className="form-row">
                  {field("price", "Price (₦)", "number")}
                  {field("qty", "Quantity", "number")}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h3>Registration</h3>
                <p>Choose what you collect when guests buy.</p>
                {check("phone", "Collect phone numbers")}
                {check("approval", "Require approval for each order")}
              </>
            )}
            {step === 4 && (
              <>
                <h3>Review</h3>
                <p>Check everything before you publish.</p>
                <dl className="review">
                  {(
                    [
                      ["Title", f.title || "—"],
                      ["When", `${f.date || "TBC"} ${f.time}`],
                      ["Where", f.format === "Online" ? "Online" : f.venue || f.city],
                      ["Ticket", `${f.ticket} · ₦${Number(f.price).toLocaleString()} × ${f.qty}`],
                    ] as string[][]
                  ).map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>
          <div className="form-footer">
            <Button
              variant="secondary"
              onClick={() => (step > 0 ? setStep(step - 1) : save("Draft"))}
            >
              {step > 0 ? "Back" : "Save as draft"}
            </Button>
            <Button onClick={next}>
              {step === 4 ? "Publish event" : `Continue to ${stepNames[step + 1].toLowerCase()}`}{" "}
              <Icon name="arrow" size={16} />
            </Button>
          </div>
        </article>
        <aside className="panel helper-card">
          <span>
            <Icon name="events" />
          </span>
          <h3>A great event page converts</h3>
          <p>
            Use a clear title and concise description. Your cover image should be at least 1600 ×
            900 pixels.
          </p>
          <button
            className="text-button"
            onClick={() => toast("Tip: lead with the date, place and one big benefit")}
          >
            View event page tips
          </button>
        </aside>
      </div>
    </section>
  )
}
