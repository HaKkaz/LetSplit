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
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import FormLabel from '@mui/joy/FormLabel';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}
const NumericFormatAdapter = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatAdapter(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                valueIsNumericString

            />
        );
    },
);
function AddItemModal() {
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => {
        setOpenModal(!openModal);
    }
    const [value, setValue] = React.useState('');
    const peopleName = ['小寶', '皮皮雞', '羊悠悠'];
    const [peopleList, setPeopleList] = React.useState(peopleName[0]);
    return (
        <>
            <button onClick={handleOpenModal} style={{ position: 'fixed', top: '25%', right: '52%', width: '20%', background: 'white' }}>新增項目</button>
            <Modal
                open={openModal}
                onClose={handleOpenModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalDialog>
                    <DialogTitle>新增項目</DialogTitle>
                    <form
                        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            setOpenModal(false);
                        }}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>項目名稱</FormLabel>
                                <Input autoFocus required placeholder="輸入項目名稱" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>金額</FormLabel>
                                <Input
                                    startDecorator={'$'}
                                    value={value}
                                    onChange={(event) => setValue(event.target.value)}
                                    slotProps={{
                                        input: {
                                            component: NumericFormatAdapter,
                                        },
                                    }}
                                    autoFocus required placeholder="輸入金額" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>請選擇支付者</FormLabel>
                                <Dropdown>
                                    <MenuButton endDecorator={<ArrowDropDown />}>{peopleList}</MenuButton>
                                    <Menu sx={{ zIndex: 1300, minWidth: 160, '--ListItemDecorator-size': '24px' }}>
                                        {peopleName.map((item: string) => (
                                            <MenuItem
                                                key={item}
                                                role="menuitemradio"
                                                aria-checked={item === peopleList ? 'true' : 'false'}
                                                onClick={() => {
                                                    setPeopleList(item);
                                                }}
                                            >
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Dropdown>
                            </FormControl>
                            <FormControl>
                                <FormLabel>請選擇分母</FormLabel>
                                <Input autoFocus required placeholder="輸入金額" />
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
export default AddItemModal;