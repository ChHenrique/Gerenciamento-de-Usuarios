import { fastifyContextDTO } from "../../dto/fastifyContextDTO";
import { userSchemaDTO } from "../../dto/userSchemaDTO";
import { UserCreateUserCase } from "../../usecases/user/userCreateUserCase";
import { MultipartPlugin } from "../plugins/multipart";

export class userControllers {
    constructor(
        private userCreate: UserCreateUserCase,
        private multipart: MultipartPlugin
    ){}

    async create(fastify: fastifyContextDTO){
        const data = await this.multipart.execute(fastify.req)
        const user = await this.userCreate.execute(data)
        fastify.res.status(201).send({message: "User created", ...user})
    }

    

}