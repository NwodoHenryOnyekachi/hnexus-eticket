export function exportCSV(rows: string[][], name: string) {
  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n")
  const a = document.createElement("a")
  a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
  a.download = name
  a.click()
  window.setTimeout(() => URL.revokeObjectURL(a.href), 1000)
}
