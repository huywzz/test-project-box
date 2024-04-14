import { IsNotEmpty } from "class-validator";


export class User {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    age: number;
}