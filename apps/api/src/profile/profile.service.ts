import { Injectable } from '@nestjs/common';
import type { Prisma } from '@db';
import type {
  CompleteOnboardingDTO,
  OpeningBalanceDTO,
  PaymentDetailDTO,
  ProfileDTO,
  SavePaymentDetailDTO,
  UpdateProfileDTO,
} from '@peta/shared';
import { ClerkUsersClient } from '../auth/clerk-users.client';
import { parseDateOnly } from '../common/dates/date-only';
import { ConflictError } from '../common/exceptions/conflict-error';
import { NotFoundError } from '../common/exceptions/not-found-error';
import { ExchangeRatesService } from '../exchange-rates/exchange-rates.service';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { toPaymentDetailDTO, toProfileDTO } from './profile.mapper';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    private readonly usersService: UsersService,
    private readonly users: UsersRepository,
    private readonly profile: ProfileRepository,
    private readonly clerkUsers: ClerkUsersClient,
    private readonly exchangeRates: ExchangeRatesService,
  ) {}

  async getProfile(clerkId: string): Promise<ProfileDTO> {
    const user = await this.usersService.getOrCreateUser(clerkId);
    const [email, paymentDetails] = await Promise.all([
      this.clerkUsers.findPrimaryEmail(clerkId),
      this.profile.findPaymentDetails(user.id),
    ]);
    return toProfileDTO(user, email, paymentDetails);
  }

  // The Default Currency is only set here: changing it later means
  // recalculating every stored rate (ADR 0002), which is not built yet.
  async completeOnboarding(
    clerkId: string,
    input: CompleteOnboardingDTO,
  ): Promise<ProfileDTO> {
    const user = await this.usersService.getOrCreateUser(clerkId);
    if (user.onboardedAt) {
      throw new ConflictError('Onboarding is already complete');
    }
    await this.users.updateUser(user.id, {
      defaultCurrency: input.defaultCurrency,
      emergencyFundTargetMonths: input.emergencyFundTargetMonths,
      onboardedAt: new Date(),
      ...(await this.openingBalanceFields(
        input.openingBalance,
        input.defaultCurrency,
      )),
    });
    return this.getProfile(clerkId);
  }

  async updateProfile(
    clerkId: string,
    input: UpdateProfileDTO,
  ): Promise<ProfileDTO> {
    const user = await this.usersService.getOnboardedUser(clerkId);
    await this.users.updateUser(user.id, {
      name: input.name,
      emergencyFundTargetMonths: input.emergencyFundTargetMonths,
      ...(input.openingBalance &&
        (await this.openingBalanceFields(
          input.openingBalance,
          user.defaultCurrency,
        ))),
    });
    return this.getProfile(clerkId);
  }

  async createPaymentDetail(
    clerkId: string,
    input: SavePaymentDetailDTO,
  ): Promise<PaymentDetailDTO> {
    const user = await this.usersService.getOrCreateUser(clerkId);
    const existing = await this.profile.findPaymentDetails(user.id);
    const detail = await this.profile.createPaymentDetail({
      userId: user.id,
      label: input.label,
      holderName: input.holderName ?? null,
      value: input.value,
      position: existing.length,
    });
    return toPaymentDetailDTO(detail);
  }

  async updatePaymentDetail(
    clerkId: string,
    id: string,
    input: SavePaymentDetailDTO,
  ): Promise<PaymentDetailDTO> {
    const user = await this.usersService.getOrCreateUser(clerkId);
    await this.requirePaymentDetail(user.id, id);
    const detail = await this.profile.updatePaymentDetail(id, {
      label: input.label,
      holderName: input.holderName ?? null,
      value: input.value,
    });
    return toPaymentDetailDTO(detail);
  }

  async deletePaymentDetail(clerkId: string, id: string): Promise<void> {
    const user = await this.usersService.getOrCreateUser(clerkId);
    await this.requirePaymentDetail(user.id, id);
    await this.profile.deletePaymentDetail(id);
  }

  private async requirePaymentDetail(userId: string, id: string) {
    const detail = await this.profile.findPaymentDetail(userId, id);
    if (!detail) throw new NotFoundError('Payment Details not found');
  }

  private async openingBalanceFields(
    openingBalance: OpeningBalanceDTO,
    defaultCurrency: string,
  ): Promise<Prisma.UserUpdateInput> {
    return {
      openingBalanceMinor: BigInt(openingBalance.amountMinor),
      openingBalanceCurrency: openingBalance.currency,
      openingBalanceDate: parseDateOnly(openingBalance.date),
      openingBalanceRate: await this.exchangeRates.findRate(
        openingBalance.currency,
        defaultCurrency,
        openingBalance.date,
      ),
    };
  }
}
