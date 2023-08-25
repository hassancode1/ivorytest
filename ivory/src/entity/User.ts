import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    password: string

    @Column({ unique: true })
    email: string

    @Column()
    isAdmin: boolean

    @Column()
    isActive: boolean

}

@Entity()
export class Wallet {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @Column()
    user_id: number

}

