import { AspectRatio, Button, Divider, Flex, Grid, Heading, Stack, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import FlexWithBorders from "@components/FlexWithBorders";
import TrackPlayerSlim from "@components/TrackPlayerSlim";
import fetcher from "@lib/fetcher";
import { NextPageWithLayout } from "@lib/types";
import useSWR from "swr";
import Image from "next/image";
import { Link } from "@components/Link";
import { AppState } from "@lib/redux/store";
import { useSelector } from "react-redux";

const DiscoverPage: NextPageWithLayout = () => {
    const { data: tracks } = useSWR<any>('/api/discover', fetcher);
    const { walletId } = useSelector((state: AppState) => state.profile);
    const toast = useToast()

    const handlePurchase = async (track: any) => {
        if (walletId == track.artist.walletId) {
            toast({
                title: 'You invested in your own track! ',
                description: "Wait you cannot!",
                status: 'warning',
                position: 'bottom-right',
                duration: 9000,
                isClosable: true,
            })
            return
        }
        const ethereum = window.ethereum;
        try {
            const hash = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: walletId,
                        to: track.artist.walletId,
                        value: '0x' + (track.price * 1000000000000000000).toString(16),
                        gasPrice: '0x08184E72A000',
                        gas: '0x5208',
                    },
                ],
            })
            toast({
                title: 'Congratulation on minting this NFT! ',
                description: `You invested ${track.price} ETH to ${track.artist.name}`,
                status: 'success',
                position: 'bottom-right',
                duration: 9000,
                isClosable: true,
            })
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <Heading size={'xl'} mb={{ base: 5, md: 8 }} >
                Discover
            </Heading>
            <Grid gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'} gap={10}>
                {tracks && tracks.map((track: any, key: string) => (
                    <FlexWithBorders direction='column' borderRadius='2xl'>
                        <AspectRatio
                            ratio={1}
                            w={'100%'}
                            borderTopRadius={'2xl'}
                            overflow={'hidden'}
                            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                            pointerEvents={'none'}
                        >
                            <Image
                                alt="alt"
                                src={track.trackImageUrl}
                                blurDataURL={track.trackImageUrl}
                                layout='fill'
                                objectFit="cover"
                                loading='lazy'
                                placeholder='blur'
                            />
                        </AspectRatio>
                        <Stack
                            direction={'column'}
                            flex={1}
                            py={5}
                            px={6}
                            spacing={4}
                        >
                            <Stack align={'center'} spacing={1}>
                                <Heading size={'lg'} textAlign={'center'} noOfLines={1}>{track.title}</Heading>
                                {track.artist && <Link href={`/profile/${track.artist.username}`}>
                                    {track.artist.name}
                                </Link>}
                            </Stack>
                            <TrackPlayerSlim
                                url={track.trackFileUrl}
                                borderless
                            />
                            <Divider pt={2} />
                            <Stack direction={'column'} align={'center'} justify={'space-between'}>
                                <Text fontWeight={600}></Text>
                                <Button
                                    aria-label="Purchase the track"
                                    w={'100%'}
                                    size='lg'
                                    fontSize={'md'}
                                    onClick={() => handlePurchase(track)}
                                >
                                    <Text fontWeight='semibold'>Invest :&nbsp;</Text> {track.price} ETH
                                </Button>
                            </Stack>
                        </Stack>

                    </FlexWithBorders>
                ))}
            </Grid>
        </>
    )
};

export default DiscoverPage;
