import { Prisma } from '@db';
import { ConflictError } from '../common/exceptions/conflict-error';
import { NotFoundError } from '../common/exceptions/not-found-error';
import { CategoriesService } from './categories.service';

const user = { id: 'user-1' };
const users = { getOrCreateUser: jest.fn().mockResolvedValue(user) };
const subcategory = {
  id: 'sub-1',
  userId: 'user-1',
  categoryId: 'housing',
  name: 'Rent',
  archivedAt: null,
  createdAt: new Date(),
};

describe('CategoriesService.deleteSubcategory', () => {
  it('deletes a Subcategory without history', async () => {
    const categories = {
      findSubcategory: jest.fn().mockResolvedValue(subcategory),
      findSubcategoryHasHistory: jest.fn().mockResolvedValue(false),
      deleteSubcategory: jest.fn().mockResolvedValue(undefined),
    };
    const service = new CategoriesService(users as any, categories as any);

    await expect(
      service.deleteSubcategory('clerk_1', 'sub-1'),
    ).resolves.toEqual({ outcome: 'DELETED' });
    expect(categories.deleteSubcategory).toHaveBeenCalledWith('sub-1');
  });

  it('archives a Subcategory that has history', async () => {
    const categories = {
      findSubcategory: jest.fn().mockResolvedValue(subcategory),
      findSubcategoryHasHistory: jest.fn().mockResolvedValue(true),
      updateSubcategory: jest.fn().mockResolvedValue(subcategory),
      deleteSubcategory: jest.fn(),
    };
    const service = new CategoriesService(users as any, categories as any);

    await expect(
      service.deleteSubcategory('clerk_1', 'sub-1'),
    ).resolves.toEqual({ outcome: 'ARCHIVED' });
    expect(categories.updateSubcategory).toHaveBeenCalledWith('sub-1', {
      archivedAt: expect.any(Date),
    });
    expect(categories.deleteSubcategory).not.toHaveBeenCalled();
  });

  it("refuses another user's Subcategory", async () => {
    const categories = { findSubcategory: jest.fn().mockResolvedValue(null) };
    const service = new CategoriesService(users as any, categories as any);

    await expect(
      service.deleteSubcategory('clerk_1', 'sub-1'),
    ).rejects.toBeInstanceOf(NotFoundError);
  });
});

describe('CategoriesService.createSubcategory', () => {
  it('reports a duplicate name as a conflict', async () => {
    const categories = {
      findCategory: jest.fn().mockResolvedValue({ id: 'housing' }),
      createSubcategory: jest.fn().mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint', {
          code: 'P2002',
          clientVersion: 'test',
        }),
      ),
    };
    const service = new CategoriesService(users as any, categories as any);

    await expect(
      service.createSubcategory('clerk_1', {
        categoryId: 'housing',
        name: 'Rent',
      }),
    ).rejects.toBeInstanceOf(ConflictError);
  });
});
