import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import ItemCard from './itemCard.tsx';
import AddPeopleModal from './ui/addPeopleModal.tsx';
import AddItemModal from './ui/addItemModal.tsx';
import PieChartView from './ui/pieChartView.tsx';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Event } from './interfaces/Event.ts'
import { Item } from './interfaces/Item.ts';
import { Box } from '@mui/system';

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

    const handleEditData = (editedItem: Item, index: number) => {
        console.log("edit");
    };

    const handleDelete = () => {
        // Perform the delete and update the data
        console.log("delete");
    }

    return (
        <Box sx={{ position: 'fixed'}}>
            {/* <div id="white_block" style={{ position: 'relative', height: '20%', width: '100%', background: 'white', zIndex: 3 }} > */}
            <h1 style={{ position: 'fixed', top: '2%', left: 0, width: '100%', background: 'white', zIndex: 4  }}>{event?.event_name}</h1>
                
            <Tabs defaultValue={0} style={{ position: 'fixed', top: '15%', left: '15%', right: '15%', bottom: '5%', background: 'white' }}>
                <TabList 
                    disableUnderline
                    tabFlex={1}
                    sx={{
                        [`& .${tabClasses.root}`]: {
                            fontSize: 'sm',
                            fontWeight: 'lg',
                            [`&[aria-selected="true"]`]: {
                                color: 'primary.500',
                                bgcolor: 'background.surface',
                            },
                            [`&.${tabClasses.focusVisible}`]: {
                                outlineOffset: '-4px',
                            },
                        },
                    }}>
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}> 收支明細 </Tab>
                    <Tab disableIndicator variant="soft" sx={{ flexGrow: 1 }}> 結算總覽 </Tab>
                </TabList>
                <TabPanel value={0} style={{position: 'relative', marginTop: '0px',  zIndex: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 48px)' }}>
                    <AddItemModal />
                    <AddPeopleModal />
                    {event && event?.item_list.map((item: Item, index: number) => (
                        <ItemCard key={index} itemData={item} onEditData={(editedItem: Item) => handleEditData(editedItem, index)} onDelete={handleDelete} />
                    ))}
                </TabPanel>
                <TabPanel value={1}>
                    每個人付了多少錢
                    <PieChartView />
                </TabPanel>
            </Tabs>
        </Box>
    );
}

export default EventPage;