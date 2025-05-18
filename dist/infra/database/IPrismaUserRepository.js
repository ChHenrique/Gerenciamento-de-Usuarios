import { prisma } from "../../config/prisma";
export class IPrismaUserRepository {
    async getUsers() {
        const users = await prisma.user.findMany();
        return users;
    }
    async getUserByEmail(email) {
        const user = await prisma.user.findUnique({
            where: { email }
        });
        return user;
    }
    async createUser(user) {
        const data = await prisma.user.create({
            data: {
                id: user.id ?? '',
                name: user.name,
                email: user.email,
                password: user.password,
                photoUrl: user.photoUrl ?? 'foto legal'
            }
        });
        return data;
    }
    async updateUser(user) {
        const data = await prisma.user.update({
            where: { id: user.id },
            data: {
                name: user.name,
                email: user.email,
                password: user.password,
                photoUrl: user.photoUrl
            }
        });
        return data;
    }
    async deleteUser(id) {
        await prisma.user.delete({
            where: { id }
        });
    }
}
