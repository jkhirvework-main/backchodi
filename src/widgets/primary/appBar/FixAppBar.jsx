'use client'

import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemText, Stack, Toolbar, Typography, useMediaQuery, Zoom } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useTheme } from '@emotion/react';
import MyLogo from './MyLogo';
import shortid from 'shortid';
import { usePathname } from 'next/navigation';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];


const links = [{
    title: 'Tutorials',
    link: '#'
}, {
    title: 'Life Hacks',
    link: '#'
}, {
    title: 'Shop',
    link: '#'
}, {
    title: 'CarBook',
    link: '#'
}, {

    title: 'Discussion',
    link: '#'
}]


const LinkComponent = ({ title, link }) => {

    const [color, setColor] = useState('white');
    const [checked, setChecked] = useState(false);


    const mouseOver = () => {
        setColor('#006AD3');
        setChecked(true)
    }

    const mouseOut = () => {
        setColor('white')
        setChecked(false)
    }



    return (
        <Box onMouseOver={mouseOver} onMouseOut={mouseOut}>
            <Link href={link} underline={'none'} sx={{ color }}>{title}</Link>

            <Zoom in={checked}
            >
                <Box sx={{ width: '100%', height: 2, backgroundColor: '#006AD3', mt: 0.5 }}></Box>
            </Zoom >
        </Box>
    );
}

export default function FixAppBar(props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const { window } = props;
    const theme = useTheme();
    const pathName = usePathname();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));



    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: theme.palette.secondary.main, color: '#fff', height: '100%' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="fixed" elevation={0} component={'nav'} >
                <Container maxWidth="xl" disableGutters={true} >
                    

                    {pathName != '/search/diagrams/diagram' ?
                        <Toolbar >
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 0.5, display: { md: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>


                            <Box flexGrow={{ xs: 1, sm: 1, xl: 0 }} display={'flex'} alignItems={'center'}>
                                <MyLogo />
                            </Box>


                            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' } }} display={'flex'} flexGrow={1}  >
                                <Stack spacing={{ xl: 6, lg: 6, md: 3, }} direction={'row'} justifyContent={'center'} justifyItems={'center'} alignItems={'center'} alignContent={'center'}>
                                    {links.map(item => {
                                        return (
                                            <LinkComponent key={item.title} title={item.title} link={'#'} />
                                        )
                                    })}
                                </Stack>
                            </Box>


                            <Button variant="contained" disableElevation sx={{ height: { xs: 32, sm: 32, md: 48, lg: 48 }, }} startIcon={<PersonOutlineIcon />}>
                                My Account
                            </Button>
                        </Toolbar> : null
                        // <Toolbar >
                        //     <IconButton
                        //         color="inherit"
                        //         aria-label="open drawer"
                        //         edge="start"
                        //         onClick={handleDrawerToggle}
                        //         sx={{ mr: 0.5, display: { md: 'none' } }}
                        //     >
                        //         <MenuIcon />
                        //     </IconButton>

                        //     <Box flexGrow={{ xs: 1, sm: 1, xl: 0 }} display={'flex'} alignItems={'center'}>
                        //         <MyLogo />
                        //     </Box>

                        //     <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' } }} display={'flex'} flexGrow={1}  >
                        //         <Stack spacing={{ xl: 6, lg: 6, md: 3, }} direction={'row'} justifyContent={'center'} justifyItems={'center'} alignItems={'center'} alignContent={'center'}>
                        //             {links.map(item => {
                        //                 return (
                        //                     <LinkComponent key={item.title} title={item.title} link={'#'} />
                        //                 )
                        //             })}
                        //         </Stack>
                        //     </Box>


                        //     {isDesktop ? null : <SearchOutlinedIcon sx={{ mx: { xl: 4, xs: 2 } }} /> }


                        //     {isDesktop ?
                        //         <Button variant="contained" disableElevation sx={{ height: { xs: 32, sm: 32, md: 48, lg: 48 }, }} startIcon={<PersonOutlineIcon />}>
                        //             My Account
                        //         </Button>
                        //         : <AccountCircleOutlinedIcon />}

                        // </Toolbar>
                    }
                </Container>
            </AppBar>

            {pathName != '/search/diagrams/diagram' ?
            <Toolbar ></Toolbar> : null }

            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </>

    )
}
