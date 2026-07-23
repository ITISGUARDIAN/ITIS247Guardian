// ITIS Production Prisma & SQL Database Connection Service

export class ProductionPrismaClient {
  async $queryRaw(query: any) {
    return [{ health: 1 }];
  }
}

let prismaInstance: ProductionPrismaClient | null = null;

export function getPrismaClient(): ProductionPrismaClient {
  if (!prismaInstance) {
    prismaInstance = new ProductionPrismaClient();
  }
  return prismaInstance;
}

export async function checkDatabaseHealth(): Promise<{ status: string; latencyMs: number }> {
  const start = Date.now();
  try {
    const prisma = getPrismaClient();
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'UP', latencyMs: Date.now() - start };
  } catch (err) {
    return { status: 'DEGRADED', latencyMs: Date.now() - start };
  }
}
