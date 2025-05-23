'use client'

import { AppBar, Avatar, Badge, Box, Container, IconButton, Link, Stack, Toolbar, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Image from "next/image";
import { Notifications } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerOpen, showToast } from "@/app/GlobalRedux/slice/partial.slice";
import { getNotifications } from "@/app/user/actions/UserAction";

export function MainAppBar(props) {

    const isOpen = useSelector(state => state.partialSlice.drawer.isOpen);
    const lgUp = !useMediaQuery((theme) => theme.breakpoints.up('md'));

    const dispatch = useDispatch();

    const sideBarHandler = () => {
        dispatch(setDrawerOpen(!isOpen))
    }

    const notificationHandler = async () => {
        const data = await getNotifications();

        dispatch(showToast({isOpen: true, type: 'success', message: 'Notifications Loaded'}))
    }

    return (
        <AppBar position="fixed" elevation={lgUp ? 1 : 0} component={'nav'} sx={{ color: 'black' }}>
            <Toolbar >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={sideBarHandler}
                >
                    <MenuIcon />
                </IconButton>


                <Stack direction="row" spacing={2} alignItems="center" sx={{ marginLeft: 'auto' }}>
                    <IconButton color="inherit" onClick={notificationHandler}>
                        <Badge badgeContent={5} color="primary">
                            <Notifications />
                        </Badge>

                    </IconButton>

                    <IconButton component={Link} href="/profile">
                        <Avatar alt="Profile" src="/home/images/avatar.webp" sx={{ width: 30, height: 30 }} />
                    </IconButton>

                </Stack>
            </Toolbar>
        </AppBar>
    )
}