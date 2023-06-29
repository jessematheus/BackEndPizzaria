import prismaClient from "../../prisma";
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    async execute({ name, email, password }: UserRequest) {
        //verificar se enviou o email
        if (!email) {
            throw new Error("Email incorreto")
        }
        //Verificar se esse email já está cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        if (userAlreadyExists) {
            throw new Error("Email já cadastrado anteriormente, por favor informe outro email.")
        }

        const passwordHash = await hash(password, 8)


        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash,
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}
export { CreateUserService }