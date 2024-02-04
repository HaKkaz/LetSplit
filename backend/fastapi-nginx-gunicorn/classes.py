from pydantic import BaseModel
from utils import getDatetime

class Item(BaseModel):
    datetime: str = getDatetime()
    item_name: str
    payer: str
    split: list[dict]
    comment: str = None

class User(BaseModel):
    username: str
    color: str = None

class Event(BaseModel):
    event_name: str
    user_list: list[User]
    item_list: list[Item] = list()

    def to_dict(self) -> dict:
        result = {
            "event_name": self.event_name,
            "user_list": [user.__dict__ for user in self.user_list],
            "item_list": [item.__dict__ for item in self.item_list],
        }
        print(result)
        return result