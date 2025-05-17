import { z } from "zod";
import { userSchema } from "../schemas/user.Schema";

export type userSchemaDTO = z.infer<typeof userSchema>