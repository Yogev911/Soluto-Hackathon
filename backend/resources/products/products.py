import json
import datetime
from bson import ObjectId
from flask_restful_swagger_2 import Resource, swagger
from flask import request

from backend.db_util import DbClient
from backend.resources.products.swagger_doc import products_post

db_client = DbClient()


class Products(Resource):
    @swagger.doc(products_post)
    def post(self):
        user_id = request.headers.get('user_id')
        product = {
            "name": request.json["name"],
            "catagory": request.json["catagory"],
            "price": request.json["price"],
            "desecription": request.json["desecription"],
            "image_path": request.json["image_path"],
            "condition": request.json["condition"],
            "sale_status": request.json["sale_status"],
            "post_date": datetime.datetime.now().isoformat(),
            "liked": []
        }
        db_client.add_product(user_id, product)
        return product

    @swagger.doc(products_post)
    def get(self):
        user_id = request.headers.get('user_id')
        amount = 50
        user = db_client.get_user_by_id(user_id)
        products = db_client.get_products()
        unseen_products = []
        for product in products:
            if product['sale_status'] != "Available":
                continue
            if product['_id'] not in user['likes'] and product not in user['dislikes'] and \
                    product['_id'] not in user['products']:
                unseen_products.append(product)
        return JSONEncoder().encode(unseen_products[:amount]), 200

    @swagger.doc(products_post)
    def put(self):
        return f"ok", 200

    @swagger.doc(products_post)
    def delete(self):
        return f"ok", 200


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        elif isinstance(o, datetime.datetime):
            return str(o)
        return json.JSONEncoder.default(self, o)


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
