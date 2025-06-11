import prismaClient from "../database/client";
import { UserProfile } from "../protocols/userProtocol";

async function editProfile(userId: number, profile:UserProfile) {
    return await prismaClient.user.update({
        where: {
            id: userId,
        },
        data: profile
    })
}


export const userRepository = {
    editProfile
}