import { Request, Response } from "express";
import { UserRepo } from "./user.repository";

export const UserController = {
    getMe: async (req: Request & { user?: any }, res: Response) => {
        const me = await UserRepo.findOneBy({ id: req.user!.id });
        res.json({ success: true, user: me });
    },
};
