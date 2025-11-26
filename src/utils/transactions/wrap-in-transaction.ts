import { DataSource, EntityManager } from "typeorm";
import { IsolationLevel } from "typeorm/driver/types/IsolationLevel";

export enum IsolationLevelEnum {
  READ_UNCOMMITTED = "READ UNCOMMITTED",
  READ_COMMITTED = "READ COMMITTED",
  REPEATABLE_READ = "REPEATABLE READ",
  SERIALIZABLE = "SERIALIZABLE",
}

export async function wrapInTransaction<T>(
  dataSource: DataSource,
  fn: (manager: EntityManager) => Promise<T>,
  isolation: IsolationLevel = "READ COMMITTED",
  maxRetries = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await dataSource.transaction(isolation, fn);
      return result;
    } catch (error: unknown) {
      if (
        isolation === "SERIALIZABLE" &&
        error instanceof Error &&
        error.message.includes("could not serialize access") &&
        attempt < maxRetries
      ) {
        console.warn(`Retrying transaction (${attempt}/${maxRetries})...`);
        continue;
      }

      // Rethrow original error
      throw error;
    }
  }
  throw new Error("Transaction failed after retries");
}
