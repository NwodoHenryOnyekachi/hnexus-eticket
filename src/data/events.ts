export const events = [
  {
    title: "Lagos Innovation Summit 2025",
    date: "24 May 2025",
    time: "9:00 AM",
    venue: "Eko Convention Centre, Lagos",
    sold: "842 / 1,200",
    percent: 70,
    revenue: "₦12.8M",
    status: "Selling fast",
    image:
      "https://images.unsplash.com/photo-1634954238233-3d1445638a0e?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Worship & Wonder Conference",
    date: "07 June 2025",
    time: "4:00 PM",
    venue: "The Arena, Abuja",
    sold: "418 / 800",
    percent: 52,
    revenue: "₦3.4M",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1634937734976-7b0432527d5d?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Future of Work Africa",
    date: "19 July 2025",
    time: "10:00 AM",
    venue: "Online event",
    sold: "256 / 600",
    percent: 43,
    revenue: "₦2.1M",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1652092956602-8da6348b986f?auto=format&fit=crop&w=900&q=85",
  },
]

export type EventItem = (typeof events)[number]

export const draftEvent: EventItem = {
  ...events[0],
  title: "Civic Leadership Forum",
  status: "Draft",
  sold: "0 / 500",
  revenue: "₦0",
  percent: 0,
}

export const tags: Record<string, string[]> = {
  "Lagos Innovation Summit 2025": ["Conferences", "Business"],
  "Worship & Wonder Conference": ["Conferences", "Church"],
  "Future of Work Africa": ["Business"],
}
