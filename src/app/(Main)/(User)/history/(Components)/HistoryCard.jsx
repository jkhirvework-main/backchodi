'use client'

import Utils from '@/utils/Utils'
import { Avatar, Box, Card, CardActionArea, CardContent, IconButton, Typography } from '@mui/material'
import { IconArrowRight } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function HistoryCard({ title, id, description, type, data }) {
    const router = useRouter();

    const handlerCardClick = () => {
        if (type === 'info') {

            router.push('/home2/' + id);
        }else {
            router.push('/home2/dtc?code='+data.dtc+'&oemId='+data.oemId+'&modelId='+data.modelId);
        }
    }

    return (
        <Card variant='outlined' sx={{ borderLeftColor: Utils.primaryColor, borderRadius: 2, borderLeftWidth: 3, borderTopLeftRadius: 6, borderBottomLeftRadius: 6, m: 2 }} >
            <CardActionArea onClick={handlerCardClick}>
                <CardContent sx={{ width: '100%', pb: 0 }} style={{ paddingBottom: 12, paddingTop: 12 }}>
                    <Box display={'flex'} alignItems={'center'}>
                        <Avatar variant="rounded" sx={{ backgroundColor: '#EDF4FF', height: 48, width: 48 }} >
                            <Avatar alt='Car Logo' variant="rounded" sx={{ backgroundColor: '#EDF4FF', height: 32, width: 32 }} src='/home/images/tata.svg' >
                            </Avatar>
                        </Avatar>

                        <Box sx={{ ml: 3, flexGrow: 1 }} >
                            <Typography variant='h6' >{title ? title : ''}</Typography>
                            <Typography sx={{ mt: 0.5, fontWeight: 600, fontSize: 14, color: Utils.primaryColor }}>{description}</Typography>
                        </Box>

                        <Box sx={{mr: 1}}>
                            <IconArrowRight width={18} height={18} color={Utils.primaryColor} />
                        </Box>

                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
