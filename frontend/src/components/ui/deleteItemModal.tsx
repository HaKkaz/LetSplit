import React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Button from '@mui/joy/Button';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Divider from '@mui/joy/Divider';
import { MdDelete } from "react-icons/md";
function DeleteItemModal({ onDelete }) {
    const [open, setOpen] = React.useState<boolean>(false);
    const handleDelete = () => {
        onDelete();
        setOpen(false);
    }
    return (
        <div>
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
                        <Button variant="solid" color="danger" onClick={handleDelete}>
                            確定刪除
                        </Button>
                        <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                            取消
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </div>
    );
}
export default DeleteItemModal;