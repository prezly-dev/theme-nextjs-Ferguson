import { Locale } from '@prezly/theme-kit-nextjs';
import type { ReactNode } from 'react';

import { ThemeSettingsProvider } from '@/adapters/client';
import { app } from '@/adapters/server';
import { CategoryImageFallbackProvider } from '@/components/CategoryImage';
import {
    BroadcastGalleryProvider,
    BroadcastNotificationsProvider,
    BroadcastPageTypesProvider,
    BroadcastPreviewProvider,
    BroadcastStoryProvider,
    BroadcastTranslationsProvider,
} from '@/modules/Broadcast';
import { CookieConsentProvider } from '@/modules/CookieConsent';
import { IntlProvider } from '@/modules/Intl';
import { RoutingProvider } from '@/modules/Routing';

export async function AppContext(props: { children: ReactNode; localeCode: Locale.Code }) {
    const { localeCode, children } = props;

    const newsroom = await app().newsroom();
    const languageSettings = await app().languageOrDefault(localeCode);
    const brandName = languageSettings.company_information.name || newsroom.name;
    const settings = await app().themeSettings();

    return (
        <RoutingProvider>
            <IntlProvider localeCode={localeCode}>
                <BroadcastStoryProvider>
                    <BroadcastGalleryProvider>
                        <CookieConsentProvider trackingPolicy={newsroom.tracking_policy}>
                            <CategoryImageFallbackProvider
                                image={newsroom.newsroom_logo}
                                text={brandName}
                            >
                                <ThemeSettingsProvider settings={settings}>
                                    <BroadcastPageTypesProvider>
                                        <BroadcastNotificationsProvider>
                                            <BroadcastTranslationsProvider>
                                                <BroadcastPreviewProvider>
                                                    {children}
                                                </BroadcastPreviewProvider>
                                            </BroadcastTranslationsProvider>
                                        </BroadcastNotificationsProvider>
                                    </BroadcastPageTypesProvider>
                                </ThemeSettingsProvider>
                            </CategoryImageFallbackProvider>
                        </CookieConsentProvider>
                    </BroadcastGalleryProvider>
                </BroadcastStoryProvider>
            </IntlProvider>
        </RoutingProvider>
    );
}
