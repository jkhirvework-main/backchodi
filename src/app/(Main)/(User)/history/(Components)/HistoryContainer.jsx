'use client'

import { Box, Paper, Tab, Tabs, useMediaQuery } from '@mui/material';
import React, { useState } from 'react'
import HistoryCard from './HistoryCard';


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}




export default function HistoryContainer({ infoHistory, dtcHistory }) {
    const [typeValue, setTyeValue] = useState(0);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const handleChange = (event, newValue) => {
        setTyeValue(newValue);
    };

    return (
        <>
            <Box>

                <Tabs
                    value={typeValue}
                    onChange={handleChange}
                    variant={!lgUp ? "standard" : "fullWidth"}
                    sx={{
                        mt: 8,
                        ".Mui-selected": {
                            backgroundColor: '#ffffff',
                        },
                    }}
                    TabIndicatorProps={{
                        style: { display: 'none' }
                    }}
                >
                    <Tab
                        label="Info"
                        fullWidth
                        wrapped
                        {...a11yProps(0)}
                        sx={{ borderRadius: 2, borderBottomLeftRadius: 0, borderTopRightRadius: 0, backgroundColor: '#e5f1fc', borderBottomRightRadius: 0, fontSize: 16, fontWeight: 600, px: 4, }}
                    />
                    <Tab
                        label="DTC"
                        fullWidth
                        wrapped
                        {...a11yProps(1)}
                        sx={{ borderRadius: 2, borderBottomLeftRadius: 0, borderTopLeftRadius: 0, backgroundColor: '#e5f1fc', borderBottomRightRadius: 0, fontSize: 16, fontWeight: 600, px: 5 }}
                    />
                </Tabs>
            </Box>
            <Box variant='outlined' sx={{ backgroundColor: '#ffffff', py: 3, px: 2, borderRadius: 2, borderTopLeftRadius: 0, borderTopRightRadius: { sm: 0, xs: 0, md: 2, lg: 2, xl: 2 } }}>
                <CustomTabPanel value={typeValue} index={0} >
                    {infoHistory.map(item => {
                        const { data } = item;
                        return (
                            <HistoryCard key={item.id} title={data.oem + ' ' + data.model + ' (' + data.year + ')'} id={data.engineId} description={data.engine} type={item.type} />
                        )
                    })}
                </CustomTabPanel>
                <CustomTabPanel value={typeValue} index={1} >
                    {dtcHistory.map(item => {
                        const { data } = item;
                        return (
                            <HistoryCard key={item.id} title={data.oem + ' ' + data.model}  description={data.dtc} type={item.type} data={data}/>
                        )
                    })}
                </CustomTabPanel>
            </Box>
        </>

    )
}
