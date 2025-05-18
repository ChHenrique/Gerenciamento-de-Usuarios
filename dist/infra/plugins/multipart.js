import { userSchema } from "../../schemas/user.Schema";
import { ServerError } from "../../utils/serverError";
export class MultipartPlugin {
    photoStorage;
    constructor(photoStorage) {
        this.photoStorage = photoStorage;
    }
    async execute(req) {
        // campos do multipart da requisição
        const parts = req.parts();
        // meus campos para enviar pro use-case
        const rawfields = {};
        // variavel da foto
        let photoUrl = "photo";
        for await (const part of parts) {
            if (part.type === "file" && part.filename) {
                const buffer = await part.toBuffer();
                const { filename, mimetype } = part;
                photoUrl = await this.photoStorage.save({ filename, mimetype, buffer });
                rawfields['photoUrl'] = photoUrl;
            }
            else if (part.type === "field") {
                rawfields[part.fieldname] = part.value;
            }
        }
        const parsedData = userSchema.safeParse(rawfields);
        if (!parsedData.success)
            throw new ServerError("Bad Request");
        return parsedData.data;
    }
}
