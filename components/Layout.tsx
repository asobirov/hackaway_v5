import { useRouter } from "next/router";
import { Container, Flex, Spinner } from "@chakra-ui/react";
import { MotionMain } from "./Motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { AppState } from "@lib/redux/store";


import Web3 from "web3";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "@lib/redux/slices/profileSlice";
import { updateMarketplace } from "@lib/redux/slices/marketplaceSlice";
import Marketplace from '@lib/abis/Marketplace.json'
import axios from 'axios';


declare global {
    interface Window {
        ethereum: any;
        web3: any;
    }
}

type LayoutProps = {
    children?: ReactNode,
    title?: string,
    description?: string,
    navbarTitle?: string,
    coverImage?: string,
    [rest: string]: any;
}

const Layout = ({ children, title, description, navbarTitle, coverImage = '/public/cover.jpg', geo, ...rest }: LayoutProps): JSX.Element => {
    const router = useRouter();
    const variants = {
        hidden: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 }
    }

    const { walletId, id } = useSelector((state: AppState) => state.profile);

    const dispatch = useDispatch();

    const initWeb3 = async () => {

        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            try {
                await window.ethereum.enable();
            } catch (error) {
                console.error(error);
            }
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const loadBlockchainData = async () => {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();

        const networkId = await web3.eth.net.getId();
        const networks: any = Marketplace.networks;
        const networkData = networks[networkId];

        if (networkData) {
            const marketplace = new web3.eth.Contract(Marketplace.abi, networkData.address);
            dispatch(updateMarketplace({ marketplace }));
            const { data: { artist } } = await axios.post('/api/auth', {
                walletId: accounts[0],
            })

            console.log(artist);
            dispatch(updateProfile({
                id: artist?.id ?? null,
                name: artist?.name ?? null,
                username: artist?.username ?? null,
                walletId: artist?.walletId ?? ""
            }));
        } else {
            alert('Marketplace contract not deployed to detected network.');
        }
    }

    useEffect(() => {
        const init = async () => {
            await initWeb3();
            await loadBlockchainData();
        }
        init();
    }, []);

    return (
        <>
            <Navbar heading={navbarTitle} />
            <MotionMain
                initial="hidden"
                animate="enter"
                variants={variants}
                transition={{ type: 'ease-in' }}
                key={router.route}
                display="flex"
                flex={1}
            >

                <Container
                    pb={16}
                    {...rest}
                >
                    {walletId ? children : (
                        <Flex flex={1} align={'center'} justify={'center'}>
                            <Spinner size='xl' />
                            {walletId}
                            {id}
                        </Flex>
                    )}
                </Container>
            </MotionMain>
            <Footer />
            <style jsx global>{`
                body {
                    background: #111;
                }
            `}</style>
        </>
    )
}

export default Layout
