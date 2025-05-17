import { existsSync, mkdirSync } from "fs";
import { photoStorageInterface } from "../interfaces/photoStorageInterface";
import { randomUUID } from "crypto";
import { join } from "path";
import { photoStorageDTO } from "../dto/photoStorageDTO";
import { writeFile } from "fs/promises";
import { isImgService } from "./isImgService";
import { ServerError } from "../utils/serverError";

export class PhotoStorageService implements photoStorageInterface{
    constructor(
        private upload = "upload"
    ){
        if (!existsSync(upload)) mkdirSync(upload)
    }

    async save(data: photoStorageDTO): Promise<string> {
        if (!(await isImgService.isImage(data.buffer))) throw new ServerError("File Media Not Supported", 415)
        const uniqueName = `${randomUUID()}-${data.filename}`
        const path = join(this.upload, uniqueName);
        await writeFile(path, data.buffer )

        return `upload/${uniqueName}`
    }
}