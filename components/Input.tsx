import { Input as ChakraInput, Text, InputProps as ChakraInputProps, useColorModeValue, Stack } from "@chakra-ui/react";

type InputProps = {
    label?: string;
    register?: any;
} & ChakraInputProps;

const Input = ({ label, register, ...rest }: InputProps) => {
    return (
        <Stack>
            {label && (
                <Text fontWeight={600} fontSize={'1.1rem'}>
                    {label}
                </Text>
            )}
            <ChakraInput
                border={'1px'}
                borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
                borderRadius={'xl'}
                transition={'all 0.2s ease-out'}
                size={'md'}
                h={12}
                _hover={{
                    borderColor: useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
                }}
                {...rest}
                {...register}
            />
        </Stack>
    );
};

export default Input;
