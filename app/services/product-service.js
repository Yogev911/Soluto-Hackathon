
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
    
    static products = [];

    async getProducts(){
        return ProductService.products;
    }

    async likeProduct(productId){
        return true
    }

    async dislikeProduct(productId){
        return true
    }
}