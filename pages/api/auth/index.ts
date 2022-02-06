import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';

type Data = {
    walletId: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        switch (req.method) {
            case 'GET':
                res.status(200).json({
                    success: true,
                });
                break;
            case 'POST': {
                const { walletId } = req.body as Data;
                if (!walletId) {
                    throw new Error('Missing required fields');
                }
                let artistData = await prisma.artist.findUnique({
                    where: {
                        walletId,
                    },
                });

                if (!artistData) {
                    artistData = await prisma.artist.create({
                        data: {
                            name: '',
                            avatar: '',
                            email: '',
                            username: '',
                            walletId,
                        }
                    });
                }

                res.status(200).json({
                    success: true,
                    artist: artistData,
                });

                break;
            }
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            error: error.message
        })
    }
}
