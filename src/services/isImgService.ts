import { fileTypeFromBuffer } from "file-type";

class IsImgService{
    async isImage(buffer: Buffer): Promise<boolean> {
        const type = await fileTypeFromBuffer(buffer)
        console.log("Detected file type:", type); // Para debugging
        if (!type) return false 
        return type.mime.startsWith("image/")
    }
}

export const isImgService = new IsImgService()