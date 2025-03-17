export class User {
    private name: string;
    private lastName: string;
    private email: string;
    private password: string;

    constructor(name: string, lastName: string, email: string, password: string) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    toUser(): any {
        return {
            name: this.name,
            lastName: this.lastName,
            email: this.email,
        }
    }
}