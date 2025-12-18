import type { Locale } from '@prezly/theme-kit-nextjs';
import { getLanguage, getNewsroom, getThemeSettings } from '@/custom/fns/server';
import GlobalHeaderClient from './client';

interface Props {
    localeCode: Locale.Code;
}

export default async function GlobalHeader(props: Props) {
    const { localeCode } = props;

    const newsroom = await getNewsroom();
    const language = await getLanguage(localeCode);
    const settings = await getThemeSettings();

    return (
        <GlobalHeaderClient
            localeCode={localeCode}
            newsroom={newsroom}
            companyInformation={language.company_information}
            logoSize={settings.logo_size}
        />
    );
}
