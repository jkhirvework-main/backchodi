'use client'

import Utils from '@/utils/Utils'
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionSummary, Badge, Box, Divider, IconButton, ListItem, ListItemButton, Typography } from '@mui/material'
import { IconChevronDown, IconChevronUp, IconSection } from '@tabler/icons-react'
import Image from 'next/image'
import React from 'react'

export default function NotificationListItem({ notification }) {

    const [isOpen, setIsOpen] = React.useState(false);
    const [text, setText] = React.useState(notification.message);

    const handleChange = () => {
        if(isOpen){
            setText(notification.message);
        }else{
            setText('Sample Text for testing.')
        }
        setIsOpen(!isOpen);

   
    }

    return (
        <ListItem sx={{ px: 2, py: 1, width: '100%' }} >
            <Box display={'flex'} sx={{ width: '100%' }}>
                <Box sx={{ p: 2 }}>
                    <Badge variant="dot" color="primary" invisible={!notification.isRead}>
                        <IconSection color={Utils.primaryColor} />
                    </Badge>
                </Box>


                <Box sx={{ mt: 1, ml: 2, mb: 1 }} flexGrow={1}>
                    <Typography variant={'h6'}>{notification.title}</Typography>
                    <Box display={'flex'}>

                        <Typography variant={'body1'} sx={{ mt: 1 }}>{text}</Typography>
                        <Box sx={{ ml: 1 }}>
                            <IconButton onClick={handleChange}>
                                {isOpen ? <IconChevronUp size={20} /> : <IconChevronDown size={20} />}
                            </IconButton>

                        </Box>

                    </Box>

                </Box>

                <Box sx={{ mt: 1, mr: 2 }}>
                    <Typography variant={'body2'}>Just now</Typography>
                </Box>
            </Box>
        </ListItem>
    )
}
