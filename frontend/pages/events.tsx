import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Code,
  chakra,
  Heading,
  Link,
  Text,
  Button,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as Unlock from '../services/unlock/unlock'

import {
  useAccount,
  useContractWrite,
  useContractRead,
  usePrepareContractWrite,
  useProvider,
  useWaitForTransaction,
} from 'wagmi'
import { Layout } from '../components/layout/Layout'
import CreateLock from '../components/CreateLock'
import { EventCard} from '../components/EventCard'
import { IDKit} from '../components/IDKit'
import { useCheckLocalChain } from '../hooks/useCheckLocalChain'
import { useIsMounted } from '../hooks/useIsMounted'
import useEvents from '../hooks/useEvents'
import { BriteEvent } from '../types/eventbrite'

const GOERLI_CONTRACT_ADDRESS = 123123123;

const Events: NextPage = () => {
  const router = useRouter()
  const token = router.asPath.split('access_token=')[1];
  const { data, loading } = useEvents(token)

  const { address, isConnected } = useAccount()

  const { isLocalChain } = useCheckLocalChain()

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
        { data && (
          <div className='events'>
            { data.map((ev: BriteEvent) => <EventCard key={ev.name} event={ev} />) }
          </div>
        )}
        { !data && (
          <div className='events'>
            { testEvent.map((ev: BriteEvent) => <EventCard key={ev.name} event={ev} />) }
          </div>
        )}
        <IDKit />
    </Layout>
  )
}

export default Events
