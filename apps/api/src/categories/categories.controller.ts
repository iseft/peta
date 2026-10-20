import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  createSubcategorySchema,
  updateSubcategorySchema,
  type CategoryDTO,
  type CreateSubcategoryDTO,
  type DeleteSubcategoryResultDTO,
  type SubcategoryDTO,
  type UpdateSubcategoryDTO,
} from '@peta/shared';
import { ClerkUserId } from '../auth/decorators/clerk-user-id.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CategoriesService } from './categories.service';

@Controller()
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Get('categories')
  findCategories(@ClerkUserId() clerkId: string): Promise<CategoryDTO[]> {
    return this.categories.findCategories(clerkId);
  }

  @Post('subcategories')
  createSubcategory(
    @ClerkUserId() clerkId: string,
    @Body(new ZodValidationPipe(createSubcategorySchema))
    body: CreateSubcategoryDTO,
  ): Promise<SubcategoryDTO> {
    return this.categories.createSubcategory(clerkId, body);
  }

  @Patch('subcategories/:id')
  updateSubcategory(
    @ClerkUserId() clerkId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(updateSubcategorySchema))
    body: UpdateSubcategoryDTO,
  ): Promise<SubcategoryDTO> {
    return this.categories.updateSubcategory(clerkId, id, body);
  }

  @Delete('subcategories/:id')
  deleteSubcategory(
    @ClerkUserId() clerkId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DeleteSubcategoryResultDTO> {
    return this.categories.deleteSubcategory(clerkId, id);
  }
}
