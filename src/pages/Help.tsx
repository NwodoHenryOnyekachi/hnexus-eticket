import { Button } from "../components/Button"
import { useUI } from "../context/UIContext"

export function HelpPage() {
  const { toast } = useUI()
  const faqs = [
    [
      "How do I check guests in?",
      "Open Check-In, pick an event, then scan the QR code or look the ticket up manually.",
    ],
    ["When do I get paid?", "Payouts are sent 2 business days after your event ends."],
    ["Can I refund a ticket?", "Yes. Open Orders & Attendees, choose the order and select Refund."],
  ]
  return (
    <section className="page-stack">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">Support</p>
          <h1>Help & Support</h1>
          <p>Answers to common questions, or talk to a person.</p>
        </div>
        <div className="welcome-actions">
          <Button
            icon="help"
            onClick={() => toast("Support chat started. An agent will reply shortly.")}
          >
            Chat with support
          </Button>
          <a className="button button-secondary" href="mailto:support@hnexus.ng">
            Email support
          </a>
        </div>
      </div>
      <article className="panel faq">
        {faqs.map(([q, a]) => (
          <details key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </article>
    </section>
  )
}
