import { Button } from '@/components/Button';
import type { Locale } from '@prezly/theme-kit-nextjs';
import { FormattedMessage, translations } from '@prezly/theme-kit-nextjs/index';
import { cn } from '../fns';

interface Props {
    load: () => void;
    loading: boolean;
    locale: Locale.Code;
    className?: string;
}

export function LoadMoreButton(props: Props) {
    const { load, loading, locale, className } = props;

    return (
        <Button
            variation="secondary"
            onClick={load}
            loading={loading}
            className={cn('tw:w-fit tw:mx-auto!', className)}
        >
            <FormattedMessage
                locale={locale}
                for={loading ? translations.misc.stateLoading : translations.actions.loadMore}
            />
            ...
        </Button>
    );
}
