import fastifyStatic from '@fastify/static';
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export function staticFilePlugin(fastify) {
    fastify.register(fastifyStatic, {
        root: join(__dirname, '../../../upload'),
        prefix: '/upload/',
    });
}
