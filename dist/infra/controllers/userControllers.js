export class userControllers {
    userCreate;
    multipart;
    constructor(userCreate, multipart) {
        this.userCreate = userCreate;
        this.multipart = multipart;
    }
    async create(fastify) {
        const data = await this.multipart.execute(fastify.req);
        const user = await this.userCreate.execute(data);
        fastify.res.status(201).send({ message: "User created", ...user });
    }
}
