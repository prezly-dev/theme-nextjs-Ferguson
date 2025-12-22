'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Container } from '../components';

export function GlobalMediaResources() {
    return (
        <section data-section="media-resources">
            <Container>
                <h2 className="tw:w-fit tw:mx-auto tw:text-[28px]! tw:text-black tw:leading-[34px]! tw:font-bold!">
                    Media Resources
                </h2>
                <div className="tw:mt-10 tw:flex tw:justify-between tw:max-w-200 tw:mx-auto">
                    {[
                        {
                            label: 'Factsheets & Reports',
                            href: '/factsheets--reports',
                            image: 'factsheets-and-reports.png',
                        },
                        {
                            label: 'Logos & Guidelines',
                            href: '/logos--guidelines',
                            image: 'logos-and-guidelines.png',
                        },
                        {
                            label: 'Photos',
                            href: '/media',
                            image: 'photos.png',
                        },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="tw:inline-flex tw:flex-col tw:gap-6 tw:items-center tw-size-37.5"
                        >
                            <Image
                                src={item.image}
                                alt={item.label}
                                loader={imageLoader}
                                width={104}
                                height={104}
                            />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </div>
            </Container>
        </section>
    );
}

function imageLoader({ src }: { src: string }) {
    return `https://www.fergusonpressroom.com/press/new/skins/ferguson/images/${src}`;
}
