import { IsNotEmpty, IsNumberString } from "class-validator"

export class findOnePost{
    @IsNotEmpty()
    id: string
    
    @IsNumberString()
    @IsNotEmpty()
    postId:number
}