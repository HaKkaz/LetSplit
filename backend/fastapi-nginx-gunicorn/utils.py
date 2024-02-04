from datetime import datetime

def getDatetime() -> str:
    """
    Get the current datetime.
    """
    # Get the current date and time
    current_datetime = datetime.now()

    # Format the datetime as "YYYY/MM/DD HH:mm"
    formatted_datetime = current_datetime.strftime("%Y/%m/%d %H:%M")

    return formatted_datetime