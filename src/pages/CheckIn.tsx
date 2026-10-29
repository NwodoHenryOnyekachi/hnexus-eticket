import { useState } from "react"
import { Button } from "../components/Button"
import { Icon } from "../components/Icon"
import { Menu } from "../components/Menu"
import { useUI } from "../context/UIContext"
import { events } from "../data/events"

export function CheckInPage() {
  const [result, setResult] = useState<"idle" | "success" | "duplicate">("idle")
  const { list, toast } = useUI()
  const [ev, setEv] = useState(events[0].title)
  const [manual, setManual] = useState(false)
  const [code, setCode] = useState("")
  const lookup = () => {
    if (!code.trim()) return toast("Enter a ticket code first")
    setResult(code.includes("401926") ? "duplicate" : "success")
  }
  return (
    <section className="page-stack scanner-page">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">Event operations</p>
          <h1>Check-In</h1>
          <p>Fast, secure entry for {ev}.</p>
        </div>
        <Menu
          trigger={<Button variant="secondary">Switch event</Button>}
          items={list
            .filter((e) => e.status !== "Draft")
            .map((e) => ({
              label: e.title,
              on: e.title === ev,
              onClick: () => {
                setEv(e.title)
                setResult("idle")
              },
            }))}
        />
      </div>
      <div className="scan-stats">
        <span>
          <small>Expected</small>
          <strong>1,200</strong>
        </span>
        <span>
          <small>Checked in</small>
          <strong>634</strong>
        </span>
        <span>
          <small>Remaining</small>
          <strong>566</strong>
        </span>
        <span className="online">
          <i /> Online & synced
        </span>
      </div>
      <div className="scanner-grid">
        <article className="scanner-card">
          <div className="camera">
            <div className="scan-corner tl" />
            <div className="scan-corner tr" />
            <div className="scan-corner bl" />
            <div className="scan-corner br" />
            <div className="scan-line" />
            <Icon name="scan" size={44} />
            <strong>Position QR code within frame</strong>
            <small>Validation happens automatically</small>
          </div>
          <div className="scanner-actions">
            <Button variant="secondary" onClick={() => setManual((m) => !m)}>
              Manual ticket lookup
            </Button>
            <Button
              onClick={() => setResult((r) => (r === "success" ? "duplicate" : "success"))}
              icon="scan"
            >
              Simulate scan
            </Button>
          </div>
          {manual && (
            <div className="manual">
              <input
                placeholder="Ticket code e.g. HNX-401926"
                aria-label="Ticket code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") lookup()
                }}
              />
              <Button onClick={lookup}>Validate</Button>
            </div>
          )}
        </article>
        <aside className={`scan-result ${result}`}>
          {result === "idle" && (
            <>
              <span>
                <Icon name="scan" size={30} />
              </span>
              <h3>Ready to scan</h3>
              <p>Scan a guest ticket to see the validation result here.</p>
            </>
          )}
          {result === "success" && (
            <>
              <span>
                <Icon name="check" size={32} />
              </span>
              <p className="result-label">Valid ticket</p>
              <h2>Check-in successful</h2>
              <div className="attendee-result">
                <div className="avatar">AO</div>
                <div>
                  <strong>Amara Okafor</strong>
                  <small>VIP Pass · HNX-520184</small>
                </div>
              </div>
              <p>Entry recorded at 10:42 AM</p>
            </>
          )}
          {result === "duplicate" && (
            <>
              <span>
                <Icon name="clock" size={32} />
              </span>
              <p className="result-label">Duplicate scan</p>
              <h2>Already checked in</h2>
              <div className="attendee-result">
                <div className="avatar">DT</div>
                <div>
                  <strong>David Thompson</strong>
                  <small>General Admission · HNX-401926</small>
                </div>
              </div>
              <p>First checked in at 9:18 AM</p>
            </>
          )}
        </aside>
      </div>
    </section>
  )
}
