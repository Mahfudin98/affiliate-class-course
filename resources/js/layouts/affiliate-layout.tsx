import { Head } from '@inertiajs/react';
import type { AppLayoutProps } from '@/types';
import AppBodyAffiliate from './affiliate/app-body-layout';

export default function AffiliateLayoutTemplate({
    children,
    ...props
}: AppLayoutProps) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
                <link href="https://fonts.googleapis.com" rel="preconnect" />
                <link href="https://fonts.gstatic.com" rel="preconnect" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&amp;display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap"
                    rel="stylesheet"
                />
            </Head>
            <AppBodyAffiliate {...props}>{children}</AppBodyAffiliate>
        </>
    );
}
