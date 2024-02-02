import { FaPen } from "react-icons/fa6";
import React from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Button from '@mui/joy/Button';
import { CssVarsProvider } from '@mui/joy/styles';
import theme from './../../Theme.ts';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Switch from '@mui/joy/Switch';

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

const Item = styled(Sheet)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
    ...theme.typography['body-sm'],
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    color: theme.vars.palette.text.secondary,
}));

function EditItemModal(props) {
    const { itemName, itemAmount, payerName, itemDetails, onEdit } = props;
    const [formData, setFormData] = React.useState({
        editedItemName: itemName,
        editedItemAmount: itemAmount,
        editedPayerName: payerName,
        editedItemDetails: itemDetails,
    });

    const peopleNameList = formData.editedItemDetails.map((item) => item.payer);

    const handleInputChange = (fieldName, value) => {
        setFormData({
            ...formData,
            [fieldName]: value,
        });
    };
    const handleEdit = () => {
        // Call the onEdit function with the edited data
        onEdit({
            itemName: formData.editedItemName,
            itemAmount: formData.editedItemAmount,
            payerName: formData.editedPayerName,
            itemDetails: formData.editedItemDetails,
        });
    };
    const [openModal, setOpenModal] = React.useState(false);
    const handleOpenModal = () => {
        setOpenModal(!openModal);
    }

    const [payerList, setPayerList] = React.useState(peopleNameList[0]);
    const [peopleList, setPeopleList] = React.useState(peopleNameList[0]);
    const [equallySelected, setEquallySelected] = React.useState(false);
    const [splitedValue, setSplitedValue] = React.useState('');

    return (
        <div>
            <FaPen color="#7CBBAE"
                fontSize="medium"
                onClick={handleOpenModal} />
            <Modal
                open={openModal}
                onClose={handleOpenModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ModalDialog>
                    <DialogTitle>編輯項目</DialogTitle>
                    <form
                        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            setOpenModal(false);
                        }}
                    >
                        <Stack spacing={2}>
                            <FormControl>
                                <FormLabel>項目名稱</FormLabel>
                                <Input autoFocus required placeholder="輸入項目名稱" value={formData.editedItemName} onChange={(e) => handleInputChange("editedItemName", e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>金額</FormLabel>
                                <Input
                                    startDecorator={'$'}
                                    value={formData.editedItemAmount}
                                    onChange={(e) => handleInputChange("editedItemAmount", e.target.value)}
                                    slotProps={{
                                        input: {
                                            component: NumericFormatAdapter,
                                        },
                                    }}
                                    autoFocus required placeholder="輸入金額" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>支付者</FormLabel>
                                <Dropdown>
                                    <MenuButton endDecorator={<ArrowDropDown />}>{formData.editedPayerName}</MenuButton>
                                    <Menu sx={{ zIndex: 1300, minWidth: 160, '--ListItemDecorator-size': '24px' }}>
                                        {peopleNameList.map((item: string) => (
                                            <MenuItem
                                                key={item}
                                                role="menuitemradio"
                                                aria-checked={item === payerList ? 'true' : 'false'}
                                                onClick={() => {
                                                    setPayerList(item);
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
                                <Typography component="label" endDecorator={<Switch sx={{ ml: 1 }} defaultChecked onChange={() => setEquallySelected(!equallySelected)} />}>
                                    均攤
                                </Typography>
                            </FormControl>
                            {!equallySelected ? null : (
                                <FormControl>
                                    <Box
                                        sx={{
                                            display: 'grid',
                                            gridAutoColumns: '1fr',
                                            gap: 1,
                                        }}
                                    >
                                        <Item sx={{ gridRow: '1', gridColumn: 'span 2' }}>
                                            <Dropdown>
                                                <MenuButton endDecorator={<ArrowDropDown />}>{peopleList}</MenuButton>
                                                <Menu sx={{ zIndex: 1300, minWidth: 180, '--ListItemDecorator-size': '24px' }}>
                                                    {peopleNameList.map((item: string) => (
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
                                        </Item>
                                        <Item sx={{ gridRow: '1', gridColumn: '3/5' }}>
                                            <Input
                                                startDecorator={'$'}
                                                value={splitedValue}
                                                onChange={(event) => setSplitedValue(event.target.value)}
                                                slotProps={{
                                                    input: {
                                                        component: NumericFormatAdapter,
                                                    },
                                                }}
                                                autoFocus required placeholder="輸入金額" />
                                        </Item>
                                    </Box>
                                </FormControl>
                            )}
                            <CssVarsProvider theme={theme}>
                                <Button onClick={handleEdit} type="submit" color="secondary">確認</Button>
                            </CssVarsProvider>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </div>
    );
}
export default EditItemModal;