import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Code,
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
  Unlock.getLock("0xadfdea6285c03fc1177168f8ae116f00b48f612e", 80001)
  import {
    useAccount,
    useContractWrite,
    useContractRead,
    usePrepareContractWrite,
    useProvider,
    useWaitForTransaction,
  } from 'wagmi'
  import { Layout } from '../components/layout/Layout'
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
    const eventBriteUri = `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${
        process.env.EVENTBRITE_ID
      }&redirect_uri=${encodeURI(
        `${process.env.NEXT_AUTH_URL}/events`
      )}`;

     


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
          Token Gated Page
        </Heading>
        <Button
            mt="2"
            colorScheme="teal"
            disabled={!address}
          >
            <a href={eventBriteUri}>
                <span className="block w-max text-sm font-semibold tracking-wide text-gray-700 transition duration-300 group-hover:text-blue-600 sm:text-base">
                Continue with EventBrite
                </span>
            </a>
            {/* {address ? 'Fetch Greeting' : 'Please Connect Your Wallet'} */}
          </Button>
      </Layout>
    )
  }
  
  export default Events
  