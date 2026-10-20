// Prisma maps @db.Date columns to midnight UTC; these keep that convention.

export function parseDateOnly(value: string): Date {
  return new Date(`${value}T00:00:00.000Z`);
}

export function formatDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function todayDateOnly(): string {
  return formatDateOnly(new Date());
}

export function addDays(value: string, days: number): string {
  const date = parseDateOnly(value);
  date.setUTCDate(date.getUTCDate() + days);
  return formatDateOnly(date);
}

// First and last day of a "YYYY-MM" month.
export function monthBounds(month: string): { first: string; last: string } {
  const [year, monthIndex] = month.split('-').map(Number);
  const last = new Date(Date.UTC(year, monthIndex, 0));
  return { first: `${month}-01`, last: formatDateOnly(last) };
}
