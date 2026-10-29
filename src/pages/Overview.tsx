import { useState } from "react"
import { Button } from "../components/Button"
import { EventCard } from "../components/EventCard"
import { Icon } from "../components/Icon"
import { Menu } from "../components/Menu"
import { useUI } from "../context/UIContext"
import { metrics } from "../data/metrics"
import { attendeeRows, transactions } from "../data/transactions"
import { exportCSV } from "../utils/csv"

export function Overview({
  setActive,
  toast,
}: {
  setActive: (value: string) => void
  toast: (value: string) => void
}) {
  const { list } = useUI()
  const [range, setRange] = useState("Last 30 days")
  return (
    <>
      <section className="welcome-row">
        <div>
          <p className="eyebrow">Monday, 19 May</p>
          <h1>Good morning, Stephen</h1>
          <p>Here’s what’s happening with your events today.</p>
        </div>
        <div className="welcome-actions">
          <Menu
            align="left"
            trigger={
              <Button variant="secondary" icon="calendar">
                {range}
              </Button>
            }
            items={["Last 7 days", "Last 30 days", "Last 90 days"].map((r) => ({
              label: r,
              on: r === range,
              onClick: () => {
                setRange(r)
                toast(`Showing ${r.toLowerCase()}`)
              },
            }))}
          />
          <Button icon="plus" onClick={() => setActive("Create Event")}>
            Create Event
          </Button>
        </div>
      </section>

      <section className="metric-grid">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <div className="metric-top">
              <span className={`metric-icon ${metric.tone}`}>
                <Icon name={metric.icon} size={21} />
              </span>
              <Menu
                trigger={
                  <button aria-label={`More options for ${metric.label}`}>
                    <Icon name="more" size={18} />
                  </button>
                }
                items={[
                  { label: "View analytics", onClick: () => setActive("Analytics") },
                  {
                    label: "Download CSV",
                    onClick: () => {
                      exportCSV(attendeeRows(), "report.csv")
                      toast("CSV downloaded")
                    },
                  },
                ]}
              />
            </div>
            <p>{metric.label}</p>
            <h2>{metric.value}</h2>
            <div className="metric-note">
              <span>
                <Icon name="trend" size={13} />
                {metric.change}
              </span>
              {metric.note}
            </div>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel revenue-panel">
          <div className="panel-head">
            <div>
              <h3>Revenue overview</h3>
              <p>Gross ticket sales across all events</p>
            </div>
            <div className="legend">
              <span>
                <i className="legend-dot blue-dot" />
                This period
              </span>
              <span>
                <i className="legend-dot pale-dot" />
                Previous
              </span>
            </div>
          </div>
          <div className="chart-total">
            <h2>₦18.4M</h2>
            <span>
              <Icon name="trend" size={14} /> 12.5%
            </span>
          </div>
          <div className="line-chart" aria-label="Revenue trend chart">
            <div className="y-axis">
              <span>₦6M</span>
              <span>₦4M</span>
              <span>₦2M</span>
              <span>₦0</span>
            </div>
            <div className="chart-body">
              <div className="grid-lines">
                <i />
                <i />
                <i />
                <i />
              </div>
              <svg viewBox="0 0 700 190" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2563eb" stopOpacity=".18" />
                    <stop offset="1" stopColor="#2563eb" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="previous-line"
                  d="M0,145 C80,115 125,150 200,120 S320,110 380,105 S470,95 525,70 S620,80 700,50"
                />
                <path
                  className="area-fill"
                  d="M0,155 C70,145 105,90 170,115 S275,85 330,100 S425,80 480,62 S575,75 625,35 S680,40 700,18 L700,190 L0,190Z"
                />
                <path
                  className="main-line"
                  d="M0,155 C70,145 105,90 170,115 S275,85 330,100 S425,80 480,62 S575,75 625,35 S680,40 700,18"
                />
                <circle cx="625" cy="35" r="5" className="chart-point" />
              </svg>
              <div className="x-axis">
                <span>Apr 20</span>
                <span>Apr 27</span>
                <span>May 4</span>
                <span>May 11</span>
                <span>May 18</span>
              </div>
            </div>
          </div>
          <div className="revenue-breakdown">
            <span>
              <small>Gross sales</small>
              <strong>₦19,102,500</strong>
            </span>
            <span>
              <small>Processing fees</small>
              <strong>− ₦522,000</strong>
            </span>
            <span>
              <small>Refunds</small>
              <strong>− ₦160,000</strong>
            </span>
            <span>
              <small>Net revenue</small>
              <strong>₦18,420,500</strong>
            </span>
          </div>
        </article>

        <article className="panel sales-panel">
          <div className="panel-head">
            <div>
              <h3>Ticket sales</h3>
              <p>By event</p>
            </div>
            <button className="text-button" onClick={() => setActive("Analytics")}>
              View report <Icon name="arrow" size={14} />
            </button>
          </div>
          <div className="donut-wrap">
            <div className="donut">
              <div>
                <strong>1,516</strong>
                <small>tickets sold</small>
              </div>
            </div>
            <div className="donut-legend">
              <span>
                <i className="event-a" />
                <b>Lagos Innovation Summit</b>
                <small>842 · 55.5%</small>
              </span>
              <span>
                <i className="event-b" />
                <b>Worship & Wonder</b>
                <small>418 · 27.6%</small>
              </span>
              <span>
                <i className="event-c" />
                <b>Future of Work Africa</b>
                <small>256 · 16.9%</small>
              </span>
            </div>
          </div>
          <div className="sales-footer">
            <span>
              <Icon name="ticket" size={18} />
              <small>Best selling ticket</small>
              <strong>Early Bird · 526 sold</strong>
            </span>
            <span>
              <Icon name="chart" size={18} />
              <small>Avg. order value</small>
              <strong>₦24,630</strong>
            </span>
          </div>
        </article>
      </section>

      <section className="panel upcoming-panel">
        <div className="panel-head">
          <div>
            <h3>Upcoming events</h3>
            <p>Track sales and get ready for event day</p>
          </div>
          <button className="text-button" onClick={() => setActive("My Events")}>
            View all events <Icon name="arrow" size={14} />
          </button>
        </div>
        <div className="event-row-grid">
          {list
            .filter((e) => e.status !== "Draft")
            .slice(0, 3)
            .map((event) => (
              <EventCard key={event.title} event={event} />
            ))}
        </div>
      </section>

      <section className="lower-grid">
        <article className="panel transactions">
          <div className="panel-head">
            <div>
              <h3>Recent transactions</h3>
              <p>Latest successful ticket payments</p>
            </div>
            <button className="text-button" onClick={() => setActive("Orders & Attendees")}>
              View all <Icon name="arrow" size={14} />
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Event & ticket</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item.name}>
                    <td>
                      <span className="customer">
                        <i>{item.initials}</i>
                        <b>{item.name}</b>
                      </span>
                    </td>
                    <td>
                      <b>{item.event}</b>
                      <small>{item.ticket}</small>
                    </td>
                    <td>
                      <strong>{item.amount}</strong>
                    </td>
                    <td>
                      <span className="paid">
                        <Icon name="check" size={12} />
                        Paid
                      </span>
                    </td>
                    <td>{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <aside className="panel quick-panel">
          <div className="panel-head">
            <div>
              <h3>Quick actions</h3>
              <p>Shortcuts to keep you moving</p>
            </div>
          </div>
          <button onClick={() => setActive("Create Event")}>
            <span className="quick-icon blue">
              <Icon name="plus" />
            </span>
            <span>
              <strong>Create a new event</strong>
              <small>Start selling in minutes</small>
            </span>
            <Icon name="chevron" size={17} />
          </button>
          <button onClick={() => setActive("Check-In")}>
            <span className="quick-icon teal">
              <Icon name="scan" />
            </span>
            <span>
              <strong>Open check-in</strong>
              <small>Scan and validate tickets</small>
            </span>
            <Icon name="chevron" size={17} />
          </button>
          <button
            onClick={() => {
              exportCSV(attendeeRows(), "attendees.csv")
              toast("Attendee CSV downloaded")
            }}
          >
            <span className="quick-icon purple">
              <Icon name="download" />
            </span>
            <span>
              <strong>Export attendees</strong>
              <small>Download a CSV report</small>
            </span>
            <Icon name="chevron" size={17} />
          </button>
          <div className="tip">
            <span>
              <Icon name="trend" size={18} />
            </span>
            <p>
              <strong>Sales are up 12.5%</strong>Your events are performing better than last month.
            </p>
          </div>
        </aside>
      </section>
    </>
  )
}
