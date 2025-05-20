import { FastifyInstance } from "fastify";
import { userInstance } from "../instances/userInstance";

export function createUserRoute(fastify: FastifyInstance){
    fastify.post('/create', (req, res) => userInstance.create({req, res}))
}   

export function updateUserRoute(fastify: FastifyInstance){
    fastify.put('/update/:id', (req, res) => userInstance.update({req, res}))
}