const campusMonth = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "2-digit",
});
const monthLabel = new Intl.DateTimeFormat("en-IN", {
  timeZone: "UTC",
  month: "long",
  year: "numeric",
});

export function projectMonths(now: Date) {
  const parts = campusMonth.formatToParts(now);
  const year = Number(parts.find(({ type }) => type === "year")?.value);
  const month = Number(parts.find(({ type }) => type === "month")?.value);
  const key = (offset: number) => new Date(Date.UTC(year, month - 1 + offset, 1)).toISOString().slice(0, 7);
  return { current: key(0), previous: key(-1), earlier: [key(-2), key(-3)] };
}

export function formatProjectMonth(month: string) {
  return monthLabel.format(new Date(`${month}-01T00:00:00Z`));
}

export function projectPreviews(month: string) {
  return Array.from({ length: 10 }, (_, index) => ({
    id: `${month}-${index + 1}`,
    name: `Project ${String(index + 1).padStart(2, "0")}`,
    month,
  }));
}

export type ProjectPreview = ReturnType<typeof projectPreviews>[number];
