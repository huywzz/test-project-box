import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('files')
export class File{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    path: string
    
    @Column()
    userId: number
    
    @ManyToOne(() => User, (user) => user.files)
    user:User
    
}