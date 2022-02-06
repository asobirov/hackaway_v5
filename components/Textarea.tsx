import { Stack, Text, Textarea as ChakraTextarea, TextareaProps as ChakraTextareaProps, useColorModeValue } from '@chakra-ui/react'

type TextareaProps = {
    label?: string;
    register?: any;
} & ChakraTextareaProps;

const Textarea = ({ label, register, ...rest }: TextareaProps) => {
    return (
        <Stack>
            {label && (
                <Text fontWeight={600} fontSize={'1.1rem'}>
                    {label}
                </Text>
            )}
            <ChakraTextarea
                border={'1px'}
                borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
                borderRadius={'xl'}
                transition={'all 0.2s ease-out'}
                size={'md'}
                _hover={{
                    borderColor: useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
                }}
                {...rest}
                {...register}
            />
        </Stack>
    )
};

export default Textarea;
