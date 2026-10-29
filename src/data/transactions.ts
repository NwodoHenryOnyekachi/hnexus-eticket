export const transactions = [
  {
    initials: "AO",
    name: "Amara Okafor",
    event: "Lagos Innovation Summit",
    ticket: "VIP Pass",
    amount: "₦45,000",
    time: "4 min ago",
  },
  {
    initials: "DT",
    name: "David Thompson",
    event: "Worship & Wonder",
    ticket: "General",
    amount: "₦8,500",
    time: "18 min ago",
  },
  {
    initials: "CM",
    name: "Chiamaka Mensah",
    event: "Lagos Innovation Summit",
    ticket: "Early Bird",
    amount: "₦25,000",
    time: "32 min ago",
  },
  {
    initials: "IA",
    name: "Ibrahim Ahmed",
    event: "Future of Work Africa",
    ticket: "Professional",
    amount: "₦15,000",
    time: "1 hr ago",
  },
]

export const attendeeRows = () => [
  ["Name", "Event", "Ticket", "Amount"],
  ...transactions.map((t) => [t.name, t.event, t.ticket, t.amount]),
]
