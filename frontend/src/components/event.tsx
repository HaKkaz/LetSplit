import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import { FaPen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import Avatar from '@mui/joy/Avatar';
import ListItemContent from '@mui/joy/ListItemContent';
import Accordion from '@mui/joy/Accordion';
import AccordionSummary from '@mui/joy/AccordionSummary';
import AccordionDetails from '@mui/joy/AccordionDetails';
import Stack from '@mui/joy/Stack';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Switch from '@mui/joy/Switch';
import Checkbox from '@mui/joy/Checkbox';

import AirplanemodeActiveRoundedIcon from '@mui/icons-material/AirplanemodeActiveRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import BluetoothRoundedIcon from '@mui/icons-material/BluetoothRounded';
import TapAndPlayRoundedIcon from '@mui/icons-material/TapAndPlayRounded';


function Event() {
    const creationDateTime = new Date(); // Get the current date and time

    // const formattedDateTime = new Intl.DateTimeFormat('en-US', {
    //     year: 'numeric',
    //     month: '2-digit',
    //     day: '2-digit',
    //     hour: 'numeric',
    //     minute: 'numeric',
    // }).format(creationDateTime);
    const formattedDateTime = `${creationDateTime.getFullYear()}.${String(creationDateTime.getMonth() + 1).padStart(2, '0')}.${String(creationDateTime.getDate()).padStart(2, '0')} ${String(creationDateTime.getHours()).padStart(2, '0')}:${String(creationDateTime.getMinutes()).padStart(2, '0')}`;
    return (
        <>
            <h1>這是標題</h1>
            <Tabs aria-label="Basic tabs" defaultValue={0}>
                <TabList>
                    <Tab> 收支明細 </Tab>
                    <Tab>結算總覽</Tab>
                </TabList>
                <TabPanel value={0}>
                    <button>新增成員</button>
                    <button>新增項目</button>
                    <br />
                    <br />
                    <Card
                        variant="outlined"
                        sx={{
                            maxHeight: 'max-content',
                            maxWidth: '100%',
                            mx: 'auto',
                            // to make the demo resizable
                            overflow: 'auto',
                            resize: 'horizontal',
                        }}
                    >
                        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                            <Grid xs={12} sm container>
                                <Grid container direction="column" spacing={2}>
                                    <Grid>
                                        <Typography level="title-lg" gutterBottom component="div">
                                            臭豆腐
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <MdDelete color="#7CBBAE"
                                        fontSize="large"

                                        onClick={() => alert('You clicked the delete button!')}
                                    />
                                    <FaPen color="#7CBBAE" />
                                </Grid>
                            </Grid>
                            <Grid>
                                <Typography >
                                    {formattedDateTime}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider inset="none" />
                        {/* <Grid container spacing={2} sx={{ flexGrow: 1 }}>
                            <CardContent>
                                <Typography level="title-md" marginRight={20}>
                                    小豬支付 300 元
                                </Typography>
                            </CardContent>
                        </Grid>
                        <div className="bg-emerald-100 flex max-w-[277px] items-stretch justify-between gap-5 pl-6 pr-2.5 pt-4">
                            <IoIosArrowDropdownCircle />
                        </div> */}

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
                </TabPanel>

                <TabPanel value={1}>
                    <b>Second</b> tab panel
                </TabPanel>
            </Tabs>

        </>
    );
};
export default Event;