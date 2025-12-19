'use client';

import type { Category, Newsroom, Story } from '@prezly/sdk';
import type { Locale } from '@prezly/theme-kit-nextjs';
import { useInfiniteLoading } from '@prezly/theme-kit-nextjs';
import { useCallback } from 'react';

import { http, useLocale } from '@/adapters/client';
import type { ThemeSettings } from '@/theme-settings';
import type { ListStory } from '@/types';

import { StoriesList } from './StoriesList';

import { LoadMoreButton } from '../components/LoadMoreButton';

interface Props {
    categories?: Category[];
    category?: Pick<Category, 'id'>;
    excludedStoryUuids?: Story['uuid'][];
    initialStories: ListStory[];
    isCategoryList?: boolean;
    layout: ThemeSettings['layout'];
    newsroomName: string;
    newsrooms: Newsroom[];
    newsroomUuid: string;
    pageSize: number;
    showDate: boolean;
    showSubtitle: boolean;
    tag?: string;
    total: number;
}

function fetchStories(props: {
    localeCode: Locale.Code;
    offset: number;
    limit: number;
    category: Props['category'];
    excludedStoryUuids: Story['uuid'][] | undefined;
    tag: Props['tag'];
}) {
    const { localeCode, offset, limit, category, excludedStoryUuids, tag } = props;
    return http.get<{ data: ListStory[]; total: number }>('/api/stories', {
        limit,
        offset,
        locale: localeCode,
        category: category?.id,
        query: excludedStoryUuids && JSON.stringify({ uuid: { $nin: excludedStoryUuids } }),
        tag,
    });
}

export function InfiniteStories(props: Props) {
    const {
        categories,
        category,
        excludedStoryUuids,
        initialStories,
        isCategoryList,
        layout,
        newsroomName,
        newsrooms,
        newsroomUuid,
        pageSize,
        showDate,
        showSubtitle,
        tag,
        total,
    } = props;

    const locale = useLocale();
    const { load, loading, data, done } = useInfiniteLoading(
        useCallback(
            (offset) =>
                fetchStories({
                    localeCode: locale,
                    offset,
                    limit: pageSize,
                    category,
                    excludedStoryUuids,
                    tag,
                }),
            [category, excludedStoryUuids, locale, pageSize, tag],
        ),
        { data: initialStories, total },
    );

    return (
        <div data-section="infinite-stories" className="tw:flex tw:flex-col tw:gap-8">
            <StoriesList
                categories={categories}
                isCategoryList={isCategoryList}
                layout={layout}
                newsroomName={newsroomName}
                newsrooms={newsrooms}
                newsroomUuid={newsroomUuid}
                showDate={showDate}
                showSubtitle={showSubtitle}
                stories={data}
            />

            {!done && (
                <LoadMoreButton
                    locale={locale}
                    load={load}
                    loading={loading}
                    className="tw:rounded-xs! tw:text-base tw:leading-tight tw:py-3! tw:px-19! tw:border! tw:border-link! tw:text-link! tw:font-normal!"
                />
            )}
        </div>
    );
}
