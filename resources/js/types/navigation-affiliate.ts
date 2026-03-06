import type { InertiaLinkProps } from '@inertiajs/react';

export type NavItemAffiliate = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    isActive?: boolean;
};
