import {Accordion, AccordionDetails, AccordionSummary, Typography} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React, {useEffect, useRef, useState} from 'react'

const AccordionWrapper = ({children}) => {
   const [isAccordionOpen, setIsAccordionOpen] = useState(false)
   const accordionRef = useRef(null)

   useEffect(() => {
      const handleClickOutsideAccordion = (event) => {
         if (accordionRef.current && !accordionRef.current.contains(event.target)) {
            setIsAccordionOpen(false)
         }
      }

      document.addEventListener('mousedown', handleClickOutsideAccordion)

      return () => {
         document.removeEventListener('mousedown', handleClickOutsideAccordion)
      }
   }, [accordionRef, setIsAccordionOpen])
   return (
      <Accordion
         ref={accordionRef}
         expanded={isAccordionOpen}
         onChange={() => setIsAccordionOpen(!isAccordionOpen)}>
         <AccordionSummary
            style={{minHeight: '48px'}}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography variant="h5" fontWeight="600">
               OpenAI API Key:
            </Typography>
         </AccordionSummary>
         <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
   )
}

export default AccordionWrapper
