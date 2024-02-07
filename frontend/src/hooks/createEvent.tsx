import { NavigateFunction } from 'react-router-dom';
import { User } from '../components/interfaces/User'
function useCreateEvent(eventName: string, peopleNameList: User[], navigate: NavigateFunction) {
    const handleCreateEvent = async () => {
        if (eventName.trim() === '') {
            alert('請輸入帳本名稱！');
            return;
        } else if (peopleNameList.length === 0) {
            alert('請新增參與人員！');
            return;
        }

        try {
            // 发送POST请求到后端，获取event_id
            const response = await fetch('http://35.187.157.35/api/user_data/event', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                body: JSON.stringify({
                    event_name: eventName,
                    user_list: peopleNameList
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create event.');
            }

            const eventData = await response.json();
            const eventId = eventData['event_id'];

            if (eventId === undefined) {
                throw new Error('Access event_id error.');
            }

            // 将页面重定向到 /event/{event_id}
            navigate(`/event/${eventId}`);
        } catch (error) {
            console.error('Error creating event:', error.message);
        }
    };
    handleCreateEvent();
}
export default useCreateEvent;