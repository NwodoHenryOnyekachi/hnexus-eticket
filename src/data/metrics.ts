import { type IconName } from "../types"

export const metrics = [
  {
    label: "Total revenue",
    value: "₦18,420,500",
    change: "+12.5%",
    note: "vs. previous 30 days",
    icon: "wallet" as IconName,
    tone: "blue",
  },
  {
    label: "Tickets sold",
    value: "1,516",
    change: "+8.2%",
    note: "116 sold this week",
    icon: "ticket" as IconName,
    tone: "teal",
  },
  {
    label: "Active events",
    value: "6",
    change: "+2",
    note: "3 events upcoming",
    icon: "calendar" as IconName,
    tone: "purple",
  },
  {
    label: "Checked in",
    value: "1,184",
    change: "78.1%",
    note: "of total tickets sold",
    icon: "check" as IconName,
    tone: "green",
  },
]
