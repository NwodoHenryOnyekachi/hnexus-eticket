# HNexus eTicket

Organizer dashboard and public event discovery page.
React 19, TypeScript, Vite and Tailwind CSS 4.

```bash
npm install
npm run dev      # start locally
npm run build    # type-check and build for production
npm run format   # tidy all .ts/.tsx files with Prettier
```

## Where to change things

Each page lives in its own file in `src/pages/`:

| Page               | File                    |
| ------------------ | ----------------------- |
| Overview           | `pages/Overview.tsx`    |
| My Events          | `pages/MyEvents.tsx`    |
| Create Event       | `pages/CreateEvent.tsx` |
| Check-In           | `pages/CheckIn.tsx`     |
| Orders & Attendees | `pages/Orders.tsx`      |
| Analytics          | `pages/Analytics.tsx`   |
| Settings           | `pages/Settings.tsx`    |
| Help & Support     | `pages/Help.tsx`        |
| Public discovery   | `pages/Discovery.tsx`   |

Everything else:

- `App.tsx` holds the app state, the layout and the page routing (the `renderPage` switch).
- `components/` has the shared pieces: Sidebar, Topbar, BottomNav (the mobile task bar), Menu,
  EventCard, EventModal, Button, Icon, Logo and RecordsPage (the table used by Orders and Analytics).
- `data/` has the mock data (events, transactions, metrics, sidebar links). Replace these with your API.
- `context/UIContext.ts` shares toast, navigation and the event list across pages.
- `utils/` has small helpers (CSV export, copy link).
- `index.css` has all the styles.

## Adding a new page

1. Create `src/pages/MyPage.tsx` and export a component.
2. Add a `case` for it in `renderPage` in `App.tsx`.
3. Add its label to `src/data/navigation.ts` so it appears in the menu.
