import os
import json
from flask_cors import CORS
from flask import Flask, request, jsonify
import traceback
from flask_restful_swagger_2 import Api
import api_handler
import conf
import utils

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


def run():
    app.run(host=conf.HOST, port=conf.PORT)
