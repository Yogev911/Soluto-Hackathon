from flask_restful_swagger_2 import Resource, swagger

from backend.resources import service
from backend.resources.swagger_doc import products_post


class Products(Resource):
    @swagger.doc(products_post)
    def post(self):
        return service.BLA

    @swagger.doc(products_post)
    def get(self):
        return service.BLA

    @swagger.doc(products_post)
    def put(self):
        return service.BLA

    @swagger.doc(products_post)
    def delete(self):
        return service.BLA


class Product(Resource):
    @swagger.doc(products_post)
    def post(self):
        return service.BLA

    @swagger.doc(products_post)
    def get(self):
        return service.BLA

    @swagger.doc(products_post)
    def put(self):
        return service.BLA

    @swagger.doc(products_post)
    def delete(self):
        return service.BLA