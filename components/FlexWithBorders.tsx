import { ComponentWithAs, Flex, useColorModeValue, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type FlexWithBordersProps = {
    children: ReactNode,
    isInvalid?: boolean,
} & FlexProps;

const FlexWithBorders = ({ children, isInvalid, ...rest }: FlexWithBordersProps | any) => {
    return <Flex
        border={'1px'}
        borderColor={isInvalid ? '#fc8181' : useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
        borderRadius={'xl'}
        transition={'all 0.2s ease-out'}
        boxShadow={isInvalid ? '0 0 0 1px #fc8181' : 'none'}
        _hover={{
            borderColor: useColorModeValue('blackAlpha.300', 'whiteAlpha.300')
        }}
        {...rest}
    >
        {children}
    </Flex>;
};

export default FlexWithBorders;
