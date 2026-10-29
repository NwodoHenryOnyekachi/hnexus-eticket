import { RecordsPage } from "../components/RecordsPage"

export function OrdersPage() {
  return (
    <RecordsPage
      title="Orders & Attendees"
      subtitle="Manage your customers, orders, and event activity."
      tableTitle="Attendee directory"
      csvName="attendees.csv"
    />
  )
}
