import { Box, chakra, Text, Button, Collapse, Flex } from "@chakra-ui/react";
import { BriteEvent } from "../types/eventbrite";
import { useState } from "react";
import CreateLock from "./CreateLock";

export function EventCard({
  event,
  deployed,
} : {
  event: BriteEvent,
  deployed: string[],
}) {

  const [showForm, setShowForm] = useState(false)

  return (
    <Box
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={50}
      w="full"
      position="relative"
    >

      {(deployed.indexOf(event.id) > -1) && (
        <Box 
          pos="absolute" 
          right={12} 
          bg="green.400" 
          color="white"
          py={2}
          px={4}
          rounded="sm"
          fontSize="sm"
        >
          Deployed
        </Box>
      )}

      <Box bg="white" _dark={{bg: "gray.800"}}
        width="full"
        display={{
          lg: "flex",
        }}
        shadow={{
          lg: "lg",
        }}
        rounded={{
          lg: "lg",
        }}
      >
        <Box
          w={{
            lg: "50%",
          }}
        >
          <Box
            h={{
              base: 64,
              lg: "full",
            }}
            rounded={{
              lg: "lg",
            }}
            bgSize="cover"
            bgPosition="center"
            style={{
              backgroundImage: `url('${event.image}')`
            }}
          ></Box>
        </Box>

        <Box
          py={12}
          px={6}
          maxW={{
            base: "xl",
            lg: "5xl",
          }}
          w={{
            lg: "50%",
          }}
        >
          <chakra.h2
            fontSize={{
              base: "2xl",
              md: "3xl",
            }}
            color="gray.800"
            _dark={{
              color: "white",
            }}
            fontWeight="bold"
          >
            { event.name }
          </chakra.h2>
          <chakra.p
            my={4}
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
          >
            { event.description }
          </chakra.p>

          <CardInfo title="Start Date" value={(new Date(event.start)).toLocaleString()} />
          {event.end && <CardInfo title="End Date" value={(new Date(event.end)).toLocaleString()} />}
          {event.address && <CardInfo title="Location" value={event.address} />}

          <Box mt={8}>
            <Button
              bg={showForm ? "gray.200" : "gray.900"}
              color={showForm ? "gray.800" : "gray.100"}
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              _hover={{
                bg: showForm ? "gray.300" : "gray.700",
              }}
              onClick={() => {
                setShowForm(!showForm)
              }}
            >
              { showForm ? 'Cancel' : 'Create Payment'}
            </Button>
          </Box>

        </Box>
      </Box>
      
      <Collapse 
        startingHeight={0} 
        in={showForm}
      >
        <CreateLock event={event} />
      </Collapse>


    </Box>
    );
}

function CardInfo({
  title,
  value,
} : {
  title: string,
  value: string,
}) {
  return (
    <Flex 
      mb={1} 
      align="center" 
      gap={2}
      fontSize="sm"
      fontWeight="semibold"
      color="gray.500"
    >
      <Text>{title}: </Text> <Text>{value}</Text>
    </Flex>
  )
}

export default EventCard