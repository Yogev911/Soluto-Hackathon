import img1 from '../assets/image1.jpeg';
import img2 from '../assets/image2.jpeg';
import img3 from '../assets/image3.jpeg';
import img4 from '../assets/image4.jpeg';
import img5 from '../assets/image5.jpeg';
import {users, UserService} from './user-service';
import axios from 'axios';

export class Product {
    name;
    photo;
    constructor(product) {
        if (user) {
            this.name = product.name;
            this.photo = product.photo;
        }
    }
}


export class ProductService {
    baseUrl = '192.168.43.198:8080'//'https://soluto-hackathon.herokuapp.com'
    objectUrl = '/products';

    static products = [];

    getUserId(){
        return UserService.loggedInUser.user_id
    }

    async getProducts(){
        let url = `${this.baseUrl}${this.objectUrl}/`;
        let user_id = this.getUserId();
        
        return await axios.get(url,{headers:{user_id:user_id},data:{amount:50}})
    
        // const cards = [
        //     { id: '1', image: img1, isActive: true },
        //     { id: '2', image: img2, isActive: false },
        //     { id: '3', image: img3, isActive: false },
        //     { id: '4', image: img4, isActive: false },
        //     { id: '5', image: img5, isActive: false },
        // ];
        //return axios.get(url,{headers:{user_id:user_id}})
        //return ProductService.products;
    }

    async updateProduct(productId, isLike){
        if(!productId){
            throw "ERROR - invalid product id";
        }

        let url = `${this.baseUrl}${this.objectUrl}/${productId}/${isLike?1:2}`;
        let user_id = this.getUserId();
        
        return axios.get(url,{headers:{user_id:user_id}})
    }

    async likeProduct(productId){
        console.log('ProductService.likeProduct called')
        return true;
        return this.updateProduct(productId, true)
    }

    async dislikeProduct(productId){
        console.log('ProductService.dislikeProduct called')
        return true;
        return this.updateProduct(productId, false)
    }
}