import kelas from '@/routes/kelas';
import type { NavItemAffiliate } from '@/types/navigation-affiliate';
import AffiliateFooterLayout from './affiliate-footer-layout';
import AffiliateHeaderLayout from './affiliate-header-layout';

export default function AppBodyAffiliate({
    children,
}: {
    children: React.ReactNode;
}) {
    const headerNavItems: NavItemAffiliate[] = [
        {
            title: 'Kelas',
            href: kelas.index(),
        },
        {
            title: 'Mentor',
            href: '#',
        },
        {
            title: 'Blog',
            href: '#',
        },
    ];
    return (
        <div className="flex min-h-screen flex-col bg-background font-display text-slate-900 dark:text-slate-100">
            <AffiliateHeaderLayout menu={headerNavItems} />
            {children}
            <AffiliateFooterLayout />
        </div>
    );
}
