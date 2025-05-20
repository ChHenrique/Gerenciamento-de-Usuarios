import { PhotoStorageService } from "../../services/photoStorageService";
import { UserCreateUserCase } from "../../usecases/user/userCreateUserCase";
import { userUpdateUserCase } from "../../usecases/user/userUpdateUserCase";
import { userControllers } from "../controllers/userControllers";
import { IPrismaUserRepository } from "../database/IPrismaUserRepository";
import { MultipartPlugin } from "../plugins/multipart";

const prismaRepository = new IPrismaUserRepository()
const photoStorageService = new PhotoStorageService()
const createUserCase = new UserCreateUserCase(prismaRepository)
const updateUserCase = new userUpdateUserCase(prismaRepository)
const multipart = new MultipartPlugin(photoStorageService)

export const userInstance = new userControllers(createUserCase, multipart, updateUserCase)