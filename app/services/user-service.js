
export class User {
    name;
    phoneNumber;
    email;
    photo;
    constructor(user) {
        if (user) {
            this.name = user.name;
            this.phoneNumber = user.phoneNumber;
            this.email = user.email;
            this.photo = user.photo;
        }
    }
}



export class UserService {

    static users = [];

    async register(user){
        UserService.users.push(user)
        return user;
    }
}