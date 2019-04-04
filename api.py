from flask_cors import CORS
from flask import Flask
from flask_restful_swagger_2 import Api

from backend import conf
from backend.resources.products import Products, ProductsLikes
from backend.resources.users import Users

app = Flask(__name__)
CORS(app)
api = Api(app, api_version='0.1')

api.add_resource(ProductsLikes, "/products/<int:product_id>/<int:like>")
api.add_resource(Products, "/products")
api.add_resource(Users, "/users")

if __name__ == '__main__':
    app.run(host=conf.HOST, port=conf.PORT)
