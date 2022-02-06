import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';

type Data = {
    title: string;
    description?: string;
    price: string;
    trackFileUrl: string;
    trackImageUrl: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        switch (req.method) {
            case 'GET':
                const { username } = req.query;

                if (Array.isArray(username)) {
                    new Error('username must be a string');
                }
                const artist = await prisma.artist.findUnique({
                    where: {
                        username: username as string,
                    },
                    include: {
                        tracks: true
                    }
                })
                res.status(200).json(artist);
                break;
            case 'PUT': {

                const { username: usernameReq } = req.query;
                const { name, username, email, avatar } = req.body;

                if (Array.isArray(username)) {
                    new Error('username must be a string');
                }

                let upd: any = {}

                if (name) {
                    upd.name = name;
                }
                if (username) {
                    upd.username = username;
                }
                if (email) {
                    upd.email = email;
                }
                if (avatar) {
                    upd.avatar = avatar;
                }
                const artist = await prisma.artist.update({
                    where: {
                        username: usernameReq as string,
                    },
                    data: upd
                })
                res.status(200).json(artist);
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
