from flask_cors import CORS
from flask import Flask
from flask_restful_swagger_2 import Api


from api import conf
from api.resources.products import Products

app = Flask(__name__)
CORS(app)
api = Api(app, api_version='0.1')

api.add_resource(Products,"/products")



def run():
    app.run(host=conf.HOST, port=conf.PORT)
