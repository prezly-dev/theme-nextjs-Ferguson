'use client';

import Image from 'next/image';
import { Container } from '../components';

export function GlobalNewsletter() {
    return (
        <section data-section="newsletter">
            <Container>
                <div className="tw:relative tw:h-86.25">
                    <Image
                        src="workers.png"
                        alt="Workers talking"
                        loader={imageLoader}
                        fill={true}
                    />
                    <div
                        className="tw:absolute tw:inset-0 tw:z-1"
                        style={{
                            backgroundImage:
                                'linear-gradient(180deg,rgba(0,0,0,.2) 45%,rgba(0,0,0,.9))',
                        }}
                    />
                    <div className="tw:absolute tw:z-2 tw:py-8 tw:w-full tw:px-4 tw:bottom-0 tw:flex tw:justify-center tw:flex-col tw:items-center tw:gap-6">
                        <h3 className="tw:text-white tw:text-[28px]! tw:leading-[34px]! tw:font-bold!">
                            Stay on top of the latest news - get updates in your mailbox
                        </h3>
                        <a
                            href="https://www.corporate.ferguson.com/investor/investor-contacts-and-subscribe-to-news/email-alerts/default.aspx"
                            className="tw:bg-white tw:py-3 tw:px-19 tw:text-[17px] tw:leading-[1.6]"
                        >
                            Sign me up!
                        </a>
                    </div>
                </div>
            </Container>
        </section>
    );
}

function imageLoader({ src }: { src: string }) {
    return `https://www.fergusonpressroom.com/press/new/skins/ferguson/images/${src}`;
}
