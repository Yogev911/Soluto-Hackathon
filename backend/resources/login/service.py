import json
from backend.db_util import DbClient
from backend.utils import bson_to_json


DB = DbClient()


def login(request):
    try:
        res = json.loads(request.data)
        user_info = DB.get_user_by_email(res["email"])
        return ((json.dumps(bson_to_json(user_info)), 200))

    except:
        return (("failed to login", 401))

