import type { ReactNode } from 'react';

import { Container } from '@/custom/components';
import { cn } from '@/custom/fns';

interface Props {
    title: string;
    subtitle?: ReactNode;
    className?: string;
}

export function PageTitle({ title, subtitle, className }: Props) {
    return (
        <section
            data-section="page-title"
            className={cn(
                'tw:relative tw:before:absolute tw:before:top-0 tw:before:h-[170px] tw:before:w-full tw:before:bg-[#01446A] tw:before:-z-1',
                'tw:text-white',
                className,
            )}
        >
            <Container className="tw:pb-6">
                <h1 className="tw:text-2xl tw:font-bold! tw:text-inherit">{title}</h1>
                {subtitle && <p className="tw:text-sm tw:text-inherit">{subtitle}</p>}
            </Container>
        </section>
    );
}
