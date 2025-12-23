import type { NewsroomGallery } from '@prezly/sdk';
import type { Locale } from '@prezly/theme-kit-nextjs';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { app, generateMediaGalleryPageMetadata } from '@/adapters/server';
import { Gallery } from '@/custom/Galleries';
import { BroadcastGallery, BroadcastTranslations } from '@/modules/Broadcast';

interface Props {
    params: Promise<{
        localeCode: Locale.Code;
        uuid: NewsroomGallery['uuid'];
    }>;
    searchParams: Promise<Record<string, string>>;
}

async function resolve(params: Props['params']) {
    const { uuid } = await params;
    const gallery = (await app().gallery(uuid)) ?? notFound();

    return { gallery };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { gallery } = await resolve(await props.params);
    return generateMediaGalleryPageMetadata({ locale: params.localeCode, gallery });
}

export default async function AlbumPage(props: Props) {
    const { gallery } = await resolve(await props.params);

    return (
        <>
            <BroadcastGallery gallery={gallery} />
            <BroadcastTranslations routeName="mediaGallery" params={{ uuid: gallery.uuid }} />
            <Gallery gallery={gallery} />
        </>
    );
}
