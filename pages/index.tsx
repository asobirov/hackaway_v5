import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'

const Home: NextPage = () => {

  return (
    <Box>
      Hello
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/discover',
      permanent: false,
    }
  }
}

export default Home
