import type { Category as CategoryType, TranslatedCategory } from '@prezly/sdk';

import { app } from '@/adapters/server';
import { PageTitle } from '@/components/PageTitle';
import type { ThemeSettings } from '@/theme-settings';

import { Container } from '@/custom/components';
import { InfiniteStories } from '../Stories/InfiniteStories';

interface Props {
    category: CategoryType;
    layout: ThemeSettings['layout'];
    pageSize: number;
    showDate: boolean;
    showSubtitle: boolean;
    translatedCategory: TranslatedCategory;
}

export async function Category({
    category,
    layout,
    pageSize,
    showDate,
    showSubtitle,
    translatedCategory,
}: Props) {
    const { stories, pagination } = await app().stories({
        limit: pageSize,
        categories: [category],
        locale: { code: translatedCategory.locale },
    });

    const newsroom = await app().newsroom();
    const languageSettings = await app().languageOrDefault(translatedCategory.locale);

    return (
        <>
            <PageTitle title={translatedCategory.name} subtitle={translatedCategory.description} />
            <section data-section="category">
                <Container className="tw:pt-0">
                    <InfiniteStories
                        category={category}
                        initialStories={stories}
                        isCategoryList
                        layout={layout}
                        newsroomName={languageSettings.company_information.name || newsroom.name}
                        newsrooms={[newsroom]}
                        newsroomUuid={newsroom.uuid}
                        pageSize={pageSize}
                        showDate={showDate}
                        showSubtitle={showSubtitle}
                        total={pagination.matched_records_number}
                    />
                </Container>
            </section>
        </>
    );
}
