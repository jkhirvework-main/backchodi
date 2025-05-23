'use client'

import { AppBar, Box, Button, Container, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemText, Stack, TextField, Toolbar, Typography, useMediaQuery, Zoom } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useTheme } from '@emotion/react';
import MyLogo from './MyLogo';
import { usePathname } from 'next/navigation';


const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];


const links = [{
    title: 'Home',
    link: '#'
}, {
    title: 'About Us',
    link: '#'
}, {
    title: 'Contact',
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
    const [dialogOpen, setDialogOpen] = useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const container = window !== undefined ? () => window().document.body : undefined;
    const fullScreen = useMediaQuery(theme => theme.breakpoints.down('md'));

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: theme.palette.secondary.main, color: '#fff', height: '100%' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding component="a" href="/search/diagrams/diagram">
                        {/* <Link href='/search/diagrams/diagram'> */}
                        <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton>

                        {/* </Link> */}

                        {/* <ListItemButton sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item} />
                        </ListItemButton> */}
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


                            <Button variant="contained" disableElevation sx={{ height: { xs: 32, sm: 32, md: 48, lg: 48 }, }} startIcon={<PersonOutlineIcon />}
                                onClick={() => {
                                    setDialogOpen(true)
                                }}
                            >
                                My Account
                            </Button>
                        </Toolbar> : null
                    }
                </Container>
            </AppBar>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullScreen={fullScreen} >

                <DialogTitle  id="responsive-dialog-title" sx={{textAlign: 'center', p: 0, mt: 4}}>
                    {"Log in / Register"}
                </DialogTitle>
                <Typography sx={{textAlign: 'center'}}>Enter your email address.</Typography>

                <DialogContent sx={{minWidth: 380, textAlign: 'center'}} >
                    <TextField placeholder='Name' size='small'/>
                </DialogContent>

            </Dialog>

            {pathName != '/search/diagrams/diagram' ?
                <Toolbar ></Toolbar> : null}

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
