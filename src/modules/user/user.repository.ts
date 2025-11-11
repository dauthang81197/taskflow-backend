import {AppDataSource} from "../../database/ormconfig";
import {UserEntity} from "../../shareds/entities";

export const UserRepo = AppDataSource.getRepository(UserEntity).extend({
    async findByEmail(email: string) {
        return this.findOne({where: {email}});
    },
    async findWithPasswordByEmail(email: string) {
        return this.createQueryBuilder("u")
            .addSelect("u.passwordHash")
            .where("u.email = :email", {email})
            .getOne();
    },
    async findByProvider(provider: "local" | "google", providerId: string) {
        return this.findOne({where: {provider, providerId}});
    },
});
