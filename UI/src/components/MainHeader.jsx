import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import AdbIcon from '@mui/icons-material/Adb'
import Icons from "../assets/logo.svg"; 

const MainHeader = () => {
   return (
      <Box sx={{flexGrow: 1}}>
         <AppBar position="static">
            <Toolbar>
               {/* <AdbIcon sx={{fontSize: '3rem', display: {xs: 'none', md: 'flex'}, mr: 1}} /> */}
               <img src={Icons} alt="" height="30px" width="30px" style={{marginRight:'1rem', color:'darkblue'}}/>
               <Typography variant="h4" component="div" sx={{flexGrow: 1, fontWeight:'600'}}>
                  SynthAI
               </Typography>
            </Toolbar>
         </AppBar>
      </Box>
   )
}

export default MainHeader
