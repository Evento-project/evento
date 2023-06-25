import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import { UnlockV11, PublicLockV11 } from "@unlock-protocol/contracts";
import { 
  Alert,
  AlertIcon,
  Box,
  Button, 
  chakra,
  Checkbox,
  Flex,
  Input,
  Text,
} from "@chakra-ui/react";
import {
  erc20ABI,
  useAccount,
  useSendTransaction,
  useWaitForTransaction,
  useContractRead,
  usePrepareContractWrite
} from 'wagmi'
import { BriteEvent } from '../types/eventbrite';
import IDKit from './IDKit';
import ActionButton from './ActionButton';

const lockInterface = new ethers.utils.Interface(PublicLockV11.abi)


export default function CreateLock({event} : {event: BriteEvent}) {
  const { address: creator, isConnected } = useAccount()

  const [calldata, setCalldata] = useState('')
  const [humanOnly, setHumanOnly] = useState(false)
  const [name, setName] = useState(event.name)
  const [price, setPrice] = useState('1')
  const [duration, setDuration] = useState('30') // in days
  const [supply, setSupply] = useState('10000')
  const [currency, setCurrency] = useState('') // address of the ERC20. If 0x0, uses base currency

  const { data: decimals } = useContractRead({
    address: currency,
    abi: erc20ABI,
    functionName: 'decimals',
    enabled: currency !== ethers.constants.AddressZero
  })


  useEffect(() => {
    const prepareCalldata = async () => {
      setCalldata(lockInterface.encodeFunctionData(
        'initialize(address,uint256,address,uint256,uint256,string)',
        [
          creator,
          parseInt(duration) * 60 * 60 * 24, // duration is in days!
          currency || ethers.constants.AddressZero,
          ethers.utils.parseUnits(price, decimals || 18),
          supply,
          name,
        ]
      ))
    }
    prepareCalldata()
  }, [creator, duration, currency, price, supply, name, decimals])


  const { config } = usePrepareContractWrite({
    address: '0x627118a4fB747016911e5cDA82e2E77C531e8206',
    abi: UnlockV11.abi,
    functionName: 'createUpgradeableLockAtVersion',
    args: [calldata, 11] // We currently deploy version 11
  })
  const { data: transaction, sendTransaction } = useSendTransaction(config)

  const { isLoading, isSuccess, data: receipt, isError } = useWaitForTransaction({
    hash: transaction?.hash,
  })

  return (
    <chakra.form>

      <Text 
        as='b' 
        fontSize='xl'
        style={{marginTop: '24px', marginBottom: '15px', display: 'block'}}
      >Deploy a new membership contract!</Text>

      <FormInput 
        label='Name' 
        value={name} 
        onChange={setName}
        placeholder='Event Name'
      />

      <FormInput 
        label='Duration(days)' 
        value={duration} 
        onChange={setDuration}
        type='number'
      />

      <FormInput 
        label='Supply' 
        value={supply} 
        onChange={setSupply}
        type='number'
      />

      <FormInput 
        label="Currency" 
        value={currency} 
        onChange={setCurrency}
        tips="Address of the ERC20 contract used as currency for purchases. Leave empty to use the chain's base currency"
      />

      <FormInput  
        label='Price' 
        value={price} 
        onChange={setPrice}
        type='number'
      />

      <Checkbox
        checked={humanOnly}
        onChange={(e) => setHumanOnly(e.target.checked)}
      >
        Human only
      </Checkbox>


      <Box mt={8} textAlign="center">
        {humanOnly ? (<IDKit 
          title='Deploy' 
          disabled={!Boolean(sendTransaction)}
          loading={isLoading}
          next={() => { sendTransaction!()}}
        />) : (
          <ActionButton 
            title='Deploy'
            onClick={() => { sendTransaction!()}}
            disabled={!Boolean(sendTransaction)}
            loading={isLoading}
          />
        )}
      </Box>

      {(isError || isSuccess) && (
        <Box mt={4} textAlign="center">
          { isError ? (
            <Alert status='error' rounded={8}>
              <AlertIcon />
              Transaction Error! { transaction?.hash }
            </Alert>
          ) : (
            <Alert status='success' rounded={8}>
              <AlertIcon />
              Success! Lock Deployed at {receipt?.logs[0].address}
            </Alert>
          )}
        </Box>
      )}

    </chakra.form>
  )
}


function FormInput({
  label,
  value,
  placeholder = '',
  onChange,
  type = 'text',
  tips,
} : {
  label: string,
  value: string,
  placeholder?: string,
  onChange: (val: string) => void,
  type?: string,
  tips?: string,
}) {
  return <Box mb={4}>
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      gap="8px"
    >
        <Text as='b' style={{flex: 'none', width: '132px'}}>{label}</Text>
        <Input
          onChange={(e) => onChange(e.target.value)}
          type={type}
          value={value}
          required
          placeholder={placeholder}
        />
    </Flex>
    { tips && <Text fontSize='sm' color='GrayText'>{tips}</Text>}
  </Box>
}