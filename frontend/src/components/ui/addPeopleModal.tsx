import React from 'react';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import { CssVarsProvider } from '@mui/joy/styles';
import theme from './../../Theme.ts';


function AddPeopleModal() {
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => {
        setOpenModal(!openModal);
    }
    return (
        <>

            <button onClick={handleOpenModal} style={{ position: 'fixed', top: '25%', left: '52%', width: '20%', background: 'white' }}>新增成員</button>
            <Modal
                open={openModal}
                onClose={handleOpenModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalDialog>
                    <DialogTitle>新增成員</DialogTitle>
                    <form
                        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            setOpenModal(false);
                        }}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <Input autoFocus required placeholder="輸入成員名稱" />
                            </FormControl>
                            <CssVarsProvider theme={theme}>
                                <Button type="submit" color="secondary">確認</Button>
                            </CssVarsProvider>

                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </>
    )
}
export default AddPeopleModal;