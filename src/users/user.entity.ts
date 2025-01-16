import { Report } from "../reports/report.entity";
import { AfterInsert, AfterRemove, AfterUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    password: string;

    // change later to false
    @Column({default: true})
    admin: boolean;

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];

    @AfterInsert()
    logInsert() {
        console.log('Inserted User with id: ', this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log("Updated user with id: ", this.id)
    }

    @AfterRemove()
    logRemove(){
        console.log("Deleted user with id: ", this.id)
    }
}