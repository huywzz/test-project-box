import { User } from "src/users/entities/user.entity"

export class SaveKey{
    publicKey: string
    privateKey: string
    refreshToken: string
    userId: number
    constructor(publicKey:string,privateKey:string,refreshToken:string,userId:number) {
        this.privateKey = privateKey
        this.publicKey = publicKey
        this.refreshToken = refreshToken
        this.userId = userId;
    }
}