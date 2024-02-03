import React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import ListItemContent from '@mui/joy/ListItemContent';
import Accordion from '@mui/joy/Accordion';
import AccordionSummary from '@mui/joy/AccordionSummary';
import AccordionDetails from '@mui/joy/AccordionDetails';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import EditItemModal from './ui/editItemModal.tsx';
import Box from '@mui/joy/Box';
import DeleteItemModal from './ui/deleteItemModal.tsx';


function ItemCard() {
    const creationDateTime = new Date(); // Get the current date and time
    const formattedDateTime = `${creationDateTime.getFullYear()}.${String(creationDateTime.getMonth() + 1).padStart(2, '0')}.${String(creationDateTime.getDate()).padStart(2, '0')} ${String(creationDateTime.getHours()).padStart(2, '0')}:${String(creationDateTime.getMinutes()).padStart(2, '0')}`;
    const [itemData, setItemData] = React.useState({
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
    });

    const handleEditData = (editedData) => {
        setItemData(editedData);
    };

    return (
        <Card
            variant="outlined"
            sx={{
                maxHeight: 'max-content',
                maxWidth: '100%',
                mx: 'auto',
                // to make the demo resizable
                overflow: 'auto',
                resize: 'horizontal',
                marginTop: -15,
            }}
        >
            <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                <Box sx={{ flexGrow: 1, marginTop: 1 }}>
                    <Typography level="title-lg" sx={{ marginTop: 1, marginLeft: 1 }} gutterBottom component="div">
                        {itemData.itemName}
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, marginTop: 2, marginLeft: 3 }}>
                    <DeleteItemModal />
                </Box>
                <Box sx={{ flexGrow: 1, marginTop: 2, marginLeft: 8, marginRight: 1 }}>
                    <EditItemModal
                        itemName={itemData.itemName}
                        itemAmount={itemData.itemAmount}
                        payerName={itemData.payerName}
                        splitEqually={itemData.splitEqually}
                        itemDetails={itemData.itemDetails}
                        onEdit={handleEditData}
                    />
                </Box>
            </Grid>
            <Typography level="body-sm" sx={{ marginLeft: -8 }}>
                {formattedDateTime}
            </Typography>
            <Divider inset="none" />
            <Accordion>
                <AccordionSummary>
                    <ListItemContent>
                        <Typography level="title-md">{itemData.payerName}支付 {itemData.itemAmount} 元</Typography>
                    </ListItemContent>
                </AccordionSummary>
                <AccordionDetails>
                    {itemData.splitEqually ?
                        <Typography marginLeft={-18} marginTop={1}>均攤</Typography>
                        : (
                            <Stack spacing={1.5} marginTop={2}>
                                {itemData.itemDetails
                                    .filter(itemDetail => itemDetail.amount !== 0)
                                    .map((itemDetail, index) => (
                                        <FormControl key={index}>
                                            <FormLabel>{itemDetail.payer} {itemDetail.amount} 元</FormLabel>
                                        </FormControl>
                                    ))}
                            </Stack>
                        )}
                </AccordionDetails>
            </Accordion>

        </Card>
    )
}
export default ItemCard;