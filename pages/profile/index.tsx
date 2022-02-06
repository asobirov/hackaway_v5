import { Avatar, Button, Text, Heading, Stack, IconButton, AspectRatio, Image, useColorModeValue, SimpleGrid, Grid, Divider, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerCloseButton, Flex, DrawerBody, FormControl, FormErrorMessage } from "@chakra-ui/react"
import FlexWithBorders from "@components/FlexWithBorders";
import { Link } from "@components/Link";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { GitHub, Instagram, Telegram, Twitter, LinkedIn, Music1Add, Edit, Coin } from "iconoir-react";
import { GetServerSideProps } from "next";
import fetcher from "@lib/fetcher";
import useSWR from "swr";
import TrackPlayerSlim from "@components/TrackPlayerSlim";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@lib/redux/store";
import Input from "@components/Input";
import { useForm } from "react-hook-form";
import axios from "axios";
import { updateProfile } from "@lib/redux/slices/profileSlice";

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

type FormValues = {
    name: string,
    email: string,
    username: string,
    avatar: string,
}

const ProfilePage = () => {
    const dispatch = useDispatch();
    const [activeTrack, setActiveTrack] = useState<string | null>(null);
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>()


    const { id, walletId, name: profileName, username } = useSelector((state: AppState) => state.profile);
    let { data: artist, error: userError } = useSWR<any>(`/api/artist/${username}`, fetcher);

    useEffect(() => {
        console.log('Active track', activeTrack);
    }, [activeTrack]);

    const onSubmit = async (values: any) => {
        const { data: artistD } = await axios.put(`/api/artist/${username}`, {
            name: values.name,
            email: values.email,
            username: values.username,
            avatar: values.avatar,
        })
        dispatch(updateProfile({
            id: artistD.id,
            walletId: artistD.walletId,
            name: artistD.name,
            username: artistD.username,
            avatar: artistD.avatar,
        }));
        artist = {
            ...artistD
        }
        onEditClose();

    }

    return (
        <Stack>
            <FlexWithBorders
                w='100%'
                py={10}
                px={10}
                mb={{ base: 8, md: 10 }}
                borderRadius={'2rem'}
                justify='space-between'
            >
                <Stack direction={'row'} spacing={10}>
                    <Avatar size='2xl' borderRadius={'1.5rem'} name={profileName ?? ""} src={artist?.avatar ?? ""} />
                    <Stack justify={'center'} spacing={2}>
                        <Heading size='xl'>{profileName}</Heading>
                        <Text fontSize="xl">{artist?.email}</Text>
                        <Stack
                            direction='row'
                            spacing={4}
                            pt={1}
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
                <Stack>
                    <IconButton
                        aria-label="Edit Profile"
                        size='lg'
                        icon={<Edit width={'1.5rem'} height={'1.5rem'} />}
                        onClick={onEditOpen}
                    />
                </Stack>
                <Drawer
                    isOpen={isEditOpen}
                    placement="right"
                    onClose={onEditClose}
                >
                    <DrawerOverlay />

                    <DrawerContent background={'whiteAlpha.200'} backdropFilter={"blur(20px)"}>
                        <DrawerHeader borderBottomWidth='1px'>
                            <Flex align={'center'} justify={'space-between'}>
                                <Heading size='lg'>Edit Profile</Heading>
                                <DrawerCloseButton position={'unset'} top={'unset'} right={'unset'} />
                            </Flex>
                        </DrawerHeader>
                        <DrawerBody pt={10}>
                            <Stack spacing={4} as='form' onSubmit={handleSubmit(onSubmit)}>
                                <FormControl isInvalid={errors.name ? true : false}>
                                    <Input
                                        id='name'
                                        label='Full name'
                                        placeholder='Enter your name...'
                                        register={register('name', {
                                            required: false,
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.name && errors.name.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.email ? true : false}>
                                    <Input
                                        id='email'
                                        label='Email'
                                        placeholder='Enter your email...'
                                        register={register('email', {
                                            required: false,
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.email && errors.email.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.avatar ? true : false}>
                                    <Input
                                        id='avatar'
                                        label='Image URL'
                                        placeholder='Enter your avatar...'
                                        register={register('avatar', {
                                            required: false,
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.avatar && errors.avatar.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={errors.username ? true : false}>
                                    <Input
                                        id='username'
                                        label='username'
                                        placeholder='Enter your username...'
                                        register={register('username', {
                                            required: false,
                                        })}
                                    />
                                    <FormErrorMessage>
                                        {errors.username && errors.username.message}
                                    </FormErrorMessage>
                                </FormControl>
                                <Button isLoading={isSubmitting} type='submit'>
                                    Submit
                                </Button>
                            </Stack>
                        </DrawerBody>

                    </DrawerContent>
                </Drawer>
            </FlexWithBorders>
            <Stack direction={'row'} justify={'space-between'}>
                <Heading size={'xl'} mb={{ base: 5, md: 8 }} >
                    Latest Tracks
                </Heading>
                <NextLink href='/profile/new-track'>
                    <Button leftIcon={<Music1Add />}  >
                        Mint new track
                    </Button>
                </NextLink>
            </Stack>
            <Grid gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'} gap={10}>
                {
                    artist && artist.tracks ? (
                        artist.tracks.map((track: any, key: string) => (
                            <FlexWithBorders direction='column' borderRadius='2xl'>
                                <AspectRatio ratio={1} w={'100%'} borderTopRadius={'2xl'} overflow={'hidden'} bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}>
                                    <Image
                                        alt="alt"
                                        src={track.trackImageUrl}
                                        layout='fill'
                                        objectFit="cover"
                                        loading='lazy'
                                        placeholder='blur'
                                        userSelect={'none'} s
                                        pointerEvents={'none'}
                                    />
                                </AspectRatio>
                                <Stack
                                    direction={'column'}
                                    flex={1}
                                    py={5}
                                    px={6}
                                    spacing={4}
                                >
                                    <Heading size={'lg'} textAlign={'center'} isTruncated>{track.title}</Heading>
                                    <TrackPlayerSlim
                                        url={track.trackFileUrl}
                                        borderless
                                        isCurrent={activeTrack === track.id}
                                        onPlayerPlay={() => setActiveTrack(track.id)}
                                        onPlayerPause={() => setActiveTrack(null)}
                                    />
                                </Stack>
                            </FlexWithBorders>
                        ))
                    ) : (

                        <Heading size={'md'}>No tracks</Heading>
                    )
                }
            </Grid>

        </Stack >
    )
};

export default ProfilePage;
