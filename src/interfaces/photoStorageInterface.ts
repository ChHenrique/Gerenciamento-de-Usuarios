import { photoStorageDTO } from "../dto/photoStorageDTO";

export interface photoStorageInterface {
    save(data: photoStorageDTO): Promise<string>
}