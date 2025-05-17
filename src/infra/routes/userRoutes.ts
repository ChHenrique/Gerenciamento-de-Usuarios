import { FastifyInstance } from "fastify";
import { userInstance } from "../instances/userInstance";

export function createUserRoute(fastify: FastifyInstance){
    fastify.post('/create', (req, res) => userInstance.create({req, res}))
}   