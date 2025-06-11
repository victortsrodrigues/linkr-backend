import { UserProfile } from "../protocols/userProtocol";
import { userRepository } from "../repositories/userRepository";

async function editProfile(userId: number, profile: UserProfile) {
    return await userRepository.editProfile(userId, profile)
}

export const userService = {
    editProfile
}