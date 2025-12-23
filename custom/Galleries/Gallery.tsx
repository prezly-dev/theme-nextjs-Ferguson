import { NewsroomGallery } from '@prezly/sdk';

import { ContentRenderer } from '@/components/ContentRenderer';
import { PageTitle } from '@/components/PageTitle';

import { Container } from '../components';
import { cn } from '../fns';

interface Props {
    gallery: NewsroomGallery;
}

export function Gallery({ gallery }: Props) {
    const { name, description, content } = gallery;

    return (
        <>
            <PageTitle
                title={name}
                subtitle={description}
                className={cn(
                    'tw:before:hidden tw:text-black',
                    'tw:[&>div]:py-[27px] [&>div]:pb-0', // Container
                    'tw:[&_h1]:text-[27px]! tw:[&_h1]:leading-[1.6]! tw:[&_h1]:font-bold! tw:[&_h1]:mb-3', // Title
                    'tw:[&_p]:text-[20.4px]! tw:[&_p]:leading-[32.64px]!', // Subtitle
                )}
            />
            <Container className="tw:py-0">
                <ContentRenderer nodes={JSON.parse(content)} />
            </Container>
        </>
    );
}
