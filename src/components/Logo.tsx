export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo">
      <div className="logo-mark" aria-hidden="true">
        <span />
        <span />
      </div>
      {!compact && (
        <div className="logo-type">
          HNexus <b>eTicket</b>
        </div>
      )}
    </div>
  )
}
