import {FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography} from '@mui/material'
import React from 'react'

const ToneSelector = ({handleToneChange, selectedTone}) => {
   const radioButtons = ['Positive', 'Neutral', 'Negative']
   return (
      <div className="tone">
         <Grid container gap={3} alignItems="center">
            <Grid item>
               <Typography variant="h5" fontSize="15px" fontWeight={600}>
                  Tone:
               </Typography>
            </Grid>
            <Grid item alignItems="center">
               <FormControl>
                  <RadioGroup
                     onChange={handleToneChange}
                     row
                     aria-labelledby="demo-row-radio-buttons-group-label"
                     name="row-radio-buttons-group">
                     {radioButtons.map((name, index) => (
                        <FormControlLabel
                           key={index}
                           value={name.toLowerCase()}
                           control={
                              <Radio name="tone" checked={selectedTone === name.toLowerCase()} />
                           }
                           label={name}
                        />
                     ))}
                  </RadioGroup>
               </FormControl>
            </Grid>
         </Grid>
      </div>
   )
}

export default ToneSelector
