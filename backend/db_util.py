from pymongo import MongoClient

client = MongoClient("mongodb+srv://app:Password1@cluster0-yyeld.mongodb.net/test?retryWrites=true")


class DbClient:
    db = client["tradeit"]

    users = db['Users']
    products = db['Products']
    matches = db['Matches']

    def get_user_by_email(self, email):
        return self.users.find_one({'email': email})

    def get_user_by_id(self, user_id):
        return self.users.find_one({'_id': user_id})

    def get_products(self):
        return self.products.find()

    def add_product(self, user_id, product):
        product_id = self.products.insert_one(product).inserted_id
        self.users.update_one({'_id': user_id}, {'$push': {'products': product_id}})

    def remove_product(self, user_id, product_id):
        self.products.update_one({'_id': product_id}, {'sale_state': 'Deleted'})
        self.users.update_one({'_id': user_id}, {'$pull': {'products': product_id}})

    def like_product(self, user_id, product_id):
        self.users.update_one({'_id': user_id}, {'$pull': {'likes': product_id}})
        self.products.update_one({'_id': product_id}, {'$push': {'liked': user_id}})

    def dislike_product(self, user_id, product_id):
        self.users.update_one({'_id': user_id}, {'$pull': {'dislikes': product_id}})

    def add_match(self, first_user, second_user, first_user_product_id, second_user_product_id):
        self.matches.insert(
            {'first_user': first_user, 'second_user': second_user, 'first_user_product_id': first_user_product_id,
             'second_user_product_id': second_user_product_id})

    def update_product_state(self, product_id, state):
        self.products.update_one({'_id': product_id}, {'sale_state': state})
