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
import { BriteEvent } from '../types/eventbrite'

const Events: NextPage = () => {
  const router = useRouter()
  const token = router.asPath.split('access_token=')[1];
  const { data, loading, error } = useEvents("DDD")

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

  const testEvent: BriteEvent[] = [
    {
      "name": "The launch Party Celebration",
      "image": "https://cdn.discordapp.com/attachments/933796379837497414/1073284030809784430/ticketing-image.png",
      "description": "During this we will celebrate our launch as well as show more people how this all works!\nThis is powered by **NFT** using the [Unlock Protocol](https://unlock-protocol.com).",
      "url": "https://www.eventbrite.ca/e/mito-launch-party-tickets-666032700737",
      "start": "2023-06-25T19:00:00",
      "end": "2023-06-26T03:00:00",
      "timezone": "America/Toronto",
      "address": "Toronto, ON"
    }
  ]

  return (
    <Layout>
      <Heading as="h1" mb="8" />
        {loading && (
          <Box padding='6' boxShadow='lg' bg='white'>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </Box>
        )}
        {(data && data.length == 0 && !loading) && (
          <div>You do not have any events</div>
        )}
        { data && data.length > 0 && (
          <div className='events'>
            { data.map((ev: BriteEvent) => <EventCard key={ev.name} event={ev} />) }
          </div>
        )}
        { Boolean(error) && !loading && (
          <div className='events'>
            { testEvent.map((ev: BriteEvent) => <EventCard key={ev.name} event={ev} />) }
          </div>
        )}
    </Layout>
  )
}

export default Events
