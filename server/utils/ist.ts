/** Date helpers keyed to Asia/Kolkata (IST). */

export function istDateKey(d: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(d);
  const y = parts.find((p) => p.type === 'year')?.value;
  const m = parts.find((p) => p.type === 'month')?.value;
  const day = parts.find((p) => p.type === 'day')?.value;
  return `${y}-${m}-${day}`;
}

export function istHour(d: Date = new Date()): number {
  const hour = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    hour12: false,
  }).format(d);
  return parseInt(hour, 10) % 24;
}

/** Monday of the IST week containing `d`, as YYYY-MM-DD. */
export function istWeekStart(d: Date = new Date()): string {
  const key = istDateKey(d);
  const [y, m, day] = key.split('-').map(Number);
  // Use noon UTC offset approximation via formatter weekday
  const probe = new Date(`${key}T12:00:00+05:30`);
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
  }).format(probe);
  const map: Record<string, number> = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };
  const offset = map[weekday] ?? 0;
  const monday = new Date(probe.getTime() - offset * 24 * 60 * 60 * 1000);
  return istDateKey(monday);
}

export function addIstDays(dateKey: string, delta: number): string {
  const probe = new Date(`${dateKey}T12:00:00+05:30`);
  probe.setTime(probe.getTime() + delta * 24 * 60 * 60 * 1000);
  return istDateKey(probe);
}
