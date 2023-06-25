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
import { CreateLock} from '../components/CreateLock'
import { EventCard} from '../components/EventCard'
import { IDKit} from '../components/IDKit'
import { useCheckLocalChain } from '../hooks/useCheckLocalChain'
import { useIsMounted } from '../hooks/useIsMounted'
import { getUserEvents } from '../services/eventbrite/eventbrite'

const GOERLI_CONTRACT_ADDRESS = 123123123;

const Events: NextPage = () => {
  const router = useRouter()
  let token = router.asPath.split('access_token=')[1];
  if (token) {
   const events = getUserEvents(token)
   console.log(events)
    
// Create configured Eventbrite SDK
// When all request endpoints will be full URLs
    
  }

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


  return (
    <Layout>
      <Heading as="h1" mb="8">
      </Heading>
        <EventCard></EventCard>
        <CreateLock></CreateLock>
        <IDKit></IDKit>
    </Layout>
  )
}

export default Events
