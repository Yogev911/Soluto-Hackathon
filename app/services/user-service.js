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

// var user = new User({
//     id: '324234234',
//     username: 'Ori Amd',
//     phoneNumber: '0545249663',
//     email: 'ori.a@gmail.com',
//     photo: 'dsfsdfwdfd'
// });

export class UserService {
    baseUrl = 'https://soluto-hackathon.herokuapp.com'
    objectUrl = '/users';
    static users = [];
    static loggedInUser = null;

    async login(username, password) {
        if (!username || !password) {
            throw "ERROR - invalid username or password";
        }
        let url = `${baseUrl}/login`;
        user = await axios.post(url, { username, password })
        UserService.loggedInUser = user;
        return user;
    }

    // async register(user){
    //     UserService.users.push(user)
    //     return user;
    // }
}