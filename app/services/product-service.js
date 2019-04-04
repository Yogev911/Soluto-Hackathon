import img1 from '../assets/image1.jpeg';
import img2 from '../assets/image2.jpeg';
import img3 from '../assets/image3.jpeg';
import img4 from '../assets/image4.jpeg';
import img5 from '../assets/image5.jpeg';
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
    baseUrl = '/products';

    static products = [];

    async getProducts(){
        const cards = [
            { id: '1', image: img1, isActive: true },
            { id: '2', image: img2, isActive: false },
            { id: '3', image: img3, isActive: false },
            { id: '4', image: img4, isActive: false },
            { id: '5', image: img5, isActive: false },
        ];
        return cards;
        //return ProductService.products;
    }

    async likeProduct(productId){
        return true
    }

    async dislikeProduct(productId){
        return true
    }
}