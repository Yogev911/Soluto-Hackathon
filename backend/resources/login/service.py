import json


def login(request):
    try:
        res = json.loads(request.data)
        #user_id = db.get_user_id(res.email, res.password)
        return (('userID', 200))

    except:
        return (("failed to login", 401))

