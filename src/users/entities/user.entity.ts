import { Keys } from 'src/keys/key.entity';
import { File } from 'src/storage/entities/file.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
        @PrimaryGeneratedColumn()
        id: number;

        @Column()
        username:string
        
        @Column()
        password:string
        
        @Column({ nullable: true })
        name: string;

        @Column({ type: 'text', nullable: true })
        description: string;

        @Column({ type: 'boolean', default: true })
        active: boolean;

        @OneToMany(() => Keys, (key) => key.user)
        keys: Keys[]

        @OneToMany(() => File, (file) => file.user)
        files: File[]
}
