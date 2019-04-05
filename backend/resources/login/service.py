import json
from backend.db_util import DbClient
from backend.utils import bson_to_json


DB = DbClient()


def login(request):
    try:
        res = json.loads(request.data)
        user = bson_to_json(returned_request(res))
        return user, 200

    except:
        return (("failed to login", 401))


def returned_request(res):
    init = False
    user = DB.get_user_by_email(res["email"])
    if not user:
        add_new_user(res["email"])
    return DB.get_user_by_email(res["email"])


def add_new_user(email):
    name = "steve"
    number = "08-9428070"
    radius = 15
    DB.add_user(user_name=name, user_email=email, user_number=number, radius=radius)

