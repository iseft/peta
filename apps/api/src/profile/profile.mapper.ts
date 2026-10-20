import type { PaymentDetail, User } from '@db';
import type {
  PaymentDetailDTO,
  ProfileDTO,
  SupportedCurrency,
} from '@peta/shared';
import { formatDateOnly } from '../common/dates/date-only';
import { toAmountNumber } from '../common/money/convert';

export function toPaymentDetailDTO(detail: PaymentDetail): PaymentDetailDTO {
  return {
    id: detail.id,
    label: detail.label,
    holderName: detail.holderName,
    value: detail.value,
    position: detail.position,
  };
}

export function toProfileDTO(
  user: User,
  email: string | null,
  paymentDetails: PaymentDetail[],
): ProfileDTO {
  return {
    email,
    name: user.name,
    defaultCurrency: user.defaultCurrency as SupportedCurrency | null,
    openingBalance:
      user.openingBalanceMinor !== null &&
      user.openingBalanceCurrency &&
      user.openingBalanceDate
        ? {
            amountMinor: toAmountNumber(user.openingBalanceMinor),
            currency: user.openingBalanceCurrency as SupportedCurrency,
            date: formatDateOnly(user.openingBalanceDate),
          }
        : null,
    emergencyFundTargetMonths: user.emergencyFundTargetMonths,
    onboarded: user.onboardedAt !== null,
    paymentDetails: paymentDetails.map(toPaymentDetailDTO),
  };
}
