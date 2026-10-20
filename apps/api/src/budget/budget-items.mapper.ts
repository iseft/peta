import type { BudgetItem } from '@db';
import type { BudgetItemDTO, SupportedCurrency } from '@peta/shared';
import { formatDateOnly } from '../common/dates/date-only';
import { toAmountNumber } from '../common/money/convert';

export function toBudgetItemDTO(item: BudgetItem): BudgetItemDTO {
  return {
    id: item.id,
    subcategoryId: item.subcategoryId,
    name: item.name,
    amountMinor: toAmountNumber(item.amountMinor),
    currency: item.currency as SupportedCurrency,
    recurrence:
      item.recurrenceUnit && item.recurrenceInterval
        ? { unit: item.recurrenceUnit, interval: item.recurrenceInterval }
        : null,
    startDate: formatDateOnly(item.startDate),
    endDate: item.endDate ? formatDateOnly(item.endDate) : null,
  };
}
