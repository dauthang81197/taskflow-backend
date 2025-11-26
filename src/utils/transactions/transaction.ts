import { DataSource, EntityManager } from "typeorm";
import { IsolationLevelEnum, wrapInTransaction } from "./wrap-in-transaction";

export function Transactional(options?: {
  isolation?: IsolationLevelEnum;
  dataSource?: DataSource;
}) {
  const { isolation = IsolationLevelEnum.READ_COMMITTED, dataSource } =
    options || {};
  return function (
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
      const ds: DataSource = dataSource || this.dataSource;
      if (!ds)
        throw new Error(
          `@Transactional: No DataSource found for ${propertyKey}`
        );

      const maybeManager = args.find((a) => a instanceof EntityManager);
      if (maybeManager) {
        return originalMethod.apply(this, args);
      }

      return wrapInTransaction(
        ds,
        async (manager) => {
          return originalMethod.apply(this, [manager, ...args]);
        },
        isolation
      );
    };

    return descriptor;
  };
}
