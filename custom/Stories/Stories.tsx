import type { Category } from '@prezly/sdk';
import type { Locale } from '@prezly/theme-kit-nextjs';

import type { ThemeSettings } from '@/theme-settings';

import { getLanguage, getNewsroom, getStories } from '../fns/server';
import { InfiniteStories } from './InfiniteStories';

interface Props {
    categoryId: Category['id'] | undefined;
    fullWidthFeaturedStory: boolean;
    layout: ThemeSettings['layout'];
    localeCode: Locale.Code;
    pageSize: number;
    showDate: boolean;
    showSubtitle: boolean;
    storyCardVariant: ThemeSettings['story_card_variant'];
}

export async function Stories(props: Props) {
    const {
        categoryId,
        fullWidthFeaturedStory,
        layout,
        localeCode,
        pageSize,
        showDate,
        showSubtitle,
        storyCardVariant,
    } = props;

    const newsroom = await getNewsroom();
    const languageSettings = await getLanguage(localeCode);
    const { categories, stories, pagination, excludedStoryUuids } = await getStories({
        categoryId,
        localeCode,
        pageSize,
    });

    return (
        <InfiniteStories
            key={categoryId}
            categories={categories}
            category={categoryId ? { id: categoryId } : undefined}
            excludedStoryUuids={excludedStoryUuids}
            initialStories={stories}
            layout={layout}
            newsroomName={languageSettings.company_information.name || newsroom.name}
            newsrooms={[newsroom]}
            newsroomUuid={newsroom.uuid}
            pageSize={pageSize}
            showDate={showDate}
            showSubtitle={showSubtitle}
            total={pagination.matched_records_number}
        />
    );
}
