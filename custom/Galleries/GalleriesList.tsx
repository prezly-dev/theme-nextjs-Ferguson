import type { NewsroomGallery } from '@prezly/sdk';
import type { Locale } from '@prezly/theme-kit-nextjs';

import { GalleryCard } from './GalleryCard';

type Props = {
    galleries: NewsroomGallery[];
    localeCode: Locale.Code;
};

export function GalleriesList({ galleries, localeCode }: Props) {
    return (
        <div className="tw:grid tw:grid-cols-2 tw:gap-8.5">
            {galleries.map((gallery) => (
                <GalleryCard key={gallery.uuid} gallery={gallery} localeCode={localeCode} />
            ))}
        </div>
    );
}
