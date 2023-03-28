import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  styled,
  Typography,
} from '@mui/material'
import { User } from '../types'
import { Arrow } from '../../Assets/Arrow'

export const UserCard = (props: User) => {
  const { firstName, middleName, lastName, rating, avatar, speed, time, penaltyTime } = props

  const fullName = `${firstName} ${middleName} ${lastName}`
  return (
    <Wrapper>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<Arrow />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Grid container>
              <Grid
                item
                xs={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img
                  width='50px'
                  height='50px'
                  src={avatar}
                  alt='ava'
                  style={{ borderRadius: '100px' }}
                />
              </Grid>
              <Grid xs={9} item>
                <Typography variant='h5' component='div'>
                  {fullName}
                </Typography>
                <Typography color='text.secondary'>Rating: {rating}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ width: 450, display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography>Max speed:</Typography>
                <Typography>{speed} km/h</Typography>
              </Box>
              <Box>
                <Typography>Time:</Typography>
                <Typography>{time}</Typography>
              </Box>
              <Box>
                <Typography color='red'>Penalty time:</Typography>
                <Typography color='red'>{penaltyTime} seconds</Typography>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  max-width: 500px;
  margin: 0.5rem;
  padding: 0;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  border-radius: 5px;
  cursor: pointer;
 &:hover {
  box-shadow: 0 0 30px rgba(0,0,0,0.5);
},
`
