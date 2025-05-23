'use client'

import { ExpandLess, ExpandMore, Inbox } from '@mui/icons-material'
import { Box, Collapse, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function ModuleListItem({ module, query }) {
    const [open, setOpen] = React.useState(false);
    const pathName = usePathname();

    const handlerClick = () => {
        setOpen(!open);
    }
    return (
        <>
            <ListItem key={module.id}>
                <ListItemButton onClick={handlerClick} disableRipple>
                    <ListItemText primary={module.name} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>


            </ListItem>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {module.subModules.map((subModule, index) => (
                        <Box key={index}>
                            <ListItem key={index} sx={{ pl: 6 }}>
                                <Link underline='hover' href={pathName + '/' + subModule.id + '?' + query} color={'black'}>
                                    {subModule.name}
                                </Link>
                            </ListItem>
                        </Box>

                    ))}
                </List>
            </Collapse>
        </>


    )
}
