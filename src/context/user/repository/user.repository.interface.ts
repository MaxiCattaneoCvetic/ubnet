export interface UserRepositoryInterface {
    saveUser(user: any): Promise<any>
}