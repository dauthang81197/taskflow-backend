import { Request, Response } from "express";
import { UserRepo } from "./user.repository";
import { UserEntity } from "../../shareds/entities";

export const UserController = {
  getMe: async (req: Request & { user?: UserEntity }, res: Response) => {
    const me = await UserRepo.findOneBy({ id: req.user!.id });
    res.json({ success: true, user: me });
  },
};
