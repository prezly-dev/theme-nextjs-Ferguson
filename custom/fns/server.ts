import { app } from '@/adapters/server';
import type { Locale } from '@prezly/theme-kit-nextjs';

export async function getNewsroom() {
    return app().newsroom();
}

export async function getLanguage(localeCode: Locale.Code) {
    return app().languageOrDefault(localeCode);
}

export async function getThemeSettings() {
    return app().themeSettings();
}

export async function getCompanyInformation(localeCode: Locale.Code) {
    const language = await app().languageOrDefault(localeCode);
    return language.company_information;
}

export async function getCategories() {
    const categories = await app().categories();
    return categories;
}

export async function getFeaturedCategories(localeCode: Locale.Code) {
    const categories = await getCategories();
    return categories.filter(
        ({ is_featured, i18n }) => is_featured && i18n[localeCode]?.public_stories_number > 0,
    );
}

export async function getStories({
    categoryId,
    localeCode,
    pageSize,
}: {
    categoryId: number | undefined;
    localeCode: Locale.Code;
    pageSize: number;
}) {
    const featuredCategories = await getFeaturedCategories(localeCode);

    if (featuredCategories.length > 0) {
        const { stories: pinnedOrMostRecentStories } = await app().stories({
            // We're fetching two stories, so we can later determine if we can
            // show the category filters.
            limit: 2,
            locale: { code: localeCode },
        });

        const [pinnedOrMostRecentStory] = pinnedOrMostRecentStories;

        // Exclude the pinned/most recent story from the initial stories list
        // so it's not duplicated below the categories filters
        const query = pinnedOrMostRecentStory
            ? {
                  uuid: { $nin: [pinnedOrMostRecentStory.uuid] },
              }
            : undefined;

        const { stories, pagination } = await app().stories({
            categories: categoryId ? [{ id: categoryId }] : undefined,
            limit: pageSize - 1,
            locale: { code: localeCode },
            query,
        });

        // If there's less than 2 stories in total, we do not provide
        // categories so the filters will not be displayed.
        const hasOneStoryOrLess = pinnedOrMostRecentStories.length < 2;

        return {
            categories: hasOneStoryOrLess ? undefined : featuredCategories,
            stories: pinnedOrMostRecentStory ? [pinnedOrMostRecentStory, ...stories] : [],
            pagination,
            excludedStoryUuids: pinnedOrMostRecentStory
                ? [pinnedOrMostRecentStory.uuid]
                : undefined,
        };
    }

    const { stories, pagination } = await app().stories({
        limit: pageSize,
        locale: { code: localeCode },
    });

    return { stories, pagination };
}
