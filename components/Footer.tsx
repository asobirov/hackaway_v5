import { Container, useColorModeValue, Stack, Text, Flex } from "@chakra-ui/react"
import { Telegram, Twitter, GitHub, LinkedIn, Instagram } from 'iconoir-react'
import { Link } from "@components/Link";

const socials = [
    {
        label: 'GitHub',
        icon: <GitHub />,
        href: 'https://github.com/asobirov',
        hideOnMobile: false,
    },
    {
        label: 'Instagram',
        icon: <Instagram />,
        href: 'https://www.instagram.com/asobirov_/',
        hideOnMobile: true,
    },
    {
        label: 'Telegram',
        icon: <Telegram />,
        href: 'https://t.me/asobirov',
        hideOnMobile: false,
    },
    {
        label: 'Twitter',
        icon: <Twitter />,
        href: 'https://twitter.com/asobirov_',
        hideOnMobile: true,
    },

    {
        label: 'LinkedIn',
        icon: <LinkedIn />,
        href: 'https://www.linkedin.com/in/asobirov/',
        hideOnMobile: false,
    },
]


const Footer = () => {
    return (
        <Flex>
            <Container>
                <Stack
                    align="flex-start"
                    borderTop="1px"
                    py={5}
                    borderColor={useColorModeValue('blackAlpha.700', 'whiteAlpha.300')}
                >
                    <Stack
                        direction="row"
                        justify="space-between"
                        w="full"
                    >
                        <Text fontSize='sm'>
                            © minted
                        </Text>
                        <Stack
                            direction='row'
                            spacing={6}
                            justify='space-between'
                        >

                            {socials.map((s, key) => (
                                <Link
                                    display={{ base: s.hideOnMobile ? 'none' : 'inline-block', md: 'inline-block' }}
                                    key={key}
                                    href={s.href}
                                    isExternal
                                    variant='scale-on-hover'
                                    fontSize='sm'
                                    aria-label={s.label}
                                >
                                    {s.icon}
                                </Link>
                            ))}
                        </Stack>
                    </Stack>
                </Stack>
            </Container >
        </Flex>
    )
}

export default Footer
