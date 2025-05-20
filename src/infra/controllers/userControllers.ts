import { fastifyContextDTO } from "../../dto/fastifyContextDTO";
import { userSchemaDTO } from "../../dto/userSchemaDTO";
import { UserCreateUserCase } from "../../usecases/user/userCreateUserCase";
import { userUpdateUserCase } from "../../usecases/user/userUpdateUserCase";
import { MultipartPlugin } from "../plugins/multipart";

export class userControllers {
    constructor(
        private userCreate: UserCreateUserCase,
        private multipart: MultipartPlugin,
        private userUpdate: userUpdateUserCase
    ){}

    async create(fastify: fastifyContextDTO){
        const data = await this.multipart.execute(fastify.req)
        const user = await this.userCreate.execute(data)
        fastify.res.status(201).send({message: "User created", ...user})
    }

    async update(fastify: fastifyContextDTO){
        const data = await this.multipart.execute(fastify.req)
        const { id } = fastify.req.params as {id: string}
        const user = await this.userUpdate.execute(data, id)
        fastify.res.send(({message: "User updated", ...user}))
    }



    

}