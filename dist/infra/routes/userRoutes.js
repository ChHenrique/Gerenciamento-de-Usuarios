import { userInstance } from "../instances/userInstance";
export function createUserRoute(fastify) {
    fastify.post('/create', (req, res) => userInstance.create({ req, res }));
}
