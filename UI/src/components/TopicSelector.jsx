import React from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

const TopicSelector = ({topic = '', menuItems = [], onOptionSelected}) => {
   const capitalized = (str) => {
      let capitalizedStr = str
         .split(' ')
         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
         .join(' ')
      return capitalizedStr
   }

   return (
      <FormControl size="medium" sx={{height: '100%', width: '100%'}}>
         <Select
            value={capitalized(topic)}
            onChange={onOptionSelected}
            displayEmpty
            size="small"
            sx={{height: '100%', width: '100%', fontSize: '16px'}}
            inputProps={{'aria-label': 'Without label'}}>
            <MenuItem value="" sx={{fontSize: '14px'}}>
               Select Topic
            </MenuItem>
            {menuItems.map((value, index) => (
               <MenuItem key={index} sx={{fontSize: '14px'}} value={value}>
                  {value}
               </MenuItem>
            ))}
         </Select>
      </FormControl>
   )
}

export default TopicSelector
