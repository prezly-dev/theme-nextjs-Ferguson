import type { TranslatedCategory } from '@prezly/sdk';
import type { ReactNode } from 'react';

import { FormattedDate } from '@/adapters/client';
import { Link } from '@/components/Link';
import type { ExternalStoryUrl, ListStory } from '@/types';

import { CategoriesList } from '@/components/CategoriesList';
import { StoryImage } from '@/components/StoryImage';
import { cn } from '../fns';

interface Props {
    className?: string;
    isFeaturedStory: boolean;
    external: ExternalStoryUrl;
    fallback: StoryImage.Props['fallback'];
    forceAspectRatio?: boolean;
    layout: 'horizontal' | 'vertical';
    placeholder: StoryImage.Props['placeholder'];
    publishedAt: string | null;
    showDate: boolean;
    showSubtitle: boolean;
    size?: 'small' | 'medium' | 'big' | 'hero';
    slug: string;
    subtitle: ReactNode;
    thumbnailImage: ListStory['thumbnail_image'];
    title: ReactNode;
    titleAsString: string;
    translatedCategories: TranslatedCategory[];
}

export function StoryCard({
    isFeaturedStory,
    external,
    fallback,
    forceAspectRatio,
    placeholder,
    publishedAt,
    showDate,
    showSubtitle,
    size = 'small',
    slug,
    subtitle,
    thumbnailImage,
    title,
    titleAsString,
    translatedCategories,
}: Props) {
    const hasCategories = translatedCategories.length > 0;
    const HeadingTag = isFeaturedStory ? 'h1' : 'h2';
    const reallyShowSubtitle = isFeaturedStory ? true : showSubtitle && subtitle;

    const href = external
        ? external.storyUrl
        : ({ routeName: 'story', params: { slug } } satisfies Link.Props['href']);

    return (
        <div
            className={cn(
                'tw:relative tw:hover:[&_img]:scale-105 tw:[&_img]:transition-transform tw:[&_img]:duration-200 tw:border tw:border-[#ececec]',
                isFeaturedStory && 'tw:col-span-full tw:grid tw:grid-cols-2 tw:bg-white',
            )}
        >
            <Link
                href={href}
                className="tw:block tw:shrink-0 tw:overflow-hidden tw:text-decoration-none tw:font-size-0 tw:aspect-video"
                title={titleAsString}
            >
                <StoryImage
                    fallback={fallback}
                    forceAspectRatio={forceAspectRatio ? 4 / 3 : undefined}
                    placeholder={placeholder}
                    size={size}
                    thumbnailImage={thumbnailImage}
                    title={titleAsString}
                />
            </Link>
            <div className={cn('tw:p-4.25', isFeaturedStory && 'tw:p-8 tw:my-auto')}>
                <Link
                    aria-label={titleAsString}
                    className="tw:absolute tw:inset-0 tw:z-1"
                    href={href}
                />
                {hasCategories && (
                    <div className="sm:tw:flex tw:items-center tw:gap-2 tw:mb-2 tw:overflow-hidden tw:hidden!">
                        <CategoriesList
                            categories={translatedCategories}
                            className="tw:relative tw:z-2"
                            external={external}
                            isStatic
                            showAllCategories
                        />
                    </div>
                )}
                <HeadingTag
                    className={cn(
                        'tw:text-base! tw:text-black tw:leading-[1.1875]!',
                        isFeaturedStory &&
                            'tw:text-[28px]! tw:text-black tw:leading-[1.2]! tw:mb-4! tw:font-bold!',
                    )}
                >
                    {title}
                </HeadingTag>
                {reallyShowSubtitle && (
                    <p
                        className={cn(
                            'tw:text-sm! tw:text-[#767777] tw:leading-[1.1875]! tw:mt-2!',
                            isFeaturedStory &&
                                'tw:text-lg! tw:text-[#76777a] tw:leading-[1.6]! tw:my-6!',
                        )}
                    >
                        {subtitle}
                    </p>
                )}
                {showDate && publishedAt && (
                    <div className="tw:text-sm! tw:text-link tw:leading-[1.21429]! tw:mt-2! tw:font-medium!">
                        <FormattedDate value={publishedAt} />
                    </div>
                )}
            </div>
        </div>
    );
}
