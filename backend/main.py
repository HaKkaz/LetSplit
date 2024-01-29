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
    print(f'event_id = {event_id}')

    collection: Collection = db["user_data"]

    document_id = ObjectId(event_id)
    document = collection.find_one({'_id': document_id})

    if document:
        # Convert ObjectId to its string representation
        document['_id'] = str(document['_id'])
        
    return document

if __name__ == "__main__":
    app.add_api_route("/api/user_data", create_event, methods=["POST"])
    app.run(debug=True, reload=True)