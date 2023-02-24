import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AdbIcon from '@mui/icons-material/Adb'

const MainHeader = () => {
   return (
      <Box sx={{flexGrow: 1}}>
         <AppBar position="static">
            <Toolbar>
               <AdbIcon sx={{fontSize: '3rem', display: {xs: 'none', md: 'flex'}, mr: 1}} />
               <Typography variant="h4" component="div" sx={{flexGrow: 1}}>
                  SynthAI
               </Typography>
            </Toolbar>
         </AppBar>
      </Box>
   )
}

export default MainHeader
