import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signUp(email: string, password: string) {
        const user = await this.usersService.find(email)
        if (user.length > 0) throw new BadRequestException("email in use");
        
        const salt = 10;

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser =  await this.usersService.create(email, hashedPassword);
        return newUser;
    }

    async signIn(email: string, password: string) {
        const user = await this.usersService.find(email)
        if (user.length === 0) throw new NotFoundException("no user exists with email");
        const passwordCheck = await bcrypt.compare(password, user[0].password);
        if (!passwordCheck) throw new BadRequestException("invalid password");
        
        return user[0]
    }
}