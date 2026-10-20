// Dates travel as "YYYY-MM-DD" and months as "YYYY-MM", in local time.

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function todayDateOnly(now = new Date()): string {
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function currentMonth(now = new Date()): string {
  return todayDateOnly(now).slice(0, 7);
}

export function firstOfMonth(month: string): string {
  return `${month}-01`;
}

export function shiftMonth(month: string, by: number): string {
  const [year, index] = month.split('-').map(Number);
  const shifted = new Date(year, index - 1 + by, 1);
  return `${shifted.getFullYear()}-${pad(shifted.getMonth() + 1)}`;
}

export function formatMonth(month: string): string {
  const [year, index] = month.split('-').map(Number);
  return new Date(year, index - 1, 1).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });
}

export function isDateOnly(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}
