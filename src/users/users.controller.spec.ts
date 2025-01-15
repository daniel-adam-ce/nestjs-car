import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: "123", password: "456" } as User)
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: "123" } as User])
      },
      // remove: () => { },
      // update: () => { },
    };

    fakeAuthService = {
      signIn: (_: string, _1: string) => {
        return Promise.resolve({ id: 1 } as User)
      },
      // signUp: () => { },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("findAllUsers should find all users with a given email", async () => {
    const users = await controller.findAllUsers("1234");
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual("1234")
  })


  it("findUser should find a user given an id", async () => {
    const user = await controller.findUser("1");
    expect(user).toBeDefined()
    expect(user.id).toEqual(1)
  })

  it('findUser throws an error if user with given id is not found', async () => {
    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  it("signIn should return a user and set the session userId", async () => {
    const session = { userId: -1 };
    const user = await controller.signIn(
      { email: "123", password: "456" },
      session
    )

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  })
});
