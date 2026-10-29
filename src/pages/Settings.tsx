import { useState } from "react"
import { Button } from "../components/Button"
import { useUI } from "../context/UIContext"

export function SettingsPage() {
  const { toast } = useUI()
  const [name, setName] = useState("Stephen Ojo")
  const [opts, setOpts] = useState<Record<string, boolean>>({
    "Email me when a ticket sells": true,
    "Daily sales summary": true,
    "Check-in alerts": false,
    "Two-factor authentication": false,
  })
  return (
    <section className="page-stack">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">Account</p>
          <h1>Settings</h1>
          <p>Manage your profile and notifications.</p>
        </div>
        <Button icon="check" onClick={() => toast("Settings saved")}>
          Save changes
        </Button>
      </div>
      <article className="panel form-section">
        <label>
          Display name
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        {Object.entries(opts).map(([k, v]) => (
          <label key={k} className="toggle">
            <span>{k}</span>
            <input
              type="checkbox"
              checked={v}
              onChange={() => setOpts((o) => ({ ...o, [k]: !v }))}
            />
          </label>
        ))}
      </article>
    </section>
  )
}
