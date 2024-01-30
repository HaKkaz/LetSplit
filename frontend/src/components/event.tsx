import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import ItemCard from './itemCard.tsx';
import AddPeopleModal from './ui/addPeopleModal.tsx';
import AddItemModal from './ui/addItemModal.tsx';

function Event() {
    return (
        <div style={{ position: 'relative' }}>
            <h1 style={{ position: 'fixed', top: 40, left: 0, width: '100%', background: 'white' }}>這是標題</h1>
            <Tabs defaultValue={0} >
                <TabList style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white' }}>
                    <Tab> 收支明細 </Tab>
                    <Tab> 結算總覽 </Tab>
                </TabList>
                <TabPanel value={0}>
                    <AddPeopleModal />
                    <AddItemModal />
                    <br />
                    <br />
                    <ItemCard />
                </TabPanel>

                <TabPanel value={1}>
                    <b>Second</b> tab panel
                </TabPanel>
            </Tabs>

        </div>


    );
};
export default Event;