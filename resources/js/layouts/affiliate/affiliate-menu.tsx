import { Link } from '@inertiajs/react';
import type { NavItemAffiliate } from '@/types/navigation-affiliate';

export default function AffiliateMenu({
    item,
    isActive = false,
}: {
    item: NavItemAffiliate;
    isActive: boolean;
}) {
    return (
        <Link
            key={item.title}
            href={item.href}
            className={`text-sm leading-normal font-medium transition-colors hover:text-white ${isActive ? 'text-tiktok-cyan' : 'text-text-muted'}`}
        >
            {item.title}
        </Link>
    );
}
