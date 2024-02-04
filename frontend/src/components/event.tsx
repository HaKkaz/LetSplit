import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import ItemCard from './itemCard.tsx';
import AddPeopleModal from './ui/addPeopleModal.tsx';
import AddItemModal from './ui/addItemModal.tsx';
import PieChartView from './ui/pieChartView.tsx';

function Event() {
    const [itemData, setItemData] = React.useState([
        {
            itemName: "臭豆腐",
            itemAmount: 300,
            payerName: "皮皮小雞",
            splitEqually: false,
            // 應該是所有人都要在這裡面，如果>0，才顯示
            itemDetails: [
                { payer: '小豬', amount: 50 },
                { payer: '吼吼龍', amount: 50 },
                { payer: '綿悠悠', amount: 100 },
                { payer: '皮皮小雞', amount: 100 },
                { payer: '小熊', amount: 0 },
            ],
        },
        {
            itemName: "炸雞",
            itemAmount: 200,
            payerName: "皮皮小雞",
            splitEqually: true,
            itemDetails: [
                { payer: '小豬', amount: 0 },
                { payer: '吼吼龍', amount: 0 },
                { payer: '綿悠悠', amount: 0 },
                { payer: '皮皮小雞', amount: 0 },
                { payer: '小熊', amount: 0 },
            ],
        }]);


    const handleEditData = (editedData) => {
        setItemData(editedData);
    };
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
                    {itemData.map((item, index) => (
                        <ItemCard key={index} itemData={item} onEditData={handleEditData} />
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

export default Event;