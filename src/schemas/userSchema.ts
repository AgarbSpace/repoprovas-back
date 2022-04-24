import joi from "joi"
import { CreateUserData } from "../services/userService"

export const userSchema = joi.object<CreateUserData>({
    email: joi.string().email().required(),
    password: joi.string().required()
})