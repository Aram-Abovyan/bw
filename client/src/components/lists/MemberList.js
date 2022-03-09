import * as React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { removeMember } from '../../redux/features/workspase/workspaseSlice'

import { useParams } from 'react-router'

import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion from '@mui/material/Accordion'
import MuiAccordionSummary from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import QuestionAnswerSharpIcon from '@mui/icons-material/QuestionAnswerSharp'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StarIcon from '@mui/icons-material/Star';
import Button from '../buttons/Button'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  }
}))

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

const MemberList = () => {
  const [expanded, setExpanded] = React.useState('panel1')
  const dispatch = useDispatch()
  const params = useParams()

  const status = useSelector(({ workspace: { status } }) => status)
  const members = useSelector(({ workspace: { members } }) => members)
  const creator = useSelector(({ workspace: { creator } }) => creator)
  const currentUserId = useSelector(({ workspace: { currentUserId } }) => currentUserId)

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const handleRemove = (id) => () => {
    dispatch(removeMember({
      workspaceId: params.id,
      memberId: id
    }))
  }

  return (
    <div>
      <Typography
        align="center"
        variant="h5"
      >
        Members
      </Typography>
      {
        status === 'idle' ? 
        (
          <Accordion
            expanded={expanded === `${creator._id}`}
            onChange={handleChange(`${creator._id}`)}
          >

            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>{creator.username}</Typography>
              <StarIcon sx={{position: 'absolute' ,right: '0', mr: 2}} />
            </AccordionSummary>

            <AccordionDetails sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography>{creator.email}</Typography>
              <Typography>creator</Typography>
              {
                creator._id === currentUserId ?
                <Typography>me</Typography> :
                <Button
                  label={<QuestionAnswerSharpIcon />}
                />
              }
              
            </AccordionDetails>
          </Accordion>
        )
        : <CircularProgress sx={{ m: 3}} />}

      {status === 'idle' ? members.map(({ _id: id, username, email }) => (
        <Accordion
          expanded={expanded === `${id}`}
          onChange={handleChange(`${id}`)}
          key={id}
        >

          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{username}</Typography>
          </AccordionSummary>

          <AccordionDetails sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Typography>{email}</Typography>
            <Button
              onClick={handleRemove(id)}
              label={<DeleteForeverIcon />}
              color="error"
            />
            {
              currentUserId === id ?
              <Typography>me</Typography> :
              <Button
                label={<QuestionAnswerSharpIcon />}
              />
            }
          </AccordionDetails>

        </Accordion>
      )) : null}
    </div>
  )
}

export default MemberList