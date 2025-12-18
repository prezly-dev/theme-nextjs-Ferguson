'use client';

import { Link } from '@/components/Link';
import { isPreviewActive } from '@/utils';
import type { Newsroom, NewsroomCompanyInformation } from '@prezly/sdk';
import type { Locale } from '@prezly/theme-kit-nextjs/index';
import type { UploadedImage } from '@prezly/uploadcare';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { Logo } from './Logo';
import { cn } from '../fns';

interface Props {
    localeCode: Locale.Code;
    newsroom: Newsroom;
    companyInformation: NewsroomCompanyInformation;
    logoSize: string;
}

export function NewsRoomLogo(props: Props) {
    const { localeCode, newsroom, companyInformation, logoSize: defaultLogoSize } = props;

    const isPreviewMode = process.env.PREZLY_MODE === 'preview';
    const searchParams = useSearchParams();
    const isPreview = isPreviewActive();

    const logo = useMemo(() => {
        const newsroomLogoPreview = isPreviewMode && searchParams.get('main_logo');
        if (newsroomLogoPreview) {
            try {
                return JSON.parse(newsroomLogoPreview) as UploadedImage;
            } catch {
                return null;
            }
        }

        return newsroom.newsroom_logo;
    }, [isPreviewMode, newsroom.newsroom_logo, searchParams]);

    const logoSize = useMemo(() => {
        const logoSizePreview = isPreviewMode && searchParams.get('logo_size');
        return logoSizePreview || defaultLogoSize;
    }, [isPreviewMode, defaultLogoSize, searchParams]);

    if (isPreview && !logo) {
        return <div className="tw:font-semibold">{newsroom.display_name}</div>;
    }

    // Derivatives
    const newsroomName = companyInformation.name || newsroom.display_name;

    return (
        <Link
            href={{ routeName: 'index', params: { localeCode } }}
            className={cn('tw:flex', !logo && 'tw:text-red-700')}
        >
            {!logo && (
                <div className="tw:text-[20px] md:tw:text-[28px] tw:leading-[40px] tw:uppercase">
                    {newsroomName}
                </div>
            )}
            {logo && <Logo alt={newsroomName} image={logo} size={logoSize} />}
        </Link>
    );
}
