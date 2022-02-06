import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools'
const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
    cssVarPrefix: '',
}


const styles = {
    global: (props: any) => ({
        '*': {
            outlineWidth: '0!important'
        },
        // html: {
        //     cursor: 'none!important'
        // },
        // a: {
        //     cursor: 'none!important'
        // },
        body: {
            bg: mode("#f5f5f7", "#111")(props),
            transitionDuration: '250ms',
            overscrollBehavior: 'none',
            scrollBehavior: 'smooth',
            overflow: { md: 'unset!important' },
        },
        '::selection': {
            color: mode('blackAlpha.900', 'whiteAlpha.500')(props),
            background: 'none'
        },
        "#__next": {
            d: 'flex',
            flexDirection: 'column',
            minH: '100vh',
        }
    })
}

const colors = {
    link: {
        "default": 'white',
        "hover": "#d8d8d8",
        "active": "blue",
    },
    whiteAlpha: {
        250: 'rgba(255, 255, 255, 0.12)'
    }
}

const fonts = {
    heading: "Poppins, Avenir Next, sans-serif",
    body: "Poppins, Avenir Next, sans-serif",
}

const components = {
    Container: {
        baseStyle: {
            // maxW: ['26rem', '38rem', '45rem', '60rem'],
            w: '100%',
            maxW: '100%',
            mx: ['4', '8', '4', '5'],
            transition: 'padding .8s ease-in-out, max-width .8s ease, box-shadow 250ms',
            minW: "16rem",
            // mx: [undefined, undefined, '6', undefined]
        }
    },
    Heading: {
        variants: {
            "page-heading": (props: any) => ({
                display: { base: 'none', md: 'block' },
                color: mode("black", "white")(props),
                mb: 10,
                fontSize: '5xl',
                textAlign: 'center',
                lineHeight: '1',
            })
        }
    },
    Link: {
        baseStyle: (props: any) => ({
            textDecoration: false,
            color: 'link.default',
            _hover: {
                textDecoration: false,
                color: mode('black', "link.hover")(props),
            }
        }),
        variants: {
            "hover-through": (props: any) => ({
                pos: 'relative',
                transition: 'all 0.33s',
                color: mode('gray.800', 'white')(props),
                _before: {
                    content: '""',
                    w: '0',
                    h: '1px',
                    pos: 'absolute',
                    bottom: 0,
                    right: 0,
                    bg: mode('black', "link.hover")(props),
                    transition: 'all 0.33s'
                },
                _hover: {
                    _before: {
                        w: 'full',
                        left: 0,
                    }
                },
                '&.active': {
                    _before: {
                        w: 'full',
                        left: 0,
                    }
                }
            }),
            "hover-bg": (props: any) => ({
                px: 3,
                py: 2,
                borderRadius: '1rem',
                transition: 'all 0.33s ease, font-weight 0s, color 0.2s ease',
                color: mode('blackAlpha.700', "whiteAlpha.700")(props),

                _hover: {
                    // color: mode('#108949', 'green.400')(props),
                    color: mode('black', "white")(props),
                    // bg: mode('blackAlpha.200', 'whiteAlpha.200')(props)
                },
                _active: {
                    bg: mode('blackAlpha.300', 'whiteAlpha.250')(props)
                },
                '&.active': {
                    color: mode('black', 'white')(props),
                    fontWeight: 700
                }
            }),
            "scale-on-hover": (props: any) => ({
                w: 'auto',
                h: 'auto',
                minW: 'unset',
                color: mode('blackAlpha.700', 'whiteAlpha.700')(props),

                _hover: {
                    color: mode('inherit', 'white')(props),
                    transform: "scale(1.15)"
                },
                _active: {
                    color: mode('inherit', 'white')(props),
                    transform: "scale(0.85)"
                }
            }),
            "color-on-hover": (props: any) => ({
                color: mode('blackAlpha.700', 'whiteAlpha.700')(props),
                _hover: {
                    color: mode('inherit', 'white')(props),
                },
                _active: {
                    color: mode('inherit', 'white')(props),
                }
            })
        },
    },
    Box: {
        variants: {
            "content-box": (props: any) => ({
                bg: mode('whiteAlpha.200', 'red.200')
            })
        }
    },
    Button: {
        defaultProps: {
            variant: 'ghost',
        },
        baseStyle: (props: any) => ({
            borderRadius: '2xl',
            border: '1px solid',
            borderColor: mode('black', 'whiteAlpha.300')(props),
            py: 6,
        }),
        variants: {
            ghost: (props: any) => ({
                _hover: {
                    bg: mode('blackAlpha.200', 'whiteAlpha.200')(props)
                },
                _active: {
                    bg: mode('blackAlpha.300', 'whiteAlpha.250')(props)
                },
            }),
            "scale-on-hover": {
                w: 'auto',
                h: 'auto',
                minW: 'unset',
                color: 'whiteAlpha.500',

                _hover: {
                    color: 'white',
                    transform: "scale(1.2)"
                },
                _active: {
                    color: 'white',
                    transform: "scale(1)"
                }
            },
            "icon-button": (props: any) => ({
                borderRadius: '1.25rem',
                // border: { base: '1px solid', md: '0' },
                border: '1px solid',
                transition: 'all 0.33s ease, border .1s ease-out, background-color .2s ease',
                userSelect: 'none',
                py: 'unset',
                borderColor: mode('blackAlpha.700', undefined)(props),
                outline: 'none!important',
                _hover: {
                    bg: mode('blackAlpha.200', 'whiteAlpha.200')(props)
                },
                _active: {
                    bg: mode('blackAlpha.300', 'black')(props),
                    borderColor: mode("rgba(0, 0, 0, 0)", "rgba(255, 255, 255, 0)"),
                    borderWidth: 0,
                    transition: 'all 0.33s ease, border .1s ease',
                    // transition: 'all 0.33s ease, border 2s ease-in-out',
                },
            })
        }
    },
    Table: {
        variants: {

            "default": (props: any) => ({
                "thead": {
                    "th": {
                        py: 0
                    }
                },
                "tbody": {
                    "td": {
                        bg: mode("blackAlpha.100", "whiteAlpha.50")(props),
                        whiteSpace: "nowrap",
                        "&:first-child": {
                            borderRadius: ' 1.25rem 0 0 1.25rem'
                        },
                        "&:last-child": {
                            borderRadius: '0 1.25rem 1.25rem 0'
                        }
                    }
                },
            })
        }
    },
    Text: {
        variants: (props: any) => ({
            "highlight": {
                color: mode("black", "whiteAlpha.700")(props),
                fontWeight: "medium",
            }
        })
    },
}

const overrides = {}

const theme = extendTheme({ styles, config, fonts, colors, components, overrides })

export default theme;
