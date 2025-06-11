import { Request, Response } from "express";
import { userService } from "../services/userService";

async function editProfile(req: Request, res: Response) {
    const profileEdit = req.body;
    const user = res.locals.user;

    const editedProfile = await userService.editProfile(user.id,profileEdit)

    res.status(201).send(editedProfile)
}

export const userController = {
    editProfile
}