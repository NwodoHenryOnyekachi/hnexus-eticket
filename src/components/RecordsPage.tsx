import { useState } from "react"
import { Button } from "./Button"
import { Icon } from "./Icon"
import { useUI } from "../context/UIContext"
import { attendeeRows, transactions } from "../data/transactions"
import { exportCSV } from "../utils/csv"

type RecordsPageProps = {
  title: string
  subtitle: string
  tableTitle: string
  csvName: string
}

export function RecordsPage({ title, subtitle, tableTitle, csvName }: RecordsPageProps) {
  const { toast } = useUI()
  const [q, setQ] = useState("")
  const attendees = transactions
    .concat(transactions)
    .slice(0, 6)
    .filter((t) => (t.name + t.event + t.ticket).toLowerCase().includes(q.toLowerCase()))
  return (
    <section className="page-stack">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <Button
          variant="secondary"
          icon="download"
          onClick={() => {
            exportCSV(attendeeRows(), csvName)
            toast("CSV downloaded")
          }}
        >
          Export CSV
        </Button>
      </div>
      <article className="panel">
        <div className="panel-head">
          <div>
            <h3>{tableTitle}</h3>
            <p>Updated a few seconds ago</p>
          </div>
          <div className="search-box compact">
            <Icon name="search" size={17} />
            <input
              placeholder="Search records..."
              aria-label="Search records"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
        <div className="table-wrap wide-table">
          <table>
            <thead>
              <tr>
                <th>Attendee</th>
                <th>Event</th>
                <th>Ticket type</th>
                <th>Order reference</th>
                <th>Payment</th>
                <th>Check-in</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((item, i) => (
                <tr key={`${item.name}-${i}`}>
                  <td>
                    <span className="customer">
                      <i>{item.initials}</i>
                      <b>{item.name}</b>
                    </span>
                  </td>
                  <td>
                    <b>{item.event}</b>
                  </td>
                  <td>{item.ticket}</td>
                  <td>HNX-{520184 + i * 1437}</td>
                  <td>
                    <span className="paid">
                      <Icon name="check" size={12} />
                      Paid
                    </span>
                  </td>
                  <td>
                    {i % 3 === 0 ? (
                      <span className="checked">Checked in</span>
                    ) : (
                      <span className="pending">Not checked in</span>
                    )}
                  </td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}
