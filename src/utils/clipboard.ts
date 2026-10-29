export const copyLink = (title: string) =>
  void navigator.clipboard
    ?.writeText(`https://hnexus.ng/e/${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`)
    ?.catch(() => {})
