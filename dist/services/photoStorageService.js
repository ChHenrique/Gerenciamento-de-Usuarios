import { existsSync, mkdirSync } from "fs";
import { randomUUID } from "crypto";
import { join } from "path";
import { writeFile } from "fs/promises";
import { isImgService } from "./isImgService";
import { ServerError } from "../utils/serverError";
export class PhotoStorageService {
    upload;
    constructor(upload = "upload") {
        this.upload = upload;
        if (!existsSync(upload))
            mkdirSync(upload);
    }
    async save(data) {
        if (!(await isImgService.isImage(data.buffer)))
            throw new ServerError("File Media Not Supported", 415);
        const uniqueName = `${randomUUID()}-${data.filename}`;
        const path = join(this.upload, uniqueName);
        await writeFile(path, data.buffer);
        return `upload/${uniqueName}`;
    }
}
