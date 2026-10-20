import { Prisma } from '@db';
import { ValidationError } from '../common/exceptions/validation-error';
import { BudgetService } from './budget.service';

const user = { id: 'user-1', defaultCurrency: 'HUF' };
const users = { getOnboardedUser: jest.fn().mockResolvedValue(user) };
const exchangeRates = {
  findRate: jest.fn().mockResolvedValue(new Prisma.Decimal(1)),
};

function rentRow(overrides = {}) {
  return {
    id: 'rent',
    userId: 'user-1',
    subcategoryId: 'sub-rent',
    name: null,
    amountMinor: BigInt(20000000),
    currency: 'HUF',
    rateToDefault: new Prisma.Decimal(1),
    recurrenceUnit: 'MONTH',
    recurrenceInterval: 1,
    startDate: new Date('2026-01-01T00:00:00Z'),
    endDate: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

function subcategory(overrides = {}) {
  return {
    id: 'sub-rent',
    archivedAt: null,
    category: { name: 'Housing', plannable: true },
    ...overrides,
  };
}

describe('BudgetService.updateBudgetItem', () => {
  it('ends the old item and starts a new one when the change is dated', async () => {
    const budgetItems = {
      findBudgetItem: jest.fn().mockResolvedValue(rentRow()),
      updateAndCreateBudgetItem: jest
        .fn()
        .mockImplementation((_id, _end, successor) =>
          Promise.resolve(rentRow({ ...successor, id: 'rent-2' })),
        ),
      updateBudgetItem: jest.fn(),
    };
    const service = new BudgetService(
      users as any,
      {} as any,
      budgetItems as any,
      exchangeRates as any,
    );

    const result = await service.updateBudgetItem('clerk_1', 'rent', {
      amountMinor: 22000000,
      effectiveFrom: '2026-06-01',
    });

    expect(budgetItems.updateAndCreateBudgetItem).toHaveBeenCalledWith(
      'rent',
      { endDate: new Date('2026-05-31T00:00:00Z') },
      expect.objectContaining({
        amountMinor: BigInt(22000000),
        startDate: new Date('2026-06-01T00:00:00Z'),
      }),
    );
    expect(budgetItems.updateBudgetItem).not.toHaveBeenCalled();
    expect(result).toEqual(
      expect.objectContaining({ id: 'rent-2', amountMinor: 22000000 }),
    );
  });

  it('corrects the item in place without a date', async () => {
    const budgetItems = {
      findBudgetItem: jest.fn().mockResolvedValue(rentRow()),
      updateAndCreateBudgetItem: jest.fn(),
      updateBudgetItem: jest
        .fn()
        .mockResolvedValue(rentRow({ amountMinor: BigInt(21000000) })),
    };
    const service = new BudgetService(
      users as any,
      {} as any,
      budgetItems as any,
      exchangeRates as any,
    );

    await service.updateBudgetItem('clerk_1', 'rent', {
      amountMinor: 21000000,
    });

    expect(budgetItems.updateAndCreateBudgetItem).not.toHaveBeenCalled();
    expect(budgetItems.updateBudgetItem).toHaveBeenCalledWith(
      'rent',
      expect.objectContaining({ amountMinor: BigInt(21000000) }),
    );
  });
});

describe('BudgetService.createBudgetItem', () => {
  const input = {
    subcategoryId: 'sub-rent',
    amountMinor: 100,
    currency: 'HUF' as const,
    recurrence: null,
    startDate: '2026-01-01',
  };

  it('refuses an archived Subcategory', async () => {
    const categories = {
      requireSubcategory: jest
        .fn()
        .mockResolvedValue(subcategory({ archivedAt: new Date() })),
    };
    const service = new BudgetService(
      users as any,
      categories as any,
      {} as any,
      exchangeRates as any,
    );

    await expect(
      service.createBudgetItem('clerk_1', input),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it('refuses Bank Fees, which only Transactions may use', async () => {
    const categories = {
      requireSubcategory: jest
        .fn()
        .mockResolvedValue(
          subcategory({ category: { name: 'Bank Fees', plannable: false } }),
        ),
    };
    const service = new BudgetService(
      users as any,
      categories as any,
      {} as any,
      exchangeRates as any,
    );

    await expect(
      service.createBudgetItem('clerk_1', input),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});
