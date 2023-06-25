import {
  Box,
  Heading,
  SkeletonCircle,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import {
  useAccount,
} from 'wagmi'
import { Layout } from '../components/layout/Layout'
import { EventCard} from '../components/EventCard'
import { useIsMounted } from '../hooks/useIsMounted'
import useEvents from '../hooks/useEvents'
import { BriteEvent, testEvents } from '../types/eventbrite'
import EventsImport from '../components/ImportEvents'

const Events: NextPage = () => {
  const router = useRouter()
  const token = router.asPath.split('access_token=')[1];
  const { data, loading, error } = useEvents(token)

  const { isConnected } = useAccount()

  const { isMounted } = useIsMounted()

  if (!isMounted) {
    return null
  }

  if (!isConnected) {
    return (
      <Layout>
        <Heading as="h1" mb="8">
          Unauthenticated
        </Heading>
        <Text fontSize="lg">Please connect a wallet</Text>
      </Layout>
    )
  }

  return (
    <Layout>
      <Heading as="h1" mb="8" />
        {!token && (
          <EventsImport />
        )}
        {loading && (
          <Box padding='6' boxShadow='lg' bg='white'>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </Box>
        )}
        { Boolean(error) && (
          <div className='events'>
            { testEvents.map((ev: BriteEvent) => <EventCard key={ev.name} event={ev} />) }
          </div>
        )}
        {data && data.length == 0 && (
          <div>You do not have any events</div>
        )}
        { data && data.length > 0 && (
          <div className='events'>
            { data.map((ev: BriteEvent) => <EventCard key={ev.name} event={ev} />) }
          </div>
        )}
    </Layout>
  )
}

export default Events
