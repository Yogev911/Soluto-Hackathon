import json

from flask_restful_swagger_2 import Resource, swagger
from flask import request

from backend.db_util import DbClient
from backend.resources.products.swagger_doc import products_post

db_client = DbClient()


class Products(Resource):
    @swagger.doc(products_post)
    def post(self):
        return f"ok", 200

    @swagger.doc(products_post)
    def get(self):
        # user = db_client.get_user_by_id(user_id)
        # products_ids = [prod['id]'] for prod in db_client.get_products()]
        # f_products = set(products_ids) - set(user['products']) - set(user['likes']) -set(user['dislikes'])
        # return f_products[:amount] , 200
        data = json.loads(request.data)
        user_id = request.headers.get('user_id')
        amount = data.get('amount', 0)
        user = db_client.get_user_by_id(user_id)
        products = db_client.get_products()
        unseen_products = []
        for product in products:
            if product['sale_status'] != "Available":
                continue
            if product['_id'] not in user['likes'] and product not in user['dislikes'] and \
                    product['_id'] not in user['products']:
                unseen_products.append(product)
        return unseen_products[:amount], 200

    @swagger.doc(products_post)
    def put(self):
        return f"ok", 200

    @swagger.doc(products_post)
    def delete(self):
        return f"ok", 200


class ProductsLikes(Resource):
    @swagger.doc(products_post)
    def post(self, product_id, like):
        user_id = request.headers.get('user_id')
        return f"item {product_id} is {'liked!' if like else 'disliked=/'} by user {user_id}", 200

    @swagger.doc(products_post)
    def get(self, product_id, like):
        user_id = request.headers.get('user_id')
        return f"item {product_id} is {'liked!' if like else 'disliked=/'} by user {user_id}", 200

    @swagger.doc(products_post)
    def put(self, product_id, like):
        user_id = request.headers.get('user_id')
        if like:
            db_client.like_product(user_id, product_id)
            if True:
                return "match found with id 34", 200
        else:
            db_client.dislike_product(user_id, product_id)
        return f"item {product_id} is {'liked!' if like else 'disliked=/'} by user {user_id}", 200

    @swagger.doc(products_post)
    def delete(self, product_id, like):
        user_id = request.headers.get('user_id')
        return f"item {product_id} is {'liked!' if like else 'disliked=/'} by user {user_id}", 200
