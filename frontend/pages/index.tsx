import {
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Link,
  ListItem,
  Text,
  UnorderedList,
  useToast,
  chakra,
  Stack,
  Flex
} from '@chakra-ui/react'
import { ethers, providers } from 'ethers'
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

  const eventBriteUri = `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${process.env.EVENTBRITE_ID
    }&redirect_uri=${encodeURI(
      `${process.env.NEXT_AUTH_URL}/events`
    )}`;

  if (!isMounted) {
    return null
  }

  return (
    <Layout>
      <Flex bg="#edf3f8" _dark={{ bg: "#3e3e3e", }} p={50} w="full" alignItems="center" justifyContent="center" >
        <Flex justify="center" bg="white" _dark={{ bg: "gray.800", }} w="full"  >
          <Box w={{ base: "full", md: "75%", lg: "50%", }} px={4} py={20} textAlign={{ base: "left", md: "center", }}  >
            <chakra.span fontSize={{ base: "3xl", sm: "4xl", }} fontWeight="extrabold" letterSpacing="tight" lineHeight="shorter" color="gray.900" _dark={{ color: "gray.100", }} mb={6}  >
              <chakra.span display="block">Ready to dive in?</chakra.span>
              <chakra.span display="block" color="brand.600" _dark={{ color: "gray.500", }}  >
                Start your free trial today.
              </chakra.span>
            </chakra.span>
            <Stack justifyContent={{ base: "left", md: "center", }} direction={{ base: "column", sm: "row", }} spacing={2} mt={2}  >
              <Box display="inline-flex" rounded="md" shadow="md">
                <chakra.a mt="2" disabled={!address} href={eventBriteUri} px={5} py={3} border="solid transparent" fontWeight="bold" rounded="md" _hover={{ bg: "brand.50", }} className="chakra-button">
                  Import with EventBrite
                </chakra.a>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  )
};

export default Home
