'use client';

import type { NewsroomGallery } from '@prezly/sdk';
import type { Locale } from '@prezly/theme-kit-nextjs';
import { useInfiniteLoading } from '@prezly/theme-kit-nextjs';
import { useCallback, useEffect } from 'react';

import { http, useRouting } from '@/adapters/client';
import { isPreviewActive } from '@/utils';

import { GalleriesList } from './GalleriesList';

import { Container } from '../components';
import { LoadMoreButton } from '../components/LoadMoreButton';

type Props = {
    localeCode: Locale.Code;
    pageSize: number;
    initialGalleries?: NewsroomGallery[];
    total?: number;
};

function fetchGalleries(offset: number, limit: number) {
    return http.get<{ data: NewsroomGallery[]; total: number }>('/api/galleries', {
        offset,
        limit,
    });
}

export function Galleries({ initialGalleries, localeCode, pageSize, total }: Props) {
    const { generateUrl } = useRouting();
    const isPreview = isPreviewActive();

    const { load, loading, data, done } = useInfiniteLoading(
        useCallback((offset) => fetchGalleries(offset, pageSize), [pageSize]),
        { data: initialGalleries, total },
    );

    useEffect(() => {
        if (!isPreview && data.length === 0) {
            window.location.replace(generateUrl('index', { localeCode }));
        }
    }, [data, isPreview, localeCode, generateUrl]);

    return (
        <Container className="tw:pt-0">
            <section data-section="galleries" className="tw:flex tw:flex-col tw:gap-8">
                <GalleriesList galleries={data} localeCode={localeCode} />

                {!done ? (
                    <LoadMoreButton
                        load={load}
                        loading={loading}
                        locale={localeCode}
                        className="tw:rounded-xs! tw:text-base tw:leading-tight tw:py-3! tw:px-19! tw:border! tw:border-link! tw:text-link! tw:font-normal!"
                    />
                ) : null}
            </section>
        </Container>
    );
}
