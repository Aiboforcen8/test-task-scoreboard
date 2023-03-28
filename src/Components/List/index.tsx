import { useEffect, useRef, useState } from 'react'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import styled from '@emotion/styled'

import { User } from '../types'
import { UserCard } from '../UserCard'
import { Helmet } from '../../Assets/Helmet'
import { racersCount } from '../../users-generator'

interface Paginator {
  from: number
  to: number
}

interface ListProps {
  usersArr: User[]
}

export const List = (props: ListProps) => {
  const { usersArr } = props

  const [loading, setLoading] = useState<boolean>(false)

  const [params, setParams] = useState<Paginator>({
    from: 0,
    to: 50,
  })

  const [users, setUsers] = useState<User[]>(usersArr.slice(0, 50))

  const wrapperRef = useRef<HTMLDivElement>(null)

  const handleChangePage = () => {
    paginator(params)
  }

  useEffect(() => {
    handleChangePage()
  }, [params])

  const paginator = (params: Paginator) => {
    const { to, from } = params
    setUsers(usersArr.slice(from, to))
  }

  const nextPage = () => {
    if (params.to === racersCount) return

    setParams({
      from: params.to - 2,
      to: params.to + 50,
    })
  }

  const prevPage = () => {
    if (!params.from) return

    setParams({
      from: params.from - 50 > 0 ? params.from - 50 : 0,
      to: params.from + 2,
    })
  }

  const loadingHandler = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
  }

 

  const handleScroll = async (e: any) => {
    if (e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) < 1) {
      await loadingHandler()
      nextPage()

      if (params.to < 450) {
        wrapperRef?.current?.scrollTo(0, 200)
      }
    }

    if (e.target.scrollTop < 100 && params.from > 0) {
      await loadingHandler()
      prevPage()

      if (params.to > 0) wrapperRef?.current?.scrollTo(0, e.target.scrollHeight - 1000)
    }
  }

  return (
    <Wrapper>
      <Grid mb={1} sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Typography variant='h2' fontWeight={500}>
          Racers scoreboard
        </Typography>
        <Helmet />
      </Grid>
      <ListWrapper onScroll={handleScroll} ref={wrapperRef}>
        {loading && (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
        {users.map((user) => {
          return (
            <UserCard
              key={user.rating}
              firstName={user.firstName}
              middleName={user.middleName}
              lastName={user.lastName}
              avatar={user.avatar}
              rating={user.rating}
              speed={user.speed}
              penaltyTime={user.penaltyTime}
              time={user.time}
            />
          )
        })}
        {loading && (
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        )}
      </ListWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const ListWrapper = styled.div`
  padding: 1rem;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  background: #ffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
`
