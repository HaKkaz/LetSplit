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
import { Item } from './interfaces/Item.ts';

function ItemCard({ itemData, onEditData, onDelete }) {
    const creationDateTime = new Date(); // Get the current date and time
    const formattedDateTime = `${creationDateTime.getFullYear()}.${String(creationDateTime.getMonth() + 1).padStart(2, '0')}.${String(creationDateTime.getDate()).padStart(2, '0')} ${String(creationDateTime.getHours()).padStart(2, '0')}:${String(creationDateTime.getMinutes()).padStart(2, '0')}`;
    const handleEdit = (editedData) => {
        // Perform the edit and call onEditData to update the data in Event
        onEditData(editedData);
    };
    const item: Item = itemData;

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
                            {item.item_name}
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, marginTop: 2, marginLeft: 3 }}>
                        <DeleteItemModal onDelete={onDelete} />
                    </Box>
                    <Box sx={{ flexGrow: 1, marginTop: 2, marginLeft: 8, marginRight: 1 }}>
                        <EditItemModal
                            itemName={item.item_name}
                            // itemAmount={itemData.item}
                            payerName={item.payer}
                            splitEqually={item.splitEqually}
                            itemDetails={item.split}
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
                            <Typography level="title-md">{item.payer}支付 {item.amount} 元</Typography>
                        </ListItemContent>
                    </AccordionSummary>
                    <AccordionDetails>
                        {item.splitEqually ?
                            <Typography marginLeft={-18} marginTop={1}>均攤</Typography>
                            : (
                                <Stack spacing={1.5} marginTop={2}>
                                    {item.split
                                        .filter(split => split.amount !== 0)
                                        .map((split, index) => (
                                            <FormControl key={index}>
                                                <FormLabel>{split.username} {split.amount} 元</FormLabel>
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