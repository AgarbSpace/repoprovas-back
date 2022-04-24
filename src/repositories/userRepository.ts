import client from "../database.js";
import { CreateUserData } from "../services/userService.js";

async function findByEmail(email: string){
    const user = await client.users.findUnique({
        where: {
            email: email
        }
    });

    return user;
}

async function findById(id: number){
    const user = await client.users.findUnique({
        where:{
            id: id
        }
    });
    return user;
}

async function insertUser(userData: CreateUserData){
    await client.users.create({
        data: userData
    });
}

export default {
    findByEmail,
    findById,
    insertUser
}