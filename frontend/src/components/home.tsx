import * as React from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import CancelIcon from '@mui/icons-material/Cancel';
import { Link } from 'react-router-dom';


function Home() {
    const [eventName, setEventName] = React.useState('');
    const [peopleName, setPeopleName] = React.useState('');
    const [peopleNameList, setPeopleNameList] = React.useState<string[]>([]);
    // click 新增: 顯示peopleName，並清空peopleName
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPeopleNameList((prevList) => [...prevList, peopleName]);
        setPeopleName('');
    }
    const handleDeletePerson = (index) => {
        // Remove the person from the list based on the index
        setPeopleNameList((prevList) => [...prevList.slice(0, index), ...prevList.slice(index + 1)]);
    };
    const getRandomColor = () => {
        // Generate a random color in hex format
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
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
                <h4>參與人員</h4>
                <br />
            </Stack>
            <form onSubmit={handleSubmit}>
                <Input
                    sx={{ '--Input-decoratorChildHeight': '38px' }}
                    placeholder="分母名稱"
                    required
                    value={peopleName}
                    onChange={(e) => setPeopleName(e.target.value)}
                    endDecorator={<Button
                        variant="solid"
                        color="primary"
                        onClick={
                            () => {
                                setPeopleNameList((prevList) => [...prevList, peopleName]);
                                setPeopleName('');
                            }
                        }
                    >
                        新增
                    </Button>}
                />
            </form>
            {/* TO-DO: 用List呈現 */}
            {peopleNameList.map((person, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <div
                        style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: getRandomColor(), // Set your desired color
                            marginRight: '8px',
                        }}
                    ></div>
                    <span>{person}</span>
                    <CancelIcon onClick={() => handleDeletePerson(index)} />
                </div>
            ))}
            <br />
            {/* 點擊建立後，進到detail頁面 */}
            <Link to="/event">
                <Button type="submit">建立</Button>
            </Link></>

    );
};
export default Home;