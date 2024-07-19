import { Box, Dialog, DialogContent, Divider, Icon, IconButton, List, ListItemButton, ListItemText, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Storage from '@/utils/Storage';
import Utils from '@/utils/Utils';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SearchTextField = ({ setOpen }) => {
  const [text, setText] = useState('');
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const clickHandler = (component) => {
    setOpen(false)
    component.select();
  }

  return (
    <DialogContent className="testdialog" sx={{ p: 0 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ px: 2, py: 2 }}>
        {isMobile ? <ArrowBackIcon sx={{ color: 'grey' }} onClick={() => setOpen(false)} /> : <SearchIcon sx={{ color: 'grey' }} />}
        <TextField
          variant="standard"
          InputProps={{
            disableUnderline: true,
          }}
          placeholder='Search Components'
          fullWidth
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {text.length > 0 ?
          <IconButton onClick={() => setText('')}>
            <CloseIcon sx={{ color: 'grey' }} size="small" />
          </IconButton> : null}
      </Stack>

      <Divider />

      <Box p={1} sx={{ maxHeight: '60vh', overflow: 'auto' }} >
        <Typography variant="h6" py={1} px={5} sx={{ fontSize: 18 }}>Components</Typography>

        <Box >
          <List component="nav">
            {Storage.components.filter(component => text.length === 0 || component.fName.toLowerCase().startsWith(text.toLowerCase())).map(component => {
              return (
                <Box key={Utils.getNanoId()}>
                  <ListItemButton sx={{ py: 0.5, px: 5 }} onClick={() => clickHandler(component)}>
                    <ListItemText
                      primary={component.fName + ' - ' + (component.compCode ? component.compCode : 'F7')}
                      primaryTypographyProps={{ fontSize: '14px' }}
                      sx={{ my: 0, py: 0.5, fontSize: 14 }}
                    />
                  </ListItemButton>
                </Box>
              )
            })}
          </List>
        </Box>
      </Box>

    </DialogContent>

  );
}


export default function DiagramSearchComponent() {
  const [showDrawer2, setShowDrawer2] = useState(false);
  const fullScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <>
      <IconButton onClick={() => setShowDrawer2(true)}>
        <SearchIcon sx={{ color: '#fff' }} />
      </IconButton>

      <Dialog
        open={showDrawer2}
        onClose={() => setShowDrawer2(false)}
        fullWidth
        maxWidth={'sm'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { position: 'fixed', top: { xl: 30, xs: 0 }, m: 0, px: 0 } }}
        fullScreen={fullScreen}
      >

        <SearchTextField setOpen={setShowDrawer2} />

      </Dialog>
    </>
  )
}
