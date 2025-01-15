import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service"
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("AuthService", () => {
    let service: AuthService;
    let fakeUsersService: Partial<UsersService>

    beforeEach(async () => {
        const users: User[] = [];
        fakeUsersService = {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers)
            },
            create: (email: string, password: string) => {
                const user = {
                    id: Math.floor(Math.random() * 99999), 
                    email, 
                    password
                } as User;
                users.push(user);
                return Promise.resolve(user);
            }
        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ],
        }).compile();

        service = module.get(AuthService);
    });

    it("can create an instance of auth service", async () => {

        expect(service).toBeDefined();
    });

    it("can create a new user with a hashed password", async () => {
        const email = "test@gmail.com";
        const password = "password";
        const user = await service.signUp(email, password);

        expect(user.email).toEqual(email);
        expect(user.password).not.toEqual(password)
    });

    it("throws an error if user signs up with email that is in use", async () => {
        const email = "test@gmail.com";
        const password = "password";

        await service.signUp(email, password)
        await expect(service.signUp(email, password)).rejects.toThrow(
            BadRequestException,
        );
    })

    it("throws an error if user a user signs in with a invalid email", async () => {
        const email = "test@gmail.com";
        const password = "password";
        await expect(service.signIn(email, password)).rejects.toThrow(
            NotFoundException,
        );
    })

    it("throws an error if a user enters an invalid password", async () => {
        const email = "test@gmail.com";
        const password = "password";
        
        await service.signUp(email, password)
        await expect(service.signIn(email, password + "123")).rejects.toThrow(
            BadRequestException,
        );
    })
    
    it("returns a user if correct credentials are provided", async () => {
        const email = "test@gmail.com";
        const password = "1234";
        
        await service.signUp(email, password);
        
        const user = await service.signIn(email, password);
        expect(user).toBeDefined();
    })
});
