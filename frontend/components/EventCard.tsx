import { Box, chakra, Link, Center, Image, Flex, Badge, Text, Button } from "@chakra-ui/react";
import { BriteEvent } from "../types/eventbrite";
import { useState } from "react";
import CreateLock from "./CreateLock";

export function EventCard({event} : {event: BriteEvent}) {

  const [showForm, setShowForm] = useState(false)


  return (
    <Flex
      bg="#edf3f8"
      _dark={{
        bg: "#3e3e3e",
      }}
      p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box bg="white" _dark={{bg: "gray.800"}}
        mx={{
          lg: 8,
        }}
        display={{
          lg: "flex",
        }}
        maxW={{
          lg: "5xl",
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
            mt={4}
            color="gray.600"
            _dark={{
              color: "gray.400",
            }}
          >
            { event.description }
          </chakra.p>

          { showForm && <CreateLock event={event} />}

          {!showForm && <Box mt={8}>
            <Button
              bg="gray.900"
              color="gray.100"
              px={5}
              py={3}
              fontWeight="semibold"
              rounded="lg"
              _hover={{
                bg: "gray.700",
              }}
              onClick={() => {
                setShowForm(!showForm)
              }}
            >
              Create Token
            </Button>
          </Box>}
        </Box>
      </Box>
    </Flex>
    );
}

export default EventCard