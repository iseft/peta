import { SEED_CATEGORIES } from './seed-content';

describe('Category content', () => {
  it('gives every Category a unique id', () => {
    const ids = SEED_CATEGORIES.map((category) => category.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('leaves Income and Bank Fees without a Budget Class', () => {
    const unclassed = SEED_CATEGORIES.filter((c) => c.budgetClass === null);

    expect(unclassed.map((c) => c.id)).toEqual(['income', 'bank-fees']);
  });

  it('only lets Bank Fees be kept out of Budget Items', () => {
    const unplannable = SEED_CATEGORIES.filter((c) => !c.plannable);

    expect(unplannable.map((c) => c.id)).toEqual(['bank-fees']);
  });
});
