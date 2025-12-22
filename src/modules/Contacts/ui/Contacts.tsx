'use client';

import type { NewsroomContact } from '@prezly/sdk';
import { translations } from '@prezly/theme-kit-nextjs';
import UploadcareImage from '@uploadcare/nextjs-loader';

import { FormattedMessage, useLocale } from '@/adapters/client';
import { ContactCard } from '@/components/ContactCard';
import { useDevice } from '@/hooks';
import { getUploadcareImage } from '@/utils';

import { getNumberOfColumns } from '../lib';

import { Container } from '@/custom/components';
import Link from 'next/link';

interface Props {
    contacts: NewsroomContact[];
}

export function Contacts({ contacts }: Props) {
    const device = useDevice();
    const locale = useLocale();

    const numberOfColumns = getNumberOfColumns(contacts.length);
    const isCompactCard = numberOfColumns === 3 && !device.isTablet;

    return (
        <section data-section="contacts">
            <div className="tw:bg-[#F0F4F6]">
                <Container>
                    <h2 className="tw:w-fit tw:mx-auto tw:text-[28px]! tw:text-black tw:leading-[34px]! tw:font-bold!">
                        <FormattedMessage locale={locale} for={translations.contacts.title} />
                    </h2>
                    <p className="tw:mt-4 tw:mb-8 tw:max-w-155 tw:mx-auto tw:text-center tw:text-sm! tw:text-[#757777] tw:leading-[1.6]!">
                        For accredited media working on a story about Ferguson, please get in touch
                        with a member of the Ferguson PR team for an interview, photo requests, and
                        other editorial opportunities. For any other questions, please visit our{' '}
                        <Link href="/contact-us">Contact Us page</Link>.
                    </p>
                    <div className="tw:grid tw:grid-cols-[320px_320px] tw:justify-center tw:gap-6 tw:[&>div]:bg-white tw:[&>div]:p-6 tw:[&>div]:border tw:[&>div]:border-[#ececec] tw:[&>div]:rounded-3">
                        {contacts.map((contact) => (
                            <ContactCard
                                key={contact.uuid}
                                contactInfo={{
                                    name: contact.name ?? '',
                                    company: contact.company ?? '',
                                    description: contact.description ?? '',
                                    email: contact.email ?? '',
                                    website: contact.website ?? '',
                                    mobile: contact.mobile ?? '',
                                    phone: contact.phone ?? '',
                                    facebook: contact.facebook ?? '',
                                    twitter: contact.twitter ?? '',
                                }}
                                isCompact={isCompactCard}
                                renderAvatar={({ className }) => {
                                    const image = getUploadcareImage(contact.avatar_image);

                                    return (
                                        image && (
                                            <UploadcareImage
                                                className={className}
                                                src={image.cdnUrl}
                                                width={60}
                                                height={60}
                                                alt={contact.name}
                                            />
                                        )
                                    );
                                }}
                                uuid={contact.uuid}
                            />
                        ))}
                    </div>
                </Container>
            </div>
        </section>
    );
}
