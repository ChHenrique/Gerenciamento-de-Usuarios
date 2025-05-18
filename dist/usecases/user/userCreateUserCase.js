import { randomUUID } from "crypto";
import { ServerError } from "../../utils/serverError";
import bcrypt from "bcryptjs";
import { User } from "../../domain/entities/user";
export class UserCreateUserCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const { name, email, password, photoUrl } = data;
        const isEmailExists = await this.userRepository.getUserByEmail(email);
        if (isEmailExists)
            throw new ServerError("This email is already in use", 409);
        const id = randomUUID();
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User(name, email, hashedPassword, photoUrl ?? 'foto legal', id);
        await this.userRepository.createUser(user);
        return user;
    }
}
