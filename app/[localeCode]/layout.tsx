import { Locale, Newsrooms } from '@prezly/theme-kit-nextjs';
import type { Viewport } from 'next';
import type { ReactNode } from 'react';

import { analytics, app, generateRootMetadata, themeSettings } from '@/adapters/server';
import { PreviewPageMask } from '@/components/PreviewPageMask';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';
import { WindowScrollListener } from '@/components/WindowScrollListener';
import { Boilerplate } from '@/modules/Boilerplate';
import { CookieConsent } from '@/modules/CookieConsent/CookieConsent';
import { Footer } from '@/modules/Footer';
import { Branding, Preconnect } from '@/modules/Head';
import { Header } from '@/modules/Header';
import { Notifications } from '@/modules/Notifications';
import { PreviewBar } from '@/modules/PreviewBar';
import { SubscribeForm } from '@/modules/SubscribeForm';

import '@/styles/index.css';
import '@/styles/styles.globals.scss';
import '@prezly/content-renderer-react-js/styles.css';
import '@prezly/uploadcare-image/build/styles.css';
import 'modern-normalize/modern-normalize.css';

import { GlobalAnalytics } from '@/modules/Analytics/Analytics';
import { AppContext } from 'src/contexts/appContext';
import styles from './layout.module.scss';

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
    const newsroom = await app().newsroom();
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
    const newsroom = await app().newsroom();

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
                    <div className={styles.layout}>
                        <Header localeCode={localeCode} />
                        <main className={styles.content}>{children}</main>
                        <SubscribeForm />
                        <Boilerplate localeCode={localeCode} />
                        <Footer localeCode={localeCode} />
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
