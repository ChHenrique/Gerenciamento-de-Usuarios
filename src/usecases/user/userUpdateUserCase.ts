import { IUserRepository } from "../../domain/repositorys/IUserRepository";
import { userSchemaDTO } from "../../dto/userSchemaDTO";
import { userSchema } from "../../schemas/user.Schema";
import { ServerError } from "../../utils/serverError";
import bcrypt from 'bcryptjs'

export class userUpdateUserCase {
    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(data: userSchemaDTO, id: string) {
        const parsedData = userSchema.partial().safeParse(data)
        if (!parsedData.success) throw new ServerError("Bad Request")

        const { name, email, password, photoUrl } = data

        const userExists = await this.userRepository.getUserById(id)
        if (!userExists) throw new ServerError("User not found", 404)

        if (email !== userExists.email) {
            const isEmailExists = await this.userRepository.getUserByEmail(email)
            if (isEmailExists) throw new ServerError("Email already in use", 409)
        }

        if (name) userExists.name = name
        if (email) userExists.email = email
        if (password) userExists.password = await bcrypt.hash(password, 10)
        if (photoUrl) userExists.photoUrl = photoUrl

        await this.userRepository.updateUser(userExists)

        return userExists
    }
}
