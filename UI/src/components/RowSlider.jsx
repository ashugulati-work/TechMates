import { Grid, Slider } from '@mui/material'
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
               />
            </Grid>
            <Grid item>
               <input
                  style={{width: '40%'}}
                  type="text"
                  disabled
                  className="form-control range-value"
                  value={no_of_sentences}
               />
            </Grid>
         </Grid>
      </div>
   )
}

export default RowSlider
