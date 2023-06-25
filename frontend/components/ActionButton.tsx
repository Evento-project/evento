import { Button } from "@chakra-ui/react"

export default function ActionButton({
    title,
    onClick,
    disabled,
    loading,
} : {
    title: string,
    onClick: () => void,
    disabled: boolean,
    loading: boolean,
}) {
    return (
        <Button 
            bg="gray.900"
            color="gray.100"
            _hover={{
                bg: "gray.700",
            }}
            disabled={disabled} 
            isLoading={loading}
            width="full"
            py={6}
            onClick={onClick}
        >
            { title }
        </Button>
    )
}