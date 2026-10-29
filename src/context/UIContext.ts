import { createContext, useContext } from "react"
import { type EventItem } from "../data/events"

export type Ctx = {
  toast: (m: string) => void
  go: (page: string) => void
  open: (e: EventItem) => void
  setStatus: (title: string, status: string) => void
  add: (e: EventItem) => void
  list: EventItem[]
}

export const UI = createContext<Ctx>({
  toast: () => {},
  go: () => {},
  open: () => {},
  setStatus: () => {},
  add: () => {},
  list: [],
})

export const useUI = () => useContext(UI)
