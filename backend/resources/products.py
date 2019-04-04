from flask_restful_swagger_2 import Resource, swagger
from flask import Flask, request
from backend.resources import service
from backend.resources.swagger_doc import products_post


class Products(Resource):
    @swagger.doc(products_post)
    def post(self):
        return f"ok", 200

    @swagger.doc(products_post)
    def get(self):
        return f"ok", 200

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
        return f"item {product_id} is {'liked!' if like else 'disliked=/'} by user {user_id}", 200

    @swagger.doc(products_post)
    def delete(self, product_id, like):
        user_id = request.headers.get('user_id')
        return f"item {product_id} is {'liked!' if like else 'disliked=/'} by user {user_id}", 200
