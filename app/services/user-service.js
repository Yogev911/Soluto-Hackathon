import axios from 'axios';
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
    baseUrl = '192.168.43.198:8080' //https://soluto-hackathon.herokuapp.com'
    objectUrl = '/users';
    static users = [];
    static loggedInUser = null;

    async login(username, password) {
        // let user = await axios.post('192.168.43.198:8080/users',{'email':'A','password':'a'})
        // console.log
        // return user

        if (!username || !password) {
            throw "ERROR - invalid username or password";
        }
        let url = `${this.baseUrl}/login`;
        let user = await axios.post(url, { username, password })
        UserService.loggedInUser = user;
        return user;
    }

    // async register(user){
    //     UserService.users.push(user)
    //     return user;
    // }
}