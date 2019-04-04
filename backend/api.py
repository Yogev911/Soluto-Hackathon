import os
import json
from flask_cors import CORS
from flask import Flask, request, jsonify
import traceback
from flask_restful_swagger_2 import Api
import api_handler
import conf
import utils

from backend.resources.products import Products

app = Flask(__name__)
CORS(app)
api = Api(app, api_version='0.1')

api.add_resource(Products,"/products")
@app.route('/init', methods=['GET', 'POST'])
def init():
    try:
        api_handler.db.init_db()
        return utils.create_res_obj({'status': 'init success'})
    except Exception as e:
        return utils.create_res_obj(
            {'traceback': traceback.format_exc(), 'msg': "{}".format(e.args)},
            success=False)


@app.route('/products', methods=['GET', 'POST', 'PUT'])
def products():
    if request.method == 'GET':
        return "GET\n"
    elif request.method == 'POST':
        return "POST\n"
    elif request.method == 'PUT':
        return "PUT\n"


@app.route('/products/<product_id>/like', methods=['POST'])
def like_product(product_id):
    return "POST {0}\n".format(product_id)


@app.route('/users', methods=['GET'])
def like_product():
    return "GET\n"


def run():
    app.run(host=conf.HOST, port=conf.PORT)
