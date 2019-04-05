import json
from bson import json_util
from flask_restful_swagger_2 import Resource, swagger
from flask import request
from backend.resources.users.service import get_user
from backend.resources.users.swagger_doc import users_post, users_get


class Users(Resource):
    @swagger.doc(users_post)
    def post(self):
        return 500

    @swagger.doc(users_get)
    def get(self):
        user_id = request.headers.get('user_id')
        if not user_id:
            return "User not supplied", 404
        user = get_user(user_id)
        return json.loads(json_util.dumps(user)), 200


    @swagger.doc(users_post)
    def put(self):
        return 500

    @swagger.doc(users_post)
    def delete(self):
        return 500