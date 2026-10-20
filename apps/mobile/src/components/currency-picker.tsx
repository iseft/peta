import { SUPPORTED_CURRENCIES, type SupportedCurrency } from '@peta/shared';

import { ChoiceChips } from '@/components/choice-chips';

const CHOICES = SUPPORTED_CURRENCIES.map((currency) => ({ value: currency, label: currency }));

type CurrencyPickerProps = {
  label: string;
  value: SupportedCurrency;
  onChange: (currency: SupportedCurrency) => void;
};

export function CurrencyPicker({ label, value, onChange }: CurrencyPickerProps) {
  return <ChoiceChips label={label} choices={CHOICES} value={value} onChange={onChange} scroll />;
}
