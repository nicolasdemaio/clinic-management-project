from source.main.repository.dao import DaysOffDAO
from source.tool.custom_logger import CustomLogger

class DaysOffService:

    def __init__(self, days_off_dao=DaysOffDAO()):
        self.days_off_dao = days_off_dao

    def get_days_offs(self):
        return self.days_off_dao.get_all()
    
    def create_a_days_off(self, a_days_off):
        CustomLogger().get_configured_instance().info("llegue a services")
        CustomLogger().get_configured_instance().info(a_days_off)
        self.days_off_dao.persist(a_days_off)
        CustomLogger().get_configured_instance().info(a_days_off)
        return a_days_off

    def get_days_off_by_id(self, id):
        return self.days_off_dao.get_by_id(id)
    
    def delete_days_off_by_id(self, id):
        self.days_off_dao.delete_by_id(id)
    
    def update_days_off_by_id(self, id, updated_days_off_data):
        return self.days_off_dao.update_by_id(id, updated_days_off_data)
        