import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        switch (req.method) {
            case 'GET':
                const tracks = await prisma.track.findMany({
                    orderBy: {
                        updatedAt: 'desc'
                    },
                    include: {
                        artist: true,
                    }
                });
                res.status(200).json(tracks);
                break;
            case 'POST': {
                res.status(200)
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
