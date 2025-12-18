import { cn } from '../fns';
import type { PropsWithClassName } from '../types';

interface Props extends PropsWithClassName {
    children: React.ReactNode;
}

export function Container({ children, className }: Props) {
    // 1142px, default max-width; default inline padding-left/right is 17px;
    // Later update Tailwind's "container" class to use this new class
    // or create a new class for this container
    return (
        <div className={cn('tw:max-w-[1142px] tw:px-4.25 tw:mx-auto', className)}>{children}</div>
    );
}
