import { users } from "@prisma/client";
import userRepository from "../repositories/userRepository.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export type CreateUserData = Omit<users, "id">;

async function findUserById(id: number){
    const user = await userRepository.findById(id);
    if(!user){
        throw{
            type:"Not_Found",
            message: "User does not"
        }
    }

    delete user.password;
    return user;
}

async function createUser(userData: CreateUserData){
    const userExists = await userRepository.findByEmail(userData.email);
    
    if(userExists){
        throw {
            type: "Conflict",
            message: "Email already in use"
        }
    }

    const hashedpassword = bcrypt.hashSync(userData.password, 12);
    await userRepository.insertUser({...userData, password: hashedpassword});
}

async function getToken(userData: CreateUserData){
    const user = await userRepository.findByEmail(userData.email);
    if(!user){
        throw {
            type: "Unauthorized",
            message: "Invalid credentials"
        }
    }

    const isValidPassword = bcrypt.compareSync(userData.password, user.password);
    if(!isValidPassword){
        throw{
            type: "Unauthorized",
            message: "Invalid credentials"
        }
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET);

    return token;
}

export default{
    findUserById,
    createUser,
    getToken
}

