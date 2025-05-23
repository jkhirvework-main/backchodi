'use client'

import { addHistory } from '@/app/user/actions/UserAction'
import Utils from '@/utils/Utils'
import { Avatar, Box, Button, Card, CardActionArea, CardContent, Divider, Grid, Stack, Typography } from '@mui/material'
import { IconEngine } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function SearchCardHome({ title, id, description }) {
    const router = useRouter();
    const searchData = Utils.getFromLocalStorageJ('searchData');

    const handleCardClick = async () => {
        searchData.engine = description;
        searchData.engineId = id;

        Utils.saveToLocalStorageJ('searchData', searchData);

        const { oem, model, year, engine, engineId } = searchData;
        // const userId = Utils.getFromLocalStorageJ('user').id;
        const userId = 1;
        

        
        // await addHistory(userId, 'info', { oem, model, year, engine, engineId });

        router.push('/home2/' + id + '?oemId=' + searchData.oemId + '&modelId=' + searchData.modelId + '&year=' + searchData.year + '&engineId=' + id);
    }

    return (
        <Card variant='outlined' sx={{ borderLeftColor: Utils.primaryColor, borderRadius: 2, borderLeftWidth: 3, borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }} >


            <CardActionArea onClick={handleCardClick}>

                <CardContent sx={{ width: '100%', pb: 0 }} style={{ paddingBottom: 16 }}>

                    <Box display={'flex'}>
                        <Avatar variant="rounded" sx={{ backgroundColor: '#EDF4FF', height: 56, width: 56 }} >
                            <Avatar variant="rounded" sx={{ backgroundColor: '#EDF4FF', height: 36, width: 36 }} src='/home/images/tata.svg' >
                            </Avatar>
                        </Avatar>

                        <Box sx={{ ml: 2, flexGrow: 1 }} >
                            <Typography variant='h6' >{title ? title : searchData.oem + " " + searchData.model}</Typography>
                            <Typography sx={{ mt: 0.5, fontWeight: 600, fontSize: 14, color: Utils.primaryColor }}>{searchData.year + ' ' + description}</Typography>
                        </Box>

                        <Box sx={{ py: 1 }}>
                            <Typography variant="contained" size="small" sx={{ backgroundColor: '#EDF4FF', color: Utils.primaryColor, fontSize: 16, fontWeight: 500, ml: 2, px: 2, py: 1, borderRadius: 1 }}>
                                ABS
                            </Typography>
                        </Box>

                    </Box>

                </CardContent>

            </CardActionArea>



        </Card>
    )
}
