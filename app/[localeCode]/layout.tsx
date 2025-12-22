import { Locale, Newsrooms } from '@prezly/theme-kit-nextjs';
import type { Viewport } from 'next';
import type { ReactNode } from 'react';

import { analytics, generateRootMetadata, themeSettings } from '@/adapters/server';
import { PreviewPageMask } from '@/components/PreviewPageMask';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { WindowScrollListener } from '@/components/WindowScrollListener';
import { getNewsroom } from '@/custom/fns/server';
import { CookieConsent } from '@/modules/CookieConsent/CookieConsent';
import { Branding, Preconnect } from '@/modules/Head';
import { Notifications } from '@/modules/Notifications';
import { PreviewBar } from '@/modules/PreviewBar';

import '@/styles/index.css';
import '@/styles/styles.globals.scss';
import '@prezly/content-renderer-react-js/styles.css';
import '@prezly/uploadcare-image/build/styles.css';
import 'modern-normalize/modern-normalize.css';

import { GlobalFooter } from '@/custom/GlobalFooter';
import { GlobalHeader } from '@/custom/GlobalHeader';
import { GlobalMediaResources } from '@/custom/GlobalMediaResources';
import { GlobalAnalytics } from '@/modules/Analytics/Analytics';
import { AppContext } from 'src/contexts/appContext';
import { Contacts } from '@/modules/Contacts';
import { GlobalNewsletter } from '@/custom/GlobalNewsletter';

interface Props {
    params: Promise<{
        localeCode: Locale.Code;
    }>;
    children: ReactNode;
}

export async function generateViewport(): Promise<Viewport> {
    const settings = await themeSettings();
    return {
        themeColor: settings.header_background_color,
    };
}

export async function generateMetadata(props: Props) {
    const params = await props.params;
    const newsroom = await getNewsroom();
    const faviconUrl = Newsrooms.getFaviconUrl(newsroom, 180);
    return generateRootMetadata(
        {
            locale: params.localeCode,
            indexable: !process.env.VERCEL,
        },
        {
            icons: {
                shortcut: faviconUrl,
                apple: faviconUrl,
            },
        },
    );
}

export default async function MainLayout(props: Props) {
    const params = await props.params;

    const { children } = props;

    const { code: localeCode, isoCode, direction } = Locale.from(params.localeCode);
    const { isTrackingEnabled } = analytics();
    const newsroom = await getNewsroom();

    return (
        <html lang={isoCode} dir={direction}>
            <head>
                <meta name="og:locale" content={isoCode} />
                <Preconnect />
                <Branding />
            </head>
            <body>
                <AppContext localeCode={localeCode}>
                    {isTrackingEnabled && <GlobalAnalytics newsroom={newsroom} />}
                    <Notifications localeCode={localeCode} />
                    <PreviewBar newsroom={newsroom} />
                    <div className="tw:flex tw:flex-col tw:min-h-screen">
                        <GlobalHeader localeCode={localeCode} />
                        <main>{children}</main>
                        <GlobalNewsletter />
                        <GlobalMediaResources />
                        <Contacts localeCode={localeCode} />
                        <GlobalFooter localeCode={localeCode} />
                    </div>
                    <ScrollToTopButton />
                    <CookieConsent localeCode={localeCode} />
                    <PreviewPageMask />
                    <WindowScrollListener />
                </AppContext>
            </body>
        </html>
    );
}
