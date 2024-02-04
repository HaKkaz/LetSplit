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


function ItemCard({ itemData, onEditData, onDelete }) {
    const creationDateTime = new Date(); // Get the current date and time
    const formattedDateTime = `${creationDateTime.getFullYear()}.${String(creationDateTime.getMonth() + 1).padStart(2, '0')}.${String(creationDateTime.getDate()).padStart(2, '0')} ${String(creationDateTime.getHours()).padStart(2, '0')}:${String(creationDateTime.getMinutes()).padStart(2, '0')}`;
    const handleEdit = (editedData) => {
        // Perform the edit and call onEditData to update the data in Event
        onEditData(editedData);
    };
    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    maxHeight: 'max-content',
                    maxWidth: '100%',
                    mx: 'auto',
                    overflow: 'auto',
                    resize: 'horizontal',
                    position: 'relative',
                    marginTop: 2,
                }}
            >
                <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                    <Box sx={{ flexGrow: 1, marginTop: 1 }}>
                        <Typography level="title-lg" sx={{ marginTop: 1, marginLeft: 1 }} gutterBottom component="div">
                            {itemData.itemName}
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, marginTop: 2, marginLeft: 3 }}>
                        <DeleteItemModal onDelete={onDelete} />
                    </Box>
                    <Box sx={{ flexGrow: 1, marginTop: 2, marginLeft: 8, marginRight: 1 }}>
                        <EditItemModal
                            itemName={itemData.itemName}
                            itemAmount={itemData.itemAmount}
                            payerName={itemData.payerName}
                            splitEqually={itemData.splitEqually}
                            itemDetails={itemData.itemDetails}
                            onEdit={handleEdit}
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
        </>
    )
}
export default ItemCard;