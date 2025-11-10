import {User} from "./user.model";
import {AppDataSource} from "../../database/ormconfig";

export const UserRepo = AppDataSource.getRepository(User).extend({
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
