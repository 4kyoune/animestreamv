import { Card, CardBody, Chip, Image } from '@nextui-org/react'
import React from 'react'
import Link from 'next/link';
import { Anime, RelatedAnime } from '@/services/aniwatch/types/anime';
import Icon from './Icon';

export default function DetailCard({ anime }: { anime: Anime | RelatedAnime }) {
    return (
        <Link href={`/watch/${anime.id}`} className='bg-card/60 rounded-xl'>
            <Card
                isBlurred
                className="border-none bg-card/60 text-foreground"
                shadow="sm" >
                <CardBody className="p-2 justify-center">
                    <div className="grid grid-cols-[50px_1fr] items-center justify-center overflow-hidden">
                        <div className="relative">
                            <Image
                                alt="Album cover"
                                className="object-cover h-[65px] w-[50px]"
                                radius="sm"
                                shadow="md"
                                src={anime.poster || '@/assets/no_image.jpg'}
                            />
                        </div>
                        <div className="ml-3">
                            <p className='text-foreground text-sm line-clamp-2 mb-1'>{anime.name}</p>
                            <div className="flex items-center gap-1 justify-between">
                                <div className='flex items-center gap-1'>
                                    {!anime.episodes.sub && !anime.episodes.sub && <p className='text-foreground-dark text-sm'>Coming soon</p>}
                                    {anime.episodes.sub && <Chip startContent={<Icon icon="bi:badge-cc-fill" className="text-lg mr-1 ml-1" />} color="primary" size="sm" radius="sm" className="px-0 h-[21px]">{anime.episodes.sub || 0}</Chip>}
                                    {anime.episodes.dub && <Chip startContent={<Icon icon="ion:mic" className="text-lg" />} color="secondary" size="sm" radius="sm" className="px-0 h-[21px]">{anime.episodes.dub || 0}</Chip>}
                                </div>
                                <p className="text-xs">{anime.type}</p>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Link>
    )
}
