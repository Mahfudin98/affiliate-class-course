import { Link, usePage } from '@inertiajs/react';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { dashboard, home, login, register } from '@/routes';
import type { NavItemAffiliate } from '@/types/navigation-affiliate';
import AffiliateMenu from './affiliate-menu';

export default function AffiliateHeaderLayout({
    canRegister = true,
    menu,
}: {
    canRegister?: boolean;
    menu: NavItemAffiliate[];
}) {
    const { auth } = usePage().props;
    const { isCurrentUrl } = useCurrentUrl();
    return (
        <header className="sticky top-0 z-50 flex items-center justify-between border-b border-solid border-b-surface-dark bg-background px-10 py-3 whitespace-nowrap">
            <Link href={home()} className="flex items-center gap-4 text-white">
                <div className="flex size-8 items-center justify-center text-tiktok-pink">
                    <span className="material-symbols-outlined text-3xl drop-shadow-[2px_2px_0px_#00f2ea]">
                        music_note
                    </span>
                </div>
                <h2 className="text-lg leading-tight font-bold tracking-[-0.015em] text-white">
                    Affiliate
                    <span className="text-tiktok-cyan">Mastery</span>
                </h2>
            </Link>
            <div className="flex flex-1 justify-end gap-8">
                <div className="hidden items-center gap-9 md:flex">
                    {menu.map((item, index) => (
                        <AffiliateMenu
                            key={index}
                            item={item}
                            isActive={isCurrentUrl(item.href)}
                        />
                    ))}
                </div>
                <div className="flex gap-2">
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            {canRegister && (
                                <Link
                                    href={register()}
                                    className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-tiktok-pink px-4 text-sm leading-normal font-bold tracking-[0.015em] text-white transition-colors hover:bg-pink-600"
                                >
                                    Daftar
                                </Link>
                            )}
                            <Link
                                href={login()}
                                className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-surface-dark px-4 text-sm leading-normal font-bold tracking-[0.015em] text-white transition-colors hover:bg-gray-700"
                            >
                                Masuk
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
