import { getNotifications } from '@/app/user/actions/UserAction';
import { Box, Card, CardContent, CardHeader, Container, Divider, Grid, List } from '@mui/material'
import React from 'react'
import NotificationListItem from './(Components)/NotificationListItem';



export default async function page() {

    const notifications = await getNotifications();
    console.log(notifications)

    return (
        <Container sx={{ mt: { xl: 8, xs: 0 }, px: {xs: 0, xl: 4}, pt: { xl: 4, xs: 0 } }} maxWidth={'xl'}>
            <Card elevation={0} sx={{ mt: 2 }}>
                <Box>
                    <CardHeader title={'Notifications'} />
                </Box>

                <CardContent sx={{ px: 0, mx: 0 }}>
                    <Divider />

                    <List >
                        {notifications.map((notification, index) => {
                            return (
                                <Box key={index} sx={{}}>
                                    <NotificationListItem  notification={notification} />
                                    {notifications.length - 1 !== index && <Divider />}
                                </Box>

                            )
                        })}
                    </List>
                </CardContent>

            </Card>

        </Container>
    )
}
