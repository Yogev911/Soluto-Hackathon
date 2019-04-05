from backend.db_util import DbClient

db_client = DbClient()


def get_user(user_id):
    user = db_client.get_user_by_id(user_id)
    return user
