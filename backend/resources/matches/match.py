import json

from bson import json_util
from flask_restful_swagger_2 import Resource, swagger
from flask import request

from backend.db_util import DbClient
from backend.resources.products.products import JSONEncoder
from backend.resources.products.swagger_doc import products_post

db_client = DbClient()


class Match(Resource):
    @swagger.doc(products_post)
    def post(self):
        return f"ok", 200

    @swagger.doc(products_post)
    def get(self):
        user_id = request.headers.get('user_id')
        item = [self.set_prod(matches) for  matches in db_client.get_matches(user_id)]
        # matches = self.set_prod(matches)
        return JSONEncoder().encode(item), 200

    def set_prod(self, matches):
        matches = {"first_user": db_client.get_user_by_id(str(matches['first_user_id'])),
                   "second_user": db_client.get_user_by_id(str(matches['second_user_id'])),
                   "first_user_product": db_client.get_product_by_id(str(matches['first_user_product_id'])),
                   "second_user_product": db_client.get_product_by_id(str(matches['second_user_product_id']))}
        return matches

    @swagger.doc(products_post)
    def put(self):
        return f"ok", 200

    @swagger.doc(products_post)
    def delete(self):
        return f"ok", 200
