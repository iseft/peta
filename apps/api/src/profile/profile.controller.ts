import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import {
  completeOnboardingSchema,
  savePaymentDetailSchema,
  updateProfileSchema,
  type CompleteOnboardingDTO,
  type PaymentDetailDTO,
  type ProfileDTO,
  type SavePaymentDetailDTO,
  type UpdateProfileDTO,
} from '@peta/shared';
import { ClerkUserId } from '../auth/decorators/clerk-user-id.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profile: ProfileService) {}

  @Get()
  getProfile(@ClerkUserId() clerkId: string): Promise<ProfileDTO> {
    return this.profile.getProfile(clerkId);
  }

  @Post('onboarding')
  completeOnboarding(
    @ClerkUserId() clerkId: string,
    @Body(new ZodValidationPipe(completeOnboardingSchema))
    body: CompleteOnboardingDTO,
  ): Promise<ProfileDTO> {
    return this.profile.completeOnboarding(clerkId, body);
  }

  @Patch()
  updateProfile(
    @ClerkUserId() clerkId: string,
    @Body(new ZodValidationPipe(updateProfileSchema)) body: UpdateProfileDTO,
  ): Promise<ProfileDTO> {
    return this.profile.updateProfile(clerkId, body);
  }

  @Post('payment-details')
  createPaymentDetail(
    @ClerkUserId() clerkId: string,
    @Body(new ZodValidationPipe(savePaymentDetailSchema))
    body: SavePaymentDetailDTO,
  ): Promise<PaymentDetailDTO> {
    return this.profile.createPaymentDetail(clerkId, body);
  }

  @Put('payment-details/:id')
  updatePaymentDetail(
    @ClerkUserId() clerkId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body(new ZodValidationPipe(savePaymentDetailSchema))
    body: SavePaymentDetailDTO,
  ): Promise<PaymentDetailDTO> {
    return this.profile.updatePaymentDetail(clerkId, id, body);
  }

  @Delete('payment-details/:id')
  @HttpCode(204)
  deletePaymentDetail(
    @ClerkUserId() clerkId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return this.profile.deletePaymentDetail(clerkId, id);
  }
}
