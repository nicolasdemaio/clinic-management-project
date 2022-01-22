from source.main.model.user import User
from source.main.repository.dao import UserDAO
from werkzeug.security import safe_str_cmp

class UserService:

    def __init__(self, user_dao=UserDAO()):
        self.user_dao = user_dao

    def login(self, an_username, a_password):
        obtained_user = self.user_dao.get_by_username(an_username)
        if (obtained_user.password != a_password):
            raise UserAuthenticationException('Username or password are incorrect.')

        return obtained_user

    def get_users(self):
        return self.user_dao.get_all()

    def get_user_by_id(self, id):
        return self.user_dao.get_by_id(id)
    
    def delete_user_by_id(self, id):
        self.user_dao.delete_by_id(id)
    
    def update_user_by_id(self, id, updated_user_data):
        return self.user_dao.update_by_id(id, updated_user_data)

    def create_account_with(self, a_fullname, a_dni_number, roles):
        username = self.__generate_username_from(a_fullname)
        created_user = User(username= username, password= str(a_dni_number), dni= a_dni_number, roles= roles)
        self.user_dao.persist(created_user)

    def __generate_username_from(self, a_fullname):
        return (a_fullname.split()[0] + a_fullname.split()[-1]).lower()

class UserAuthenticationException(RuntimeError):

    def __init__(self, *args):
        super().__init__(*args)