import {
  Box,
  Link,
  Text,
  useToast,
  SimpleGrid,
  Image,
  chakra,
  Stack,
  Flex,
  Icon
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useReducer } from 'react'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useWaitForTransaction,
} from 'wagmi'
import { YourContract as LOCAL_CONTRACT_ADDRESS } from '../artifacts/contracts/contractAddress'
import YourContract from '../artifacts/contracts/YourContract.sol/YourContract.json'
import { Layout } from '../components/layout/Layout'
import { useCheckLocalChain } from '../hooks/useCheckLocalChain'
import { useIsMounted } from '../hooks/useIsMounted'
import EventsImport from '../components/ImportEvents'

/**
 * Constants & Helpers
 */


const GOERLI_CONTRACT_ADDRESS = '0x3B73833638556f10ceB1b49A18a27154e3828303'

/**
 * Prop Types
 */
type StateType = {
  greeting: string
  inputValue: string
}
type ActionType =
  | {
    type: 'SET_GREETING'
    greeting: StateType['greeting']
  }
  | {
    type: 'SET_INPUT_VALUE'
    inputValue: StateType['inputValue']
  }

/**
 * Component
 */
const initialState: StateType = {
  greeting: '',
  inputValue: '',
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    // Track the greeting from the blockchain
    case 'SET_GREETING':
      return {
        ...state,
        greeting: action.greeting,
      }
    case 'SET_INPUT_VALUE':
      return {
        ...state,
        inputValue: action.inputValue,
      }
    default:
      throw new Error()
  }
}

const Home: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { isLocalChain } = useCheckLocalChain()

  const { isMounted } = useIsMounted()

  const CONTRACT_ADDRESS = isLocalChain
    ? LOCAL_CONTRACT_ADDRESS
    : GOERLI_CONTRACT_ADDRESS

  const { address } = useAccount()

  const provider = useProvider()

  const toast = useToast()

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: YourContract.abi,
    functionName: 'setGreeting',
    args: [state.inputValue],
    enabled: Boolean(state.inputValue),
  })

  const { data, write } = useContractWrite(config)

  const { isLoading } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      console.log('success data', data)
      toast({
        title: 'Transaction Successful',
        description: (
          <>
            <Text>Successfully updated the Greeting!</Text>
            <Text>
              <Link
                href={`https://goerli.etherscan.io/tx/${data?.blockHash}`}
                isExternal
              >
                View on Etherscan
              </Link>
            </Text>
          </>
        ),
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
    },
  })

  if (!isMounted) {
    return null
  }

  return (
    <Layout>

    <SimpleGrid  w="100%" columns={{  base: 1,  md: 2,  }}  spacing={0} >
      <Flex bg="brand.600">
        <Image  src="https://i.imgur.com/Qko4Jy4.png"  alt="djembe show"  fit="cover"  w="full"  h={{  base: 64,  md: "full",  }}  bg="gray.100"  loading="lazy" />
        </Flex> 
        <Flex  direction="column"  alignItems="start"  justifyContent="center"  px={{  base: 4,  md: 8,  lg: 20,  }}  py={24}  zIndex={3}  >
          <chakra.span  color="brand.600"  _dark={{  color: "gray.300",  }}  fontSize="lg"  textTransform="uppercase"  fontWeight="extrabold"  >  
          Crypto with Event  
          </chakra.span>  
          <chakra.h1  mb={4}  fontSize={{  base: "4xl",  md: "4xl",  lg: "5xl",  }}  fontWeight="bold"  color="brand.600"  _dark={{  color: "gray.300",  }}  lineHeight="shorter"  textShadow="2px 0 currentcolor"  >  
          We&apos;re here to bridge 
           </chakra.h1>  
           <chakra.p  pr={{  base: 0,  lg: 16,  }}  mb={4}  fontSize="lg"  color="brand.600"  _dark={{  color: "gray.400",  }}  letterSpacing="wider"  >  
           Get the Event ticket with Cryptos and start having personalized experiences at every stage of the life journey.  
           </chakra.p>  
           {address && <Box display="inline-flex" rounded="md" shadow="md">
              <EventsImport />
          </Box>}  
         </Flex> 
      </SimpleGrid>
      </Layout>
              
  )
};

export default Home
