import type { NewsroomGallery } from '@prezly/sdk';
import type { Locale } from '@prezly/theme-kit-nextjs';
import { Galleries } from '@prezly/theme-kit-nextjs';
import UploadcareImage from '@uploadcare/nextjs-loader';

import { Link } from '@/components/Link';
import { getUploadcareImage } from '@/utils';
import { cn } from '../fns';

interface Props {
    gallery: NewsroomGallery;
    localeCode: Locale.Code;
}

export function GalleryCard({ gallery, localeCode }: Props) {
    const { name } = gallery;
    const cover = Galleries.getCoverImage(gallery);
    const coverImage = getUploadcareImage(cover);

    return (
        <Link
            href={{
                routeName: 'mediaGallery',
                params: { uuid: gallery.uuid, localeCode },
            }}
            className="tw:flex tw:flex-col tw:gap-7 tw:hover:underline tw:decoration-black"
        >
            <div className="tw:relative tw:aspect-[1.6] tw:border-[#0000001a] tw:border">
                <div
                    className={cn(
                        'tw:absolute tw:-bottom-1.5 tw:left-1.5 tw:right-1.5 tw:h-[3px] tw:shadow-[inset_0_2px_2px_rgba(0,0,0,.8),0_1px_0_rgba(0,0,0,.5)] tw:opacity-50',
                    )}
                />
                <div
                    className={cn(
                        'tw:absolute tw:-bottom-[3px] tw:left-[3px] tw:right-[3px] tw:h-[3px] tw:shadow-[inset_0_2px_1px_rgba(0,0,0,.8),0_1px_0_rgba(0,0,0,.5)] tw:opacity-70',
                    )}
                />
                {coverImage && (
                    <UploadcareImage
                        alt={name}
                        fill
                        className="tw:object-cover"
                        src={coverImage.cdnUrl}
                        sizes="(max-width: 1023px) 90vw, 580px"
                    />
                )}
            </div>
            <h2 className="tw:text-black tw:text-[27px]! tw:leading-[1.6]! tw:font-bold! group-hover:tw:text-primary">
                {name}
            </h2>
        </Link>
    );
}
