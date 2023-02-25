import {Grid, Input, Slider, TextField, Tooltip} from '@mui/material'
import React from 'react'

const RowSlider = ({onChangeRowHandler, no_of_sentences}) => {
   return (
      <div id="generate-rows">
         <Grid container spacing={2} alignItems="center">
            <Grid item>
               <label className="tone__label_name">Generate Rows:</label>
            </Grid>
            <Grid item xs>
               <Slider
                  id="myRange"
                  value={no_of_sentences}
                  onChange={onChangeRowHandler}
                  aria-labelledby="input-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  min={1}
                  max={100}
               />
            </Grid>
            <Grid item>
               <Tooltip title="This is a maximum number of sentences to generate" arrow>
                  <TextField
                     size="small"
                     style={{width: '30%'}}
                     type="text"
                     disabled
                     value={no_of_sentences}

                  />
               </Tooltip>
            </Grid>
         </Grid>
      </div>
   )
}

export default RowSlider
