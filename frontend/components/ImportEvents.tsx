import { chakra, Image } from '@chakra-ui/react'
import eventbriteIcon from '../public/eventbrite-icon.svg'

export default function EventsImport() {

    const eventBriteUri = `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${process.env.EVENTBRITE_ID
    }&redirect_uri=${encodeURI(
    `${process.env.NEXT_AUTH_URL}/events`
    )}`;

    return (
        <chakra.a  mt={2}  href={eventBriteUri}  display="inline-flex"  alignItems="center"  justifyContent="center"  px={5}  py={3}  border="solid transparent"  fontWeight="bold"  w="full"  rounded="md"  _light={{  color: "black",  }}  bg="brand.600"  _dark={{  bg: "brand.500",  }}  _hover={{  bg: "brand.700",  _dark: {  bg: "brand.600",  },  }}  > 
             Import from Eventbrite  <Image width={6} height={6} src={eventbriteIcon.src} ml={2} alt='Event' />  
        </chakra.a>
    )
}