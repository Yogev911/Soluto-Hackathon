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
        matches = db_client.get_matches(user_id)
        return JSONEncoder().encode(matches), 200
    @swagger.doc(products_post)
    def put(self):
        return f"ok", 200

    @swagger.doc(products_post)
    def delete(self):
        return f"ok", 200

