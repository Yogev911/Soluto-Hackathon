export class User {
    id;
    username;
    phoneNumber;
    email;
    photo;
    constructor(user) {
        if (user) {
            this.id = user.id;
            this.username = user.username;
            this.phoneNumber = user.phoneNumber;
            this.email = user.email;
            this.photo = user.photo;
        }
    }
}

var user = new User({
    id:'324234234',
    username: 'Ori Amd',
    phoneNumber: '0545249663',
    email: 'ori.a@gmail.com',
    photo: 'dsfsdfwdfd'
});

export class UserService {
    baseUrl = '/users';
    static users = [];
    static loggedInUser = null;

    async login(username, password){
        user.username = username;
        UserService.loggedInUser = user;
        return user;
    }

    async register(user){
        UserService.users.push(user)
        return user;
    }
}