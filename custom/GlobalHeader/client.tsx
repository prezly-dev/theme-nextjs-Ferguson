'use client';

import type { Locale } from '@prezly/theme-kit-nextjs';
import type { Newsroom, NewsroomCompanyInformation } from '@prezly/sdk';
import { Container, NewsRoomLogo } from '../components';
import { navItems } from '../data';
import { SearchIcon } from 'lucide-react';
import { cn } from '../fns';

interface Props {
    localeCode: Locale.Code;
    newsroom: Newsroom;
    companyInformation: NewsroomCompanyInformation;
    logoSize: string;
}

export default function GlobalHeader(props: Props) {
    return (
        <header>
            <Container className="tw:py-0">
                <DesktopNav {...props} />
            </Container>
        </header>
    );
}

function DesktopNav(props: Props) {
    return (
        <div className="tw:flex tw:items-center tw:justify-between tw:py-4.5">
            <NewsRoomLogo
                localeCode={props.localeCode}
                newsroom={props.newsroom}
                companyInformation={props.companyInformation}
                logoSize={props.logoSize}
            />
            <nav>
                <ul className="tw:flex tw:items-center">
                    {navItems.map((item) => {
                        const id = item.title.toLowerCase().replace(/\s+/g, '-');
                        const isSearch = id === 'search';

                        return (
                            <li key={id} className="tw:flex tw:items-center">
                                <a
                                    href={item.href}
                                    className={cn(
                                        'tw:text-[#00446a]! tw:px-3 tw:inline-flex tw:items-center',
                                        !isSearch && 'tw:text-sm tw:leading-[1.2]',
                                    )}
                                >
                                    {isSearch ? (
                                        <SearchIcon width={16} height={16} strokeWidth={3} />
                                    ) : (
                                        item.title
                                    )}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
