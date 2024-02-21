from pydantic import BaseModel
from utils import getDatetime
from datetime import datetime

class Item(BaseModel):
    id: str = None
    datetime: str = getDatetime()
    item_name: str
    payer: str
    total: float
    split: list[dict]
    comment: str = None

class User(BaseModel):
    username: str
    color: str = None

class Event(BaseModel):
    event_name: str
    event_time: datetime = getDatetime()
    user_list: list[User]
    item_list: list[Item] = list()

    def to_dict(self) -> dict:
        result = {
            "event_name": self.event_name,
            "event_time": self.event_time,
            "user_list": [user.__dict__ for user in self.user_list],
            "item_list": [item.__dict__ for item in self.item_list],
        }
        print(result)
        return result