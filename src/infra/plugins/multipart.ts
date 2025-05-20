import { FastifyRequest } from "fastify";
import { photoStorageInterface } from "../../interfaces/photoStorageInterface";
import { userSchema } from "../../schemas/user.Schema";
import { ServerError } from "../../utils/serverError";

export class MultipartPlugin { 
    constructor(private photoStorage: photoStorageInterface){}
    async execute(req: FastifyRequest){
        // campos do multipart da requisição
        const parts = req.parts()
        // meus campos para enviar pro use-case
        const rawfields: any = {}
        // variavel da foto
        let photoUrl: string = "photo"

        for await(const part of parts){
            if(part.type === "file" && part.filename){
                const buffer = await part.toBuffer();
                const { filename, mimetype } = part;
                photoUrl = await this.photoStorage.save({filename, mimetype, buffer})
                rawfields['photoUrl'] = photoUrl
            } else if(part.type === "field"){
                rawfields[part.fieldname] = part.value
            }
        }
        
        return rawfields;
    }
}