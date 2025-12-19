'use client';

import type { Newsroom } from '@prezly/sdk';
import { Category } from '@prezly/sdk';
import { translations } from '@prezly/theme-kit-nextjs';

import { FormattedMessage, useLocale } from '@/adapters/client';
import type { ListStory } from '@/types';
import { getNewsroomPlaceholderColors } from '@/utils';

import Illustration from '@/public/images/no-stories-illustration.svg';

import { useStoryCardLayout } from '@/modules/InfiniteStories/lib';
import { StoryCard } from './StoryCard';

interface Props {
    categories?: Category[];
    isCategoryList?: boolean;
    layout?: 'grid' | 'masonry';
    newsroomName: string;
    newsrooms: Newsroom[];
    newsroomUuid: string;
    showDate: boolean;
    showSubtitle: boolean;
    stories: ListStory[];
    withEmptyState?: boolean;
}

export function StoriesList(props: Props) {
    const {
        isCategoryList = false,
        newsroomName,
        newsrooms,
        newsroomUuid,
        showDate,
        showSubtitle,
        stories,
        withEmptyState = true,
    } = props;

    const locale = useLocale();
    const getStoryCardSize = useStoryCardLayout(isCategoryList);

    if (withEmptyState && !stories.length) {
        return (
            <div className="tw:py-42.5 tw:mx-auto! tw:text-center tw:flex tw:flex-col tw:items-center tw:gap-4.25">
                <Illustration />
                <h1 className="tw:text-2xl! tw:font-bold">
                    <FormattedMessage
                        locale={locale}
                        for={translations.noStories.title}
                        values={{ newsroom: newsroomName }}
                    />
                </h1>
                <p className="tw:text-base! tw:text-base-500">
                    <FormattedMessage locale={locale} for={translations.noStories.subtitle} />
                </p>
            </div>
        );
    }

    return (
        <div className="tw:grid tw:gap-8.5 tw:grid-cols-1 tw:md:grid-cols-2 tw:lg:grid-cols-3">
            {stories.map((story, index) => {
                const newsroom = newsrooms.find(
                    (newsroom) => newsroom.uuid === story.newsroom.uuid,
                );

                const isExternal =
                    story.newsroom.uuid !== newsroomUuid
                        ? {
                              newsroomUrl: story.newsroom.url,
                              storyUrl: story.links.newsroom_view!,
                          }
                        : false;

                return (
                    <StoryCard
                        key={story.uuid}
                        isFeaturedStory={index === 0}
                        external={isExternal}
                        fallback={{
                            image: newsroom?.newsroom_logo ?? null,
                            text: newsroom?.name ?? '',
                        }}
                        forceAspectRatio
                        layout="vertical"
                        placeholder={getNewsroomPlaceholderColors(newsroom)}
                        publishedAt={story.published_at}
                        showDate={showDate}
                        showSubtitle={showSubtitle}
                        size={getStoryCardSize(index)}
                        slug={story.slug}
                        subtitle={story.subtitle}
                        thumbnailImage={story.thumbnail_image}
                        title={story.title}
                        titleAsString={story.title}
                        translatedCategories={Category.translations(story.categories, locale)}
                    />
                );
            })}
        </div>
    );
}
