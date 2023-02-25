import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Icons from '../assets/logo1.svg'

const MainHeader = () => {
   return (
      <Box sx={{flexGrow: 1}}>
         <AppBar position="static">
            <Toolbar>
               <img
                  src={Icons}
                  alt=""
                  height="30px"
                  width="30px"
                  style={{marginRight: '1rem'}}
               />
               <Typography variant="h4" component="div" sx={{flexGrow: 1, fontWeight: '600'}}>
                  Synth<span style={{color: 'RGB(255,248,189)'}}>AI</span>
               </Typography>
            </Toolbar>
         </AppBar>
      </Box>
   )
}

export default MainHeader
