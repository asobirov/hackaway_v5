import { MouseEventHandler } from 'react';
import { useRouter } from 'next/router'
import NextLink from 'next/link';

import { Link as ChakraLink } from '@chakra-ui/react';

type LinkProps = {
    href: string
    children: any
    activeOnPage?: boolean //IDK,
    isExternal?: boolean
    onClick?: MouseEventHandler<HTMLAnchorElement>
    [rest: string]: any;
}

export const Link = ({ href = '#', activeOnPage = false, activeColor, activeVariant, isExternal, children, onClick, ...rest }: LinkProps): JSX.Element => {
    const router = useRouter()
    const isActive = router.pathname === href

    return (
        <NextLink href={href} passHref={true}>
            <ChakraLink
                className={activeOnPage && isActive ? 'active' : ''}
                isExternal={isExternal}
                onClick={onClick}
                {...rest}
            >
                {children}
            </ChakraLink>
        </NextLink>
    )
}