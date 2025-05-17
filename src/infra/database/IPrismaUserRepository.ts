import { prisma } from "../../config/prisma";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositorys/IUserRepository";

 export class IPrismaUserRepository implements IUserRepository {
    async getUsers(): Promise<User[]> {
        const users = await prisma.user.findMany()
        return users
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email } 
        })
        return user
    }
    async createUser(user: User): Promise<User | null> {
        const data = await prisma.user.create({
            data: { 
                id: user.id ?? '',
                name: user.name,
                email: user.email,
                password: user.password,
                photoUrl: user.photoUrl ?? 'foto legal'
            }
        })

        return data
    }

    async updateUser(user: User): Promise<User | null> {
        const data = await prisma.user.update({
            where: {id: user.id},
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                photoUrl: user.photoUrl
            }
        })

        return data
    }

    async deleteUser(id: string): Promise<void> {
        await prisma.user.delete({
            where: {id}
        })
    }
}