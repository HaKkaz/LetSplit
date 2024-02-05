from fastapi import FastAPI
from pymongo import MongoClient
from pymongo.collection import Collection
from bson import ObjectId
import certifi
from dotenv import load_dotenv
import os
from classes import Event, User, Item

def get_database():
    # read the connection string from the env file
    load_dotenv()
    
    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(
        os.getenv("CONNECTION_STRING"), 
        tlsCAFile=certifi.where(),
    )
    
    # Create the database for our example (we will use the same database throughout the tutorial
    return client['main_data']

app = FastAPI()
db = get_database()


@app.post("/api/user_data/event")
def create_event(event: Event) -> dict:
    """
    Create a new event.

    request body need `eventName` and `userList`.

    Retrun the event id.
    """
    collection: Collection = db["user_data"]

    event_id: str = str(collection.insert_one(event.to_dict()).inserted_id)
    return {
        "event_id": event_id
    }

@app.get("/api/user_data/event/{event_id}")
def get_event(event_id: str) -> dict:
    """
    Get an event by event id.
    """

    collection: Collection = db["user_data"]

    document_id = ObjectId(event_id)
    document = collection.find_one({'_id': document_id})

    if document:
        # Convert ObjectId to its string representation
        document['_id'] = str(document['_id'])
        return document

    return {"details": "document not found."}

@app.delete("/api/user_data/event/{event_id}")
def delete_event(event_id: str) -> dict:
    """
    Delete an event by event id.
    """
    collection: Collection = db["user_data"]

    document_id = ObjectId(event_id)
    document = collection.find_one({'_id': document_id})

    if document:
        collection.delete_one(document) 
        return {"details": "document deleted."}

    return {"details": "document not found."}                         

@app.get("/api/user_data/item_list/{event_id}")
def get_itemlist(event_id: str) -> dict:
    """
    Get all items.
    """
    collection: Collection = db["user_data"]

    document_id = ObjectId(event_id)
    document = collection.find_one({'_id': document_id})

    if document:
        return {"itemList": document.get('item_list', [])}

    return {"details": "document not found."}

@app.post("/api/user_data/item/{event_id}")
def create_item(event_id: str, item: Item) -> dict:
    """
    Create a new item.
    """
    collection: Collection = db["user_data"]

    document_id = ObjectId(event_id)
    document = collection.find_one({'_id': document_id})
    oid = ObjectId()
    item.id = str(oid)

    if document:
        collection.update_one(
            document,
            {'$push': {'item_list': item.model_dump()}}
        )
        return {"details" : "item created."}
    
    return {"details": "document not found."}

@app.put("/api/user_data/item/{event_id}/{item_id}")
def update_item(event_id: str, item: Item) -> dict:
    """
    Update an item by item id.
    """
    collection: Collection = db["user_data"]

    document_id = ObjectId(event_id)
    document = collection.find_one({'_id': document_id})
    
    if document:
        return document

    return {"details": "document not found."}
    

if __name__ == "__main__":
    app.add_api_route("/api/user_data", create_event, methods=["POST"])
    app.run(debug=True, reload=True)