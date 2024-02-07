import * as React from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
import { CssVarsProvider } from '@mui/joy/styles';
import theme from './../Theme.ts';
import { useNavigate } from 'react-router-dom';
import useCreateEvent  from '../hooks/createEvent.tsx';
import { User } from './interfaces/User.ts';

function Home() {
    const [eventName, setEventName] = React.useState('');
    const [peopleName, setPeopleName] = React.useState('');
    const [peopleNameList, setPeopleNameList] = React.useState<User[]>([]);

    const navigate = useNavigate();

    const handleDeleteUser = (index: number) => {
        // Remove the user from the list based on the index
        setPeopleNameList((prevList) => [...prevList.slice(0, index), ...prevList.slice(index + 1)]);
    };

    const getRandomColor = () => {
        // Generate a random color in hex format
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };

    const HandleCreateEventClick = () => {
        // Call the useCreateEvent hook with the necessary parameters
        useCreateEvent(eventName, peopleNameList , navigate);
    };



    return (
        <>
            <div className="App">
                {/* <header className="App-header"> */}
                <h1>LetSplit!</h1>
                <p>
                    Split money easier and smarter.
                </p>
                {/* </header> */}
            </div>
            <Stack spacing={2}>
                <h4>帳本名稱</h4>
                <Input color="neutral"
                    placeholder="帳本名稱"
                    required value={eventName}
                    onChange={(e) => setEventName(e.target.value)} />
                <br />
                <h4>參與人員</h4>
            <CssVarsProvider theme={theme}>
            <Input
                sx={{ '--Input-decoratorChildHeight': '38px' }}
                placeholder="分母名稱"
                // required
                value={peopleName}
                onChange={(e) => setPeopleName(e.target.value)}
                endDecorator={
                <Button
                    variant="solid"
                    color="secondary"
                    onClick={
                        () => {
                            if (peopleName.trim() === '') {
                                alert('請輸入參與人員名稱！');
                            } else {
                                setPeopleNameList((prevList) => [...prevList, { username: peopleName, color: getRandomColor() }]);
                                setPeopleName('');
                            }
                        }
                    }
                >
                    新增
                </Button>}
            />
            </CssVarsProvider>
            </Stack>
            
            {/* TO-DO: 用List呈現 */}
            {peopleNameList.map((person, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: person.color, // Set your desired color
                            marginRight: '8px',
                        }}
                    ></div>
                    <span>{person.username}</span>
                    <CancelIcon onClick={() => handleDeleteUser(index)} />
                </div>
            ))}
            <br />
            {/* 點擊建立後，進到detail頁面 */}
            
            <CssVarsProvider theme={theme}>
                <Button type="button" color="secondary" onClick={HandleCreateEventClick}>
                    建立
                </Button>
            </CssVarsProvider>
            
        </>

    );
};
export default Home;