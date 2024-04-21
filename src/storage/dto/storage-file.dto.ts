export class StorageFileDTO{
    userId: number
    path: string
    constructor(_userId: number, _path: string) {
        this.userId = _userId
        this.path=_path
    }
}