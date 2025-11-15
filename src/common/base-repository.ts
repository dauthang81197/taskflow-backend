import { Repository, ObjectLiteral, EntityManager } from "typeorm";
import { PaginationParams, PaginationResult } from "../interfaces";
import { AppDataSource } from '../database/ormconfig';


export class TypeORMRepository<T extends ObjectLiteral> {
    protected repo: Repository<T>;

    constructor(entity: any, manager?: EntityManager) {
        this.repo = (manager ?? AppDataSource).getRepository(entity);
    }

    async list(query: PaginationParams<T>): Promise<PaginationResult<T>> {
        const {limit = 10, page = 1} = query;
        let queryBuilder = query.queryBuilder;

        if (!queryBuilder) {
            queryBuilder = this.repo.createQueryBuilder("document").orderBy(
                "document.createdAt",
                "ASC"
            );
        }

        const [data, count] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return {
            data,
            count,
            currentPage: page,
            totalPage: Math.ceil(count / limit),
        };
    }
}
