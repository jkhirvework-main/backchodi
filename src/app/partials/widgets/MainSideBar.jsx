'use client'

import { setDrawerOpen } from '@/app/GlobalRedux/slice/partial.slice';
import Utils from '@/utils/Utils';
import styled from '@emotion/styled';
import { Box, Divider, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, useMediaQuery } from '@mui/material'
import { IconDownload, IconFavicon, IconHeartPlus, IconHelp, IconHistory, IconHome, IconIceCream, IconMessageChatbot, IconSettings, IconVideo } from '@tabler/icons-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';


const CustomListItemButton = styled(ListItemButton)(() => ({
    borderRadius: 4,
    '&:hover': {
        backgroundColor: Utils.lightPrimaryColor,
        color: Utils.primaryColor
    }, '&.Mui-selected': {
        backgroundColor: Utils.primaryColor,
        color: 'white',
        '&:hover': {
            backgroundColor: Utils.primaryColor,
            color: 'white',
        },
    }, "&.Mui-selected:hover": {
        backgroundColor: Utils.primaryColor, // Custom hover color for selected item
    },
}))

const NListItem = ({ text, icon, href, icon2 }) => {
    const pathName = usePathname();

    return (
        <ListItem key={text} sx={{ p: 0.25 }} component='nav'>
            <CustomListItemButton href={href} selected={pathName === href} >
                <ListItemIcon color='white'>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
            </CustomListItemButton>
        </ListItem>
    )
}




const SideBarContent = () => {
    const size = 20;
    const pathName = usePathname();

    return (
        <>
            <Box sx={{ p: 2.5 }} >

                <Stack direction="row" spacing={2} alignItems="center"  >
                    <Image src={'/icon-192x192.png'} width={30} height={30} alt='Logo'/>
                    <Typography sx={{ fontSize: 22, fontWeight: 700, letterSpacing: 1.2 }}>FIXOMOTIVE</Typography>
                </Stack>

            </Box>
            <Box sx={{ px: 1 }}>
                <List>
                    <NListItem href={'/home2'} text={'Home'} icon={<IconHome width={size} height={size} color={'/home2' === pathName ? 'white' : 'grey'} />} />
                    <NListItem href={'/history'} text={'History'} icon={<IconHistory width={size} height={size} color={'/history' === pathName ? 'white' : 'grey'} />} />
                    <NListItem text={'Favourites'} icon={<IconHeartPlus width={size} height={size} />} />
                    <NListItem href={'/downloads'} text={'Downloads'} icon={<IconDownload width={size} height={size} color={'/downloads' === pathName ? 'white' : 'grey'} />} />
                    <NListItem href={'/tutorials'} text={'Tutorials'} icon={<IconVideo width={size} height={size} color={'/tutorials' === pathName ? 'white' : 'grey'}/>} />
                    <Divider sx={{ my: 1 }} />
                    <NListItem  text={'Support'} icon={<IconMessageChatbot width={size} height={size} />} />
                    <NListItem text={'Settings'} icon={<IconSettings width={size} height={size} />} />
                    <NListItem text={'Help'} icon={<IconHelp width={size} height={size} />} />
                </List>
            </Box>

        </>
    );
}



export default function MainSideBar() {
    const drawerWidth = 270;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
    const isOpen = useSelector(state => state.partialSlice.drawer.isOpen);
    const dispatch = useDispatch();

    const closeHandler = () => {
        dispatch(setDrawerOpen(false))
    }


    return (
        <>
            {lgUp ? <Drawer
                sx={{
                    width: isOpen ? drawerWidth : 0,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: isOpen ? drawerWidth : 0,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={isOpen}
            >

                <SideBarContent />
            </Drawer> :
                <Drawer
                    anchor="left"
                    sx={{ width: drawerWidth }}
                    open={isOpen}
                    onClose={closeHandler}
                >

                    <SideBarContent />
                </Drawer>

            }
        </>

    )
}
