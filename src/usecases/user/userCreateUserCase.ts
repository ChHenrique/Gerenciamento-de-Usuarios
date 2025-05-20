import { randomUUID } from "crypto";
import { IUserRepository } from "../../domain/repositorys/IUserRepository";
import { userSchemaDTO } from "../../dto/userSchemaDTO";
import { ServerError } from "../../utils/serverError";
import bcrypt from "bcryptjs";
import { User } from "../../domain/entities/user";
import { userSchema } from "../../schemas/user.Schema";

export class UserCreateUserCase {
    constructor(
        private userRepository: IUserRepository
    ){}

    async execute(data: userSchemaDTO){

        const parsedData = userSchema.safeParse(data);
        if (!parsedData.success) throw new ServerError("Bad Request");

        const { name, email, password, photoUrl } = data

        const isEmailExists = await this.userRepository.getUserByEmail(email)
        if (isEmailExists) throw new ServerError("This email is already in use", 409) 
        
        const id = randomUUID()
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User(name, email, hashedPassword, photoUrl ?? 'foto legal', id)
        await this.userRepository.createUser(user)

        return user
    }
}