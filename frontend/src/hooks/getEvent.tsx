function getEvent(eventId: string) {
    // 發送GET請求到後端，以event_id獲取event的資料
    const fetchEvent = async () => {
        try {
            const response = await fetch(`http://35.187.157.35/api/user_data/event/${eventId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            });
            const eventData = await response.json();
            return eventData;
        } catch (error) {
            console.error('Error creating event:', error.message);
        }
    }
    fetchEvent();
}
export default getEvent;