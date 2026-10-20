import type { RecurrenceDTO } from '@peta/shared';

const UNIT_NAMES = {
  WEEK: ['week', 'weeks'],
  MONTH: ['month', 'months'],
  YEAR: ['year', 'years'],
} as const;

export function describeRecurrence(recurrence: RecurrenceDTO | null): string {
  if (!recurrence) return 'One-off';
  const [one, many] = UNIT_NAMES[recurrence.unit];
  return recurrence.interval === 1 ? `Every ${one}` : `Every ${recurrence.interval} ${many}`;
}

// Anything rarer than monthly needs a start date the Annual Budget can place.
export function isRarerThanMonthly(recurrence: RecurrenceDTO | null): boolean {
  if (!recurrence) return false;
  if (recurrence.unit === 'YEAR') return true;
  return recurrence.unit === 'MONTH' && recurrence.interval > 1;
}
