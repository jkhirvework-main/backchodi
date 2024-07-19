import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';
import shortid from 'shortid';

export default function CheckList({ mt = 0, list = [], minWidth = '46px', gap = 0, fontSize = 16 }) {
    return (
        <>
            <List sx={{ mt, pb: 2, pt: 0 }}>
                {list.map(text => {
                    return (
                        <ListItem key={shortid.generate()} sx={{ mt: gap }}>
                            <ListItemIcon sx={{ minWidth }}>
                                <CheckIcon fontSize='small' sx={{ color: '#006AD3' }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography fontSize={fontSize}>{text}</Typography>}
                            />
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}
