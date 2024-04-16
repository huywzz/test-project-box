import { IsNotEmpty } from "class-validator";

export class SignInDTo{

    @IsNotEmpty()
    username: string
    @IsNotEmpty()
    password:string

}