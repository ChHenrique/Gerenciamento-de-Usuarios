import { User } from "../entities/user";

export interface IUserRepository {
    getUsers(): Promise<User[]>
    getUserByEmail(email: string): Promise<User|null>
    createUser(user: User): Promise<User|null>
    updateUser(user: User): Promise<User|null>
    deleteUser(id: string): Promise<void>
}