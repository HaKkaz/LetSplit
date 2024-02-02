import React from 'react';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import { MdDelete } from "react-icons/md";
import ListItemContent from '@mui/joy/ListItemContent';
import Accordion from '@mui/joy/Accordion';
import AccordionSummary from '@mui/joy/AccordionSummary';
import AccordionDetails from '@mui/joy/AccordionDetails';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Button from '@mui/joy/Button';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import EditItemModal from './ui/editItemModal.tsx';
import Box from '@mui/joy/Box';


function ItemCard() {
    const creationDateTime = new Date(); // Get the current date and time
    const formattedDateTime = `${creationDateTime.getFullYear()}.${String(creationDateTime.getMonth() + 1).padStart(2, '0')}.${String(creationDateTime.getDate()).padStart(2, '0')} ${String(creationDateTime.getHours()).padStart(2, '0')}:${String(creationDateTime.getMinutes()).padStart(2, '0')}`;
    const [open, setOpen] = React.useState<boolean>(false);
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
                        臭豆腐
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, marginTop: 2, marginLeft: 3 }}>
                    <MdDelete color="#7CBBAE"
                        fontSize="large"
                        onClick={() => setOpen(true)}
                    />
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <ModalDialog variant="outlined" role="alertdialog">
                            <DialogTitle>
                                <WarningRoundedIcon />
                                Confirmation
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                                確定刪除此項目?
                            </DialogContent>
                            <DialogActions>
                                <Button variant="solid" color="danger" onClick={() => setOpen(false)}>
                                    確定刪除
                                </Button>
                                <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                                    取消
                                </Button>
                            </DialogActions>
                        </ModalDialog>
                    </Modal>
                </Box>
                <Box sx={{ flexGrow: 1, marginTop: 2, marginLeft: 8, marginRight: 1 }}>
                    <EditItemModal />
                </Box>
            </Grid>
            <Typography level="body-sm" sx={{ marginLeft: -8 }}>
                {formattedDateTime}
            </Typography>
            <Divider inset="none" />
            <Accordion>
                <AccordionSummary>
                    <ListItemContent>
                        <Typography level="title-md">小豬支付 300 元</Typography>
                    </ListItemContent>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={1.5}>
                        <FormControl orientation="horizontal" sx={{ gap: 1 }}>
                            <FormLabel>小豬 100 元</FormLabel>
                        </FormControl>
                        <FormControl orientation="horizontal" sx={{ gap: 1 }}>
                            <FormLabel>綿悠悠 100 元</FormLabel>
                        </FormControl>
                        <FormControl orientation="horizontal" sx={{ gap: 1 }}>
                            <FormLabel>皮皮雞 100 元</FormLabel>
                        </FormControl>
                    </Stack>
                </AccordionDetails>
            </Accordion>

        </Card>
    )
}
export default ItemCard;