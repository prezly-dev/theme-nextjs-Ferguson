import { intl } from '@/adapters/server';
import { IconLinkedin, IconYoutube } from '@/icons';
import { CookieConsentLink } from '@/modules/CookieConsent';
import type { Locale } from '@prezly/theme-kit-nextjs';
import { translations } from '@prezly/theme-kit-nextjs';
import { LinkIcon } from 'lucide-react';
import { Container } from '../components';
import { getCompanyInformation } from '../fns/server';
import { cn } from '../fns';

interface Props {
    localeCode: Locale.Code;
}

export async function GlobalFooter(props: Props) {
    const { localeCode } = props;
    const companyInformation = await getCompanyInformation(localeCode);

    const { formatMessage } = await intl(localeCode);

    return (
        <footer className="tw:bg-[#01446A] tw:py-12 tw:text-white">
            <Container className="tw:py-0">
                <div className="tw:flex tw:flex-col tw:gap-18.5">
                    <section className="tw:flex tw:justify-between">
                        <div className="tw:max-w-154">
                            {/* <div className="tw:flex-1/3"> */}
                            <h4 className="title tw:uppercase tw:text-link tw:text-sm! tw:leading-4.25 tw:mb-4">
                                about ferguson
                            </h4>
                            {companyInformation.about && (
                                <div
                                    className="tw:[&>p]:text-sm! tw:[&>p]:leading-5.5"
                                    // biome-ignore lint/security/noDangerouslySetInnerHtml: <...>
                                    dangerouslySetInnerHTML={{ __html: companyInformation.about }}
                                />
                            )}
                        </div>
                        <div>
                            <h4 className="title tw:uppercase tw:text-link tw:text-sm! tw:leading-4.25 tw:mb-4">
                                follow us
                            </h4>
                            <div>
                                <ul className="tw:flex tw:flex-col tw:[&>li]:mb-3">
                                    {[
                                        {
                                            href: 'https://www.linkedin.com/company/ferguson-enterprises?icid=cont_ftr_bsns_corporate-information_linkedin-@ferguson-enterprises-text#xd_co_f=YmE3YmZhZWQtOWJkMi00YjYxLWEyMzItMDM3NjllMTU0Mjk2~',
                                            label: 'Ferguson-Enterprises',
                                            icon: IconLinkedin,
                                        },
                                        {
                                            href: 'https://www.youtube.com/user/fergusonenterprises/?icid=cont_ftr_bsns_corporate-information_youtube-@fergusonenterprises-text',
                                            label: 'FergusonEnterprises',
                                            icon: IconYoutube,
                                        },
                                        {
                                            href: 'https://www.fergusonpressroom.com/social-media-connect-with-ferguson',
                                            label: 'Connect with us',
                                        },
                                    ].map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                className={cn(
                                                    'tw:text-white! tw:flex tw:gap-2 tw:items-center',
                                                    !item.icon && 'tw:pl-6',
                                                )}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {item.icon && <item.icon width={20} height={20} />}
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div>
                            <h4 className="title tw:uppercase tw:text-link tw:text-sm! tw:leading-4.25 tw:mb-4">
                                corporate information
                            </h4>
                            <div className="tw:flex tw:flex-col tw:gap-2">
                                <ul className="tw:flex tw:flex-col tw:gap-2">
                                    {[
                                        {
                                            href: 'https://www.ferguson.com/',
                                            label: 'ferguson.com',
                                        },
                                        {
                                            href: 'https://corporate.ferguson.com/home/default.aspx',
                                            label: 'corporate.ferguson.com',
                                        },
                                    ].map((item) => (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                className="tw:flex tw:items-center tw:gap-2 tw:text-[15.3px] tw:leading-[24.48px]"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <LinkIcon
                                                    width={16}
                                                    height={16}
                                                    className="tw:rotate-90"
                                                />
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className="tw:flex tw:flex-col tw tw:gap-2 tw:w-fit tw:mx-auto tw:text-center">
                        <div className="tw:text-sm tw:leading-4.25">
                            Copyright (c) {new Date().getFullYear()} Ferguson. All rights reserved.
                        </div>
                        <div className="tw:text-sm tw:leading-4.25 tw:*:px-2 tw:*:border-l tw:*:border-l-[#487792]">
                            {[
                                {
                                    href: 'https://www.ferguson.com/content/website-info/terms-of-site-use',
                                    label: 'Terms of Site Use',
                                },
                                {
                                    href: 'https://www.ferguson.com/content/website-info/terms-of-sale',
                                    label: 'Terms of Sale',
                                },
                                {
                                    href: 'https://www.ferguson.com/content/website-info/privacy-security',
                                    label: 'Privacy & Security',
                                },
                                {
                                    href: 'https://www.ferguson.com/content/sitemap',
                                    label: 'Sitemap',
                                },
                            ].map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="tw:first-of-type:border-l-0"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <CookieConsentLink
                                className="tw:cursor-pointer tw:p-0 tw:appearance-none tw:text-link"
                                startUsingCookiesLabel={formatMessage(
                                    translations.actions.startUsingCookies,
                                )}
                                stopUsingCookiesLabel={formatMessage(
                                    translations.actions.stopUsingCookies,
                                )}
                            />
                        </div>
                    </section>
                </div>
            </Container>
        </footer>
    );
}
