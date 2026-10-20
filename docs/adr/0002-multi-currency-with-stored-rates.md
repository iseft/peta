# Multiple currencies with a stored rate per record

Every Budget Item and Line keeps its original amount and currency, plus the exchange rate to the user's Default Currency on its date, taken from a daily-cached ECB feed. Totals are always shown in the Default Currency. We store the rate on the record instead of converting on read so that past totals never shift when the feed is corrected or unavailable, and we keep the original amount so that changing the Default Currency can recompute everything from historical rates.

## Consequences

- Amounts are integer minor units; the rate is stored as a decimal.
- Changing the Default Currency is a bulk recalculation, not a display setting.
