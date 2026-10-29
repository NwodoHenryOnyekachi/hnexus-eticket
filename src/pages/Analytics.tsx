import { RecordsPage } from "../components/RecordsPage"

export function AnalyticsPage() {
  return (
    <RecordsPage
      title="Analytics"
      subtitle="Understand performance and turn event data into better decisions."
      tableTitle="Performance by event"
      csvName="analytics.csv"
    />
  )
}
