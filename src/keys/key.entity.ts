import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'keys'})
export class Keys{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    publicKey: string
    
    @Column()
    privateKey: string
    
    @Column()
    refreshToken: string
    
    @Column({ type: 'boolean', default: false })
    isOldRF: boolean
    
    @ManyToOne(() => User, (user) => user.keys)
    user: User
    
    @Column()
    userId:number

}