import { useEffect, useRef, useState } from "react"
import { BottomNav } from "./components/BottomNav"
import { EventModal } from "./components/EventModal"
import { Icon } from "./components/Icon"
import { Sidebar } from "./components/Sidebar"
import { Topbar } from "./components/Topbar"
import { UI, type Ctx } from "./context/UIContext"
import { draftEvent, events, type EventItem } from "./data/events"
import { AnalyticsPage } from "./pages/Analytics"
import { CheckInPage } from "./pages/CheckIn"
import { CreateEventPage } from "./pages/CreateEvent"
import { Discovery } from "./pages/Discovery"
import { HelpPage } from "./pages/Help"
import { MyEventsPage } from "./pages/MyEvents"
import { OrdersPage } from "./pages/Orders"
import { Overview } from "./pages/Overview"
import { SettingsPage } from "./pages/Settings"

export default function App() {
  const [active, setActive] = useState("Overview")
  const [menuOpen, setMenuOpen] = useState(false)
  const [discover, setDiscover] = useState(false)
  const [message, setMessage] = useState("")
  const [list, setList] = useState<EventItem[]>([...events, draftEvent])
  const [sel, setSel] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const toast = (value: string) => {
    setMessage(value)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMessage(""), 2500)
  }
  const go = (page: string) => {
    if (page === "Explore") setDiscover(true)
    else setActive(page)
    setMenuOpen(false)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [active])
  useEffect(() => {
    document.body.style.overflow = menuOpen || sel ? "hidden" : ""
  }, [menuOpen, sel])
  const selected = list.find((e) => e.title === sel)
  const ctx: Ctx = {
    toast,
    go,
    list,
    open: (e) => setSel(e.title),
    setStatus: (title, status) =>
      setList((l) => l.map((e) => (e.title === title ? { ...e, status } : e))),
    add: (e) => setList((l) => [e, ...l.filter((x) => x.title !== e.title)]),
  }
  const renderPage = () => {
    switch (active) {
      case "My Events":
        return <MyEventsPage toast={toast} />
      case "Check-In":
        return <CheckInPage />
      case "Create Event":
        return <CreateEventPage />
      case "Orders & Attendees":
        return <OrdersPage />
      case "Analytics":
        return <AnalyticsPage />
      case "Settings":
        return <SettingsPage />
      case "Help & Support":
        return <HelpPage />
      default:
        return <Overview setActive={setActive} toast={toast} />
    }
  }
  return (
    <UI.Provider value={ctx}>
      {discover ? (
        <Discovery
          onClose={() => setDiscover(false)}
          onCreate={() => {
            setDiscover(false)
            setActive("Create Event")
          }}
        />
      ) : (
        <div className="app-shell">
          <Sidebar
            active={active}
            setActive={setActive}
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
          />
          {menuOpen && (
            <button
              className="overlay"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
            />
          )}
          <div className="main-shell">
            <Topbar onMenu={() => setMenuOpen(true)} onDiscover={() => setDiscover(true)} />
            <main className="main-content">{renderPage()}</main>
          </div>
          <BottomNav active={active} go={go} onMore={() => setMenuOpen(true)} />
          {selected && <EventModal event={selected} onClose={() => setSel(null)} />}
        </div>
      )}
      {message && (
        <div className="toast" role="status">
          <Icon name="check" size={17} />
          {message}
        </div>
      )}
    </UI.Provider>
  )
}
