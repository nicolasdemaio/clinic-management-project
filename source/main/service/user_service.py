from source.main.model.user import User
from source.main.repository.dao import UserDAO
from werkzeug.security import safe_str_cmp

class UserService:

    def __init__(self, user_dao=UserDAO()):
        self.user_dao = user_dao

    def get_users(self):
        return self.user_dao.get_all()
    
    def create_a_user(self, a_user):
        self.user_dao.persist(a_user)
        return a_user

    def get_user_by_id(self, id):
        return self.user_dao.get_by_id(id)
    
    def delete_user_by_id(self, id):
        self.user_dao.delete_by_id(id)
    
    def update_user_by_id(self, id, updated_user_data):
        return self.user_dao.update_by_id(id, updated_user_data)

#! Dejar de hardcodear y usar get/post para usar en mongo
users = [
User(1, 'user1', 'abcxyz'),
User(2, 'user2', 'abcxyz'),
]

username_table = {u.username: u for u in users}
userid_table = {u.id: u for u in users}

def authenticate(username, password):
    user = username_table.get(username, None)
    if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
        return user

def identity(payload):
    user_id = payload['identity']
    return userid_table.get(user_id, None) 