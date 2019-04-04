from flask_restful_swagger_2 import Resource, swagger

from api.resources import service
from api.resources.swagger_doc import products_post


class Products(Resource):
    @swagger.doc(products_post)
    def post(self):
        return service.BLA
