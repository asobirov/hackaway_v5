import { Input as ChakraInput, Button, Flex, FormControl, FormErrorMessage, Heading, Icon, Square, Stack, Text, AspectRatio, useColorModeValue, Spinner, useToast } from '@chakra-ui/react';
import FileUpload from '@components/FileUpload';
import FlexWithBorders from '@components/FlexWithBorders';
import Input from '@components/Input';
import Textarea from '@components/Textarea';
import { storage } from '@lib/firebase';
import axios from 'axios';
import { getDownloadURL, getMetadata, ref, uploadBytes } from 'firebase/storage';
import { CloudUpload } from 'iconoir-react';
import Image from 'next/image';
import ReactPlayer from 'react-player/lazy';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TrackPlayerSlim from '@components/TrackPlayerSlim';
import { AppState } from '@lib/redux/store';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

type FormValues = {
    title: string
    description: string
    price: string
    trackImageFile: File
    trackFile: File
}

const NewTrackPage = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>()

    const [trackFileURLs, setTrackFileURLs] = useState<{
        image: string | null,
        audio: string | null
    }>({
        image: null,
        audio: null
    })

    const [imageUploadLoading, setImageUploadLoading] = useState(false);
    const [trackUploadLoading, setTrackUploadLoading] = useState(false);

    const validateFile = (file: File) => {

        if (Object.entries(file).length === 0) {
            return 'Please select a file';
        }
        const fsMb = file.size / (1024 * 1024)
        const MAX_FILE_SIZE = 10
        if (fsMb > MAX_FILE_SIZE) {
            return 'Max file size 10mb'
        }
        return true
    }

    const { id } = useSelector((state: AppState) => state.profile);

    const toast = useToast();
    const router = useRouter();

    const { walletId } = useSelector((state: AppState) => state.profile);

    const onSubmit = async (values: any) => {

        let hash: any
        try {
            const ethereum = window.ethereum;
            hash = await ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: walletId,
                        to: '0xf2Bd3645FF9ad4d94912Ce1c5c766480b3dd5c84',
                        value: '0x0',
                        gasPrice: '0x08184E72A000',
                        gas: '0x5208',
                    },
                ],
            })
        } catch (error) {
            console.error(error)
        }

        const { data } = await axios.post('/api/tracks', {
            title: values.title,
            address: hash,
            description: values.description,
            price: values.price,
            trackFileUrl: trackFileURLs.audio,
            trackImageUrl: trackFileURLs.image,
            artistId: id
        });

        if (data.success) {
            toast({
                title: 'Track created successfully!',
                status: 'success',
                position: 'bottom-right',
                duration: 9000,
                isClosable: true,
            })
            reset();
            router.push('/profile');
            return;
        }

        toast({
            title: 'Something went wrong!',
            description: data.message,
            status: 'error',
            position: 'bottom-right',
            duration: 9000,
            isClosable: true,
        })
    }

    const onImageUpload = async (e: any) => {
        const trackImageFile = e.target.files[0];
        console.log('UPLOADING IMAGE FILE', trackImageFile)

        setImageUploadLoading(true);

        const trackImageRef = ref(storage, 'track-images/' + Date.now() + '-' + trackImageFile.name);
        await uploadBytes(trackImageRef, trackImageFile);
        console.log('Uploaded image file')

        setTrackFileURLs({
            image: await getDownloadURL(trackImageRef),
            audio: trackFileURLs.audio
        })

        setImageUploadLoading(false);
    }

    const onTrackUpload = async (e: any) => {
        const trackFile = e.target.files[0];
        console.log('UPLOADING TRACK FILE', trackFile);

        setTrackUploadLoading(true);

        const trackFileRef = ref(storage, 'tracks/' + Date.now() + '-' + trackFile.name);
        await uploadBytes(trackFileRef, trackFile);
        console.log('Uploaded track file')

        setTrackFileURLs({
            image: trackFileURLs.image,
            audio: await getDownloadURL(trackFileRef)
        })

        setTrackUploadLoading(false);
    }

    return (
        <Flex justify={'center'}>
            <Flex maxW={'56rem'} justify={'center'} w='100%' direction={'column'}>
                <Heading size={'xl'} mb={{ base: 5, md: 8 }} >
                    Mint a new track
                </Heading>
                <Stack spacing={10} as='form' onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={10}>
                        <Stack spacing={10}>
                            {trackFileURLs.image ?
                                <Stack cursor={'pointer'}>
                                    <Text fontWeight={600} fontSize={'1.1rem'}>
                                        Track artwork
                                    </Text>
                                    <AspectRatio ratio={1} w={72} borderRadius={'2xl'} overflow={'hidden'} bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}>
                                        <Image
                                            alt="alt"
                                            src={trackFileURLs.image}
                                            blurDataURL={trackFileURLs.image}
                                            layout='fill'
                                            objectFit="cover"
                                            loading='lazy'
                                            placeholder='blur'
                                        />
                                    </AspectRatio>
                                </Stack>
                                : (
                                    <FormControl isInvalid={errors.trackImageFile ? true : false}>

                                        <FileUpload
                                            accept='image/*'
                                            register={register('trackImageFile', {
                                                validate: validateFile
                                            })}
                                            onChange={async (e: any) => await onImageUpload(e)}
                                        >
                                            <Stack cursor={'pointer'}>
                                                <Text fontWeight={600} fontSize={'1.1rem'}>
                                                    Track artwork
                                                </Text>
                                                <FlexWithBorders isInvalid={errors.trackImageFile ? true : false} size={72} align='center' justify='center' direction='column' as={Square}>
                                                    {imageUploadLoading ? <Spinner size={'lg'} /> : (
                                                        <>
                                                            <Icon as={CloudUpload} fontSize={'5xl'} mb={5} />
                                                            <Heading size='sm'>Click or drop art work image</Heading>
                                                        </>
                                                    )}
                                                </FlexWithBorders>
                                            </Stack>
                                        </FileUpload>
                                        <FormErrorMessage>
                                            {errors.trackImageFile && errors.trackImageFile.message}
                                        </FormErrorMessage>
                                    </FormControl>
                                )
                            }

                            <FormControl isInvalid={errors.price ? true : false}>
                                <Input
                                    id='price'
                                    label='Price (ETH)'
                                    placeholder='Enter your track price...'
                                    type={'number'}
                                    min={0}
                                    step={'any'}
                                    register={register('price', {
                                        required: { value: true, message: 'Please enter a price' },
                                        min: { value: 0, message: 'Price must be greater than 0' },
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.price && errors.price.message}
                                </FormErrorMessage>
                            </FormControl>
                        </Stack>
                        <Stack spacing={10} w='100%' justify={'space-between'}>
                            <FormControl isInvalid={errors.title ? true : false}>
                                <Input
                                    id='title'
                                    label='Track title'
                                    placeholder='Enter your track title...'
                                    register={register('title', {
                                        required: true,
                                    })}
                                />
                                <FormErrorMessage>
                                    {errors.title && errors.title.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.description ? true : false}>
                                <Textarea
                                    label='Track description'
                                    placeholder='Enter your track description...'
                                    minH={40}
                                    resize={'vertical'}
                                    register={register('description', {
                                        max: { value: 1000, message: 'Max 1000 characters' },
                                    })}
                                />
                            </FormControl>
                            {/* <FormControl> */}
                            <Input label="Smart contract (What's included)" placeholder='Enter items the contract includes...' />
                            {/* </FormControl> */}
                            {/* <FormErrorMessage>
                                {errors.title && errors.price.message}
                            </FormErrorMessage> */}
                        </Stack>
                    </Stack>
                    <Stack>
                        {trackFileURLs.audio ? (
                            <TrackPlayerSlim url={trackFileURLs.audio} />
                        ) : (
                            <FormControl isInvalid={errors.trackFile ? true : false}>
                                <FileUpload
                                    accept='.wav, audio/*'
                                    register={register('trackFile', {
                                        validate: validateFile
                                    })}
                                    onChange={async (e: any) => await onTrackUpload(e)}
                                >
                                    <Stack cursor={'pointer'} w='100%'>
                                        <Text fontWeight={600} fontSize={'1.1rem'}>
                                            Track File
                                        </Text>
                                        <FlexWithBorders isInvalid={errors.trackFile ? true : false} w='100%' h={36} align='center' justify='center' direction='column' cursor={'pointer'}>
                                            {trackUploadLoading ? <Spinner size={'lg'} /> : (
                                                <>
                                                    <Icon as={CloudUpload} fontSize={'5xl'} mb={5} />
                                                    <Heading size='sm'>Click or drop to upload .mp3 or .wav file</Heading>
                                                </>
                                            )}
                                        </FlexWithBorders>
                                    </Stack>
                                </FileUpload>
                                <FormErrorMessage>
                                    {errors.trackFile && errors.trackFile.message}
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Stack>
                    <Stack direction={'row'} justify={'flex-end'}>
                        <Button
                            type='submit'
                            colorScheme={'blue'}
                            borderColor={'blue.400'}
                            isLoading={isSubmitting}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </Flex >
    )
};

export default NewTrackPage;
