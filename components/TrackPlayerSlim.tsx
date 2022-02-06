import { Box, Button, Flex, Icon, IconButton, Progress, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, useColorModeValue } from "@chakra-ui/react";
import { PauseOutline, PlayOutline } from "iconoir-react";
import { useEffect, useRef, useState } from "react";
import { SourceProps } from "react-player/base";
import ReactPlayer, { ReactPlayerProps } from "react-player/lazy";

type TrackPlayerSlimProps = {
    borderless?: boolean;
    isCurrent?: boolean;
    onPlayerPlay?: () => void;
    onPlayerPause?: () => void;
} & ReactPlayerProps

type PlayerState = {
    url?: string | string[] | SourceProps[] | MediaStream,
    playing: boolean,
    controls: boolean,
    light: boolean,
    volume: number,
    muted: boolean,
    played: number,
    loaded: number,
    duration: number,
    playbackRate: number,
    loop: boolean,
    seeking: boolean
}

const TrackPlayerSlim = ({ borderless, isCurrent = true, onPlayerPlay, onPlayerPause, ...props }: TrackPlayerSlimProps) => {
    const [playerState, setPlayerState] = useState<PlayerState>({
        url: props.url,
        playing: false,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
        seeking: false,
    });

    const playerRef = useRef<any>(null);

    const handlePlayPause = () => {
        setPlayerState({ ...playerState, playing: !playerState.playing });
    }

    const handlePlay = () => {
        console.log('AYYO')
        onPlayerPlay && onPlayerPlay();
        setPlayerState({ ...playerState, playing: true });
    }

    const handlePause = () => {
        onPlayerPause && onPlayerPause();
        setPlayerState({ ...playerState, playing: false });
    }

    const handleSeekMouseDown = () => {
        setPlayerState({ ...playerState, seeking: true });
    }

    const handleSeekChange = (value: number) => {
        console.log(value)
        setPlayerState({ ...playerState, played: value / 100 });
        playerRef.current?.seekTo(value / 100);
    }

    const handleSeekMouseUp = () => {
        setPlayerState({ ...playerState, seeking: false });
    }

    const handleProgress = (state: any) => {
        console.log('onProgress', playerState);
        if (!playerState.seeking) {
            setPlayerState({ ...playerState, played: state.played, loaded: state.loaded });
        }
    }

    const handleForward = () => {
        setPlayerState({ ...playerState, played: playerState.played + 0.15 });
        playerRef.current?.seekTo(playerState.played + 0.15);

    }

    const handleBackward = () => {
        setPlayerState({ ...playerState, played: playerState.played - 0.15 });
        playerRef.current?.seekTo(playerState.played - 0.15);
    }

    const handleEnded = () => {
        setPlayerState({ ...playerState, playing: playerState.loop });
    }

    const handleDuration = () => {
        setPlayerState({ ...playerState, duration: playerState.duration });
    }

    useEffect(() => {
        return () => {
            playerRef.current?.destroy();
        }
    }, [])

    return (
        <Flex>
            <ReactPlayer
                ref={playerRef}
                className='react-player'
                width='100%'
                height='100%'
                url={playerState.url}
                playing={playerState.playing}
                controls={playerState.controls}
                light={playerState.light}
                loop={playerState.loop}
                playbackRate={playerState.playbackRate}
                volume={playerState.volume}
                muted={playerState.muted}
                onReady={() => console.log('onReady')}
                onStart={() => console.log('onStart')}
                onPlay={handlePlay}
                onPause={handlePause}
                onBuffer={() => console.log('onBuffer')}
                onSeek={e => console.log('onSeek', e)}
                onEnded={handleEnded}
                onError={e => console.log('onError', e)}
                onProgress={handleProgress}
                onDuration={handleDuration}
                style={{
                    display: 'none',
                }}
                {...props}
            />
            <Stack
                w='100%'
                border={borderless ? '0' : '1px'}
                borderColor={useColorModeValue('blackAlpha.100', 'whiteAlpha.200')}
                borderRadius={'2xl'}
                px={borderless ? 0 : 10}
                py={borderless ? 0 : 6}
            >
                <Slider
                    defaultValue={0}
                    min={0}
                    max={100}
                    value={playerState.played * 100}
                    focusThumbOnChange={false}
                    size={'lg'}
                    onChange={(value) => handleSeekChange(value)}
                    onMouseDown={handleSeekMouseDown}
                    onMouseUp={() => handleSeekMouseUp()}
                >
                    <SliderTrack >
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb boxSize={5}>
                        <Box />
                    </SliderThumb>
                </Slider>
                <Stack direction={'row'} justify={'center'}>
                    <IconButton
                        size={'lg'}
                        borderRadius={'1.25rem'}
                        aria-label={'Backwards 15 seconds'}
                        icon={<Backwards15Seconds />}
                        onClick={() => handleBackward()}
                    />
                    <IconButton
                        size={'lg'}
                        borderRadius={'1.25rem'}
                        aria-label={playerState.playing ? 'pause' : 'play'}
                        icon={playerState.playing ? <PauseOutline /> : <PlayOutline />}
                        onClick={() => handlePlayPause()}
                    />
                    <IconButton
                        size={'lg'}
                        borderRadius={'1.25rem'}
                        aria-label={'Forward 15 seconds'}
                        icon={<Forward15Seconds />}
                        onClick={() => handleForward()}
                    />
                </Stack>
            </Stack>
        </Flex>
    )
};

const Backwards15Seconds = (props: any) => {
    return (
        <Icon viewBox="0 0 24 24" {...props} strokeWidth={"1.5"} w='24px' h='24px' fill={'none'}>
            <path d="M3 13C3 17.9706 7.02944 22 12 22C16.9706 22 21 17.9706 21 13C21 8.02944 16.9706 4 12 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 9L9 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 9L13 9C12.4477 9 12 9.44772 12 10L12 11.5C12 12.0523 12.4477 12.5 13 12.5L14 12.5C14.5523 12.5 15 12.9477 15 13.5L15 15C15 15.5523 14.5523 16 14 16L12 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 4L4.5 4M4.5 4L6.5 2M4.5 4L6.5 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </Icon>
    )
}

const Forward15Seconds = (props: any) => {
    return (
        <Icon viewBox="0 0 24 24" {...props} strokeWidth={"1.5"} w='24px' h='24px' fill={'none'}>
            <path d="M21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 8.02944 7.02944 4 12 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 4H19.5M19.5 4L17.5 2M19.5 4L17.5 6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 9L9 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15 9L13 9C12.4477 9 12 9.44772 12 10L12 11.5C12 12.0523 12.4477 12.5 13 12.5L14 12.5C14.5523 12.5 15 12.9477 15 13.5L15 15C15 15.5523 14.5523 16 14 16L12 16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </Icon>
    )
}

export default TrackPlayerSlim;
