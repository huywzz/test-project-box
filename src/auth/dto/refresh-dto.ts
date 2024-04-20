
export class RefreshDTO{
    refreshToken: string
    userId: number
    constructor(_refreshToken: string, _userId: number) {
        this.refreshToken = _refreshToken
        this.userId=_userId
    }
}