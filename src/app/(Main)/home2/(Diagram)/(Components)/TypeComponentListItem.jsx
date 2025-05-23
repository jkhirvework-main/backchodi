'use client'

import { Avatar, Box, Link, ListItem } from "@mui/material";
import { IconEngine } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

export const TypeComponentListItem = ({ type, id, query }) => {
    const pathName = usePathname(); 

    return (
        <>
            <ListItem sx={{px: 0, mx: 0}} >
                <Box display={'flex'} alignItems={'center'}>
                    <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>
                        <IconEngine />
                    </Avatar>

                    <Link href={pathName+'/'+id+query} underline="hover" sx={{ ml: 2 }} color={'black'}> {type}</Link>
                    {/* <Typography variant='body' href={href} sx={{ ml: 2 }}>{type}</Typography> */}
                </Box>
            </ListItem>
        </>
    );
}