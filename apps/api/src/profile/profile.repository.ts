import { Injectable } from '@nestjs/common';
import type { PaymentDetail, Prisma } from '@db';
import { PrismaDbService } from '../prisma-db/prisma-db.service';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaDbService) {}

  findPaymentDetails(userId: string): Promise<PaymentDetail[]> {
    return this.prisma.paymentDetail.findMany({
      where: { userId },
      orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
    });
  }

  findPaymentDetail(userId: string, id: string): Promise<PaymentDetail | null> {
    return this.prisma.paymentDetail.findFirst({ where: { id, userId } });
  }

  createPaymentDetail(
    data: Prisma.PaymentDetailUncheckedCreateInput,
  ): Promise<PaymentDetail> {
    return this.prisma.paymentDetail.create({ data });
  }

  updatePaymentDetail(
    id: string,
    data: Prisma.PaymentDetailUpdateInput,
  ): Promise<PaymentDetail> {
    return this.prisma.paymentDetail.update({ where: { id }, data });
  }

  async deletePaymentDetail(id: string): Promise<void> {
    await this.prisma.paymentDetail.delete({ where: { id } });
  }
}
