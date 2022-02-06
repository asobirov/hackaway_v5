import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';

type Data = {
    title: string;
    description?: string;
    price: string;
    trackFileUrl: string;
    trackImageUrl: string;
    artistId: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        switch (req.method) {
            case 'GET':
                const tracks = await prisma.track.findMany();
                res.status(200).json(tracks);
                break;
            case 'POST': {
                const { title, description, price, trackFileUrl, trackImageUrl, artistId } = req.body as Data;
                if (!title || !price || !trackFileUrl || !trackImageUrl) {
                    throw new Error('Missing required fields');
                }
                const data = await prisma.track.create({
                    data: {
                        address: '',
                        description: description?.trim() ?? "",
                        price: parseFloat(price),
                        title: title.trim(),
                        trackFileUrl,
                        trackImageUrl,
                        duration: 0,
                        genre: 'Other',
                        artistId: artistId,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                });

                res.status(200).json({
                    success: true,
                    data
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
