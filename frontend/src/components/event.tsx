import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import ItemCard from './itemCard.tsx';
import AddPeopleModal from './ui/addPeopleModal.tsx';
import AddItemModal from './ui/addItemModal.tsx';
import PieChartView from './ui/pieChartView.tsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Event } from './interfaces/Event.ts'
import { Item } from './interfaces/Item.ts';

function EventPage() {
    const { event_id } = useParams();
    const [event, setEvent] = useState<Event | null>(null);

    useEffect(() => {
        // Fetch event data when component mounts
        fetch(`http://35.187.157.35/api/user_data/event/${event_id}`)
          .then(response => response.json())
          .then(data => {
            setEvent(data);
          })
          .catch(error => {
            console.error('Error fetching event data:', error);
          });
      }, [event_id]);

    const handleEditData = (editedData, index) => {
        console.log("edit");
    };

    const handleDelete = () => {
        // Perform the delete and update the data
        console.log("delete");
    }

    return (
        <div style={{ position: 'relative' }}>
            <h1 style={{ position: 'fixed', top: 40, left: 0, width: '100%', background: 'white' }}>{event?.event_name}</h1>
            <Tabs defaultValue={0} >
                <TabList style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white' }}>
                    <Tab> 收支明細 </Tab>
                    <Tab> 結算總覽 </Tab>
                </TabList>
                <TabPanel value={0}>
                    <AddPeopleModal />
                    <AddItemModal />
                    {event && event?.item_list.map((item: Item, index) => (
                        <ItemCard key={index} itemData={item} onEditData={(editedData) => handleEditData(editedData, index)} onDelete={handleDelete} />
                    ))}
                </TabPanel>
                <TabPanel value={1}>
                    每個人付了多少錢
                    <PieChartView />
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default EventPage;