import { Head } from '@inertiajs/react';
import AffiliateLayoutTemplate from '@/layouts/affiliate-layout';

export default function Welcome() {
    return (
        <AffiliateLayoutTemplate>
            <Head title="Welcome" />
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 md:px-10">
                <div className="@container mb-12">
                    <div className="flex flex-col items-center gap-6 py-6 md:py-10 @[864px]:flex-row">
                        <div className="group relative w-full cursor-pointer overflow-hidden rounded-xl shadow-2xl ring-1 shadow-cyan-900/20 ring-tiktok-cyan/30 @[864px]:w-1/2">
                            <div
                                className="aspect-video w-full bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuC0LqHjFtaPQK1efM51vMgWH_IS6fUK8S4k2c7qoUkCx-_Gh5IdBJpOkHBFOyLtrnhLyax3o2-Nt2VTdhC8SXVd1iz7b8rFCH9lkTeGgkFwowauJJYOAc_EBb4SVjzwi0mUjP-lk-OUqejkljnLVmmeO7p0uG9aPcn6_zpk75DyLcN8x0pt-lSogss9nvDBLwLqxJiyQnB4VuD30ozKMQ4piWeYQiKikuUTTR-evlRNzkex7JjLI-Nzg_kXysOnV4BDWyfd7SXy7Q)] bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105"
                                data-alt="Smartphone recording a viral dance video with ring light setup"
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <span className="material-symbols-outlined text-6xl text-tiktok-pink drop-shadow-[2px_2px_0px_#00f2ea]">
                                    play_circle
                                </span>
                            </div>
                            <div className="absolute right-4 bottom-4 rounded border border-tiktok-pink/50 bg-black/80 px-2 py-1 text-xs font-bold text-white">
                                Start Here
                            </div>
                        </div>
                        <div className="flex w-full flex-col justify-center gap-6 @[864px]:w-1/2 @[864px]:pl-10">
                            <div className="flex flex-col gap-3 text-left">
                                <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-tiktok-cyan uppercase">
                                    <span className="material-symbols-outlined text-lg">
                                        trending_up
                                    </span>
                                    TikTok Affiliate Bootcamp
                                </div>
                                <h1 className="text-4xl leading-tight font-black tracking-[-0.033em] text-white md:text-5xl">
                                    Kuasai{' '}
                                    <span className="bg-linear-to-r from-tiktok-cyan to-tiktok-pink bg-clip-text text-transparent">
                                        TikTok Affiliate
                                    </span>
                                </h1>
                                <p className="text-base leading-relaxed font-normal text-text-muted md:text-lg">
                                    Panduan lengkap "Cuan dari Rumah". Pelajari
                                    strategi konten FYP, cara menyematkan
                                    keranjang kuning, dan raih komisi jutaan
                                    rupiah hanya dengan HP.
                                </p>
                                <div className="mt-2 flex items-center gap-4">
                                    <div className="flex -space-x-2">
                                        <img
                                            alt="Instructor 1"
                                            className="inline-block h-8 w-8 rounded-full ring-2 ring-tiktok-pink"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZuXJT_6NmdNG0VC4tyDYpv2scMzkfuFVDdiXDRsA9g9jyiqG-hhgBvHGP5wu95jkNSJMqyLvESIKZgk46UjIuGnyUhmeyjUGU0r3-TExNbGug82m4HGghxXU9i_W-yHEvFEJ4kvSDMHDA4N9BvIoNqpnoghHZlcnhMf_3Z5Wr-bODcx88NbMe7R2oJrhWPAEj02suyRwKDBBsJgw0GoCL0mBMEpz6lrCWbxZlt_Jh0EYIs-mHlKjqDI10nwuQ8_osM910mWCzgA"
                                        />
                                        <img
                                            alt="Instructor 2"
                                            className="inline-block h-8 w-8 rounded-full ring-2 ring-tiktok-cyan"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfGLkS2Qe68yonhM6iQL2urvWBD7mNuYjl5M5CwPIxCzartvxxrLi77uGZVKI6sdCABJlqW7-pSclP9WVl1Lesch_2NyMHCQUJwaywM0X7u-XLDUrEe57uKaFUtsXfl3KFceO7qf2axkLbMXi-tzQWMi_Ql0VlGyzRDnVACRAUeedGNs-2zmaEMFq5gF7aqHHAfu7Bx3qjL8s6zI2fBvDwuLlvGSJczaOQbi0_SJ7CuXwVruXSy1HLjxSudoqtjgAnnx2O6Dij4g"
                                        />
                                        <img
                                            alt="Instructor 3"
                                            className="inline-block h-8 w-8 rounded-full ring-2 ring-tiktok-pink"
                                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjPYE8S40PbSW_r5yy7sebm4O7SlZ1Txi0bID268hMRc47rYsA0zcGEBhPplCBleJXPw088gWX8ZsUfsb8LFFFEMgpxZkmvRuktlg6cCN4LobjmbbHMjnQCDMfbTYTNB-A3Dgda64pdhGEL45YyAWCgrP4qJN47xMQdRrzxO2CEUP2wo1qddEX7CGxhg41VPzM0w7TLy414-2TOXeq2TcDHjpBemhYEC6gXqZHSAiR0F4SJIXaCmWSr0KI6I2b-Y9bm75LSNpqIA"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-text-muted">
                                        + 5 Top Creator
                                    </span>
                                </div>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-3">
                                <button className="flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-tiktok-pink px-6 text-base leading-normal font-bold tracking-[0.015em] text-white shadow-lg shadow-pink-500/20 transition-colors hover:bg-pink-600">
                                    <span className="material-symbols-outlined mr-2">
                                        play_arrow
                                    </span>
                                    Mulai Belajar
                                </button>
                                <button className="flex h-12 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-gray-700 bg-surface-dark px-6 text-base leading-normal font-bold tracking-[0.015em] text-white transition-colors hover:bg-gray-700">
                                    <span className="material-symbols-outlined mr-2">
                                        bookmark
                                    </span>
                                    Simpan Modul
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto mb-8 max-w-3xl py-6">
                    <label className="group relative flex h-14 w-full flex-col">
                        <div className="flex h-full w-full flex-1 items-stretch rounded-xl border border-gray-700 bg-surface-dark shadow-lg transition-shadow focus-within:ring-2 focus-within:ring-tiktok-cyan">
                            <div className="flex items-center justify-center pr-2 pl-5 text-text-muted">
                                <span className="material-symbols-outlined">
                                    search
                                </span>
                            </div>
                            <input
                                className="flex w-full min-w-0 flex-1 bg-transparent px-2 text-lg font-normal text-white placeholder:text-text-muted focus:outline-none"
                                placeholder="Cari tutorial affiliate, ide konten, atau produk..."
                                value=""
                            />
                            <div className="hidden items-center justify-center pr-2 sm:flex">
                                <button className="rounded-md border border-tiktok-cyan/30 bg-tiktok-cyan/10 px-3 py-1.5 text-xs font-bold text-tiktok-cyan transition-colors hover:bg-tiktok-cyan/20">
                                    CMD + K
                                </button>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="mb-12">
                    <div className="no-scrollbar mask-gradient flex gap-4 overflow-x-auto pb-4">
                        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full border border-tiktok-cyan bg-tiktok-black pr-5 pl-4 transition-transform hover:scale-105">
                            <span className="material-symbols-outlined text-xl text-tiktok-cyan">
                                school
                            </span>
                            <span className="text-sm font-bold text-white">
                                Beginner Guide
                            </span>
                        </button>
                        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-dark pr-5 pl-4 transition-colors hover:bg-gray-700">
                            <span className="material-symbols-outlined text-xl text-tiktok-pink">
                                live_tv
                            </span>
                            <span className="text-sm font-medium text-white">
                                Live Streaming
                            </span>
                        </button>
                        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-dark pr-5 pl-4 transition-colors hover:bg-gray-700">
                            <span className="material-symbols-outlined text-xl text-text-muted">
                                movie_edit
                            </span>
                            <span className="text-sm font-medium text-white">
                                Video Editing
                            </span>
                        </button>
                        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-dark pr-5 pl-4 transition-colors hover:bg-gray-700">
                            <span className="material-symbols-outlined text-xl text-text-muted">
                                campaign
                            </span>
                            <span className="text-sm font-medium text-white">
                                Marketing Strategy
                            </span>
                        </button>
                        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-dark pr-5 pl-4 transition-colors hover:bg-gray-700">
                            <span className="material-symbols-outlined text-xl text-text-muted">
                                analytics
                            </span>
                            <span className="text-sm font-medium text-white">
                                Analytics
                            </span>
                        </button>
                        <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-surface-dark pr-5 pl-4 transition-colors hover:bg-gray-700">
                            <span className="material-symbols-outlined text-xl text-text-muted">
                                shopping_bag
                            </span>
                            <span className="text-sm font-medium text-white">
                                Product Selection
                            </span>
                        </button>
                    </div>
                </div>
                <section className="mb-12">
                    <div className="mb-6 flex items-center justify-between px-1">
                        <h2 className="text-2xl leading-tight font-bold tracking-[-0.015em] text-white">
                            Trending Affiliate Modules
                        </h2>
                        <a
                            className="flex items-center gap-1 text-sm font-bold text-tiktok-cyan hover:text-cyan-200"
                            href="#"
                        >
                            Lihat Semua{' '}
                            <span className="material-symbols-outlined text-sm">
                                arrow_forward
                            </span>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="group flex cursor-pointer flex-col gap-3">
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-800 bg-surface-dark transition-colors group-hover:border-tiktok-pink/50">
                                <div
                                    className="h-full w-full bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuDA5a9--ISpQc4VP9lZ3yOuX5lTz99q9YTW9m3agty4CD4-Fy2txLP2yRj90PUaZA578syUmD6yCjwbKoRgL3pCaQeMUDYm7GQJmzFwHTIYSXZFpUaa5DX1nlB7Eh2rYi_4m3UX3EnqB1CSch6NTPnUkvVLge_-dW3wNbN_3wAvOKB15pGxHGc_WNuP4jgA0_OZx4y-d6L30aadWhtqMA3QqxkKwqMJywhJPd_EVzfzZZAs7_K4lj61UzM2x9iNocKxDSgaqF7Wag)] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    data-alt="Smartphone with colorful ring light reflection"
                                ></div>
                                <div className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-bold text-white">
                                    8 Video
                                </div>
                                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10"></div>
                            </div>
                            <div>
                                <h3 className="text-lg leading-snug font-bold text-white transition-colors group-hover:text-tiktok-pink">
                                    Algoritma FYP 2024
                                </h3>
                                <p className="mt-1 text-sm text-text-muted">
                                    Siska Kohl KW • 2j 30m
                                </p>
                                <div className="mt-2 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm text-yellow-500">
                                        star
                                    </span>
                                    <span className="text-xs font-bold text-white">
                                        4.9
                                    </span>
                                    <span className="text-xs text-text-muted">
                                        (2.1k)
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="group flex cursor-pointer flex-col gap-3">
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-800 bg-surface-dark transition-colors group-hover:border-tiktok-cyan/50">
                                <div
                                    className="h-full w-full bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuCrFlHES2Vyg0vrSdwQAPydl1JwDKZh-9KujydcyhUfOTgK1J_j7CaDhK0TqIno3eeRV4wnuwjdY7KQpbavtpJpWdk4y43qohK8OHzili05HPc4uCkssWMqC64hKM8XnJoCx-Xv4Uuw2zWMBTAoWr7KgIrbn53AOTDCFigdKCozy8P-18FAks82ONaIwLaosJYArojghkffuPdjuUE107a6BZSL6RGviylY6rYdykeKjxy2yS4KVHyUjvizdMioOc1WkKDqLp7s-w)] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    data-alt="Video editing interface on a phone screen"
                                ></div>
                                <div className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-bold text-white">
                                    12 Video
                                </div>
                                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10"></div>
                            </div>
                            <div>
                                <h3 className="text-lg leading-snug font-bold text-white transition-colors group-hover:text-tiktok-cyan">
                                    CapCut Editing Magic
                                </h3>
                                <p className="mt-1 text-sm text-text-muted">
                                    Editor Pro • 3j 15m
                                </p>
                                <div className="mt-2 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm text-yellow-500">
                                        star
                                    </span>
                                    <span className="text-xs font-bold text-white">
                                        4.8
                                    </span>
                                    <span className="text-xs text-text-muted">
                                        (1.8k)
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="group flex cursor-pointer flex-col gap-3">
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-800 bg-surface-dark transition-colors group-hover:border-tiktok-pink/50">
                                <div
                                    className="h-full w-full bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuBBMkn56JdkDmYuP1gA6ykddyx7qy5oh3d73zDzJ5xpoB8lCZFwY1liYv0QrKw4rroqQNl5gz0Ti6ISYa9wmVZkgbetFaVuPcKLb5Vo71PuIsGSltC2x2JQpmpjH-JaF1NQHTMLm2QIurAvImkRc3GmaJ6qOHCF6tUVIkmKjtB7lqRNmDHZKyuVUnnonMWERZw0rTKxW31KOR35v4uI-4UckT5KBqmpRWlQMuljvqzJ2lqgXMQ64jbjd_y3Myw7d4f3ztTrOFO8cQ)] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    data-alt="Woman holding phone showing shopping bags"
                                ></div>
                                <div className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-bold text-white">
                                    5 Video
                                </div>
                                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10"></div>
                            </div>
                            <div>
                                <h3 className="text-lg leading-snug font-bold text-white transition-colors group-hover:text-tiktok-pink">
                                    Riset Produk Winning
                                </h3>
                                <p className="mt-1 text-sm text-text-muted">
                                    Master Cuan • 1j 45m
                                </p>
                                <div className="mt-2 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm text-yellow-500">
                                        star
                                    </span>
                                    <span className="text-xs font-bold text-white">
                                        4.9
                                    </span>
                                    <span className="text-xs text-text-muted">
                                        (5.3k)
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="group flex cursor-pointer flex-col gap-3">
                            <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-800 bg-surface-dark transition-colors group-hover:border-tiktok-cyan/50">
                                <div
                                    className="h-full w-full bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuBWdC6py90toJzARbcLbDO9vJPAxbrYRF-qVH5ax-P53m-xC61vCH8p9eD64gnbIP6CjlAjv1jDVGdyDU_NRqDzNAoNvLUC2PZgq4I5Lf0dXWXPDQNZrWXv39T8jiAA5Ef-tWI1KKMLige95sQrltBl5xuyFzOyPpi4WCl2UIA-lKA8rXHRPGX6ZUZvZ0vx5gOgtxFHEMjkU8A0hahiI6So8hDhTUw0W44l33XrkbkW-__V4ti9P1hLXnzb0ICzpoeRedlyYozNUQ)] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    data-alt="Microphone setup for live streaming"
                                ></div>
                                <div className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-bold text-white">
                                    15 Video
                                </div>
                                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10"></div>
                            </div>
                            <div>
                                <h3 className="text-lg leading-snug font-bold text-white transition-colors group-hover:text-tiktok-cyan">
                                    Live Streaming Sales
                                </h3>
                                <p className="mt-1 text-sm text-text-muted">
                                    Host Hits • 5j 20m
                                </p>
                                <div className="mt-2 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm text-yellow-500">
                                        star
                                    </span>
                                    <span className="text-xs font-bold text-white">
                                        4.7
                                    </span>
                                    <span className="text-xs text-text-muted">
                                        (890)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-12">
                    <div className="mb-6 flex items-center justify-between px-1">
                        <h2 className="text-2xl leading-tight font-bold tracking-[-0.015em] text-white">
                            New in Affiliate
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-gray-800 bg-surface-dark p-4 transition-colors hover:border-tiktok-cyan/30 hover:bg-gray-800 sm:flex-row">
                            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-gray-700 sm:aspect-auto sm:w-48">
                                <div
                                    className="h-full w-full bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuBEwIhj-VvgEb_trd-ppdB0icBVW8gUX6eQOmD01mU-tafxibAavRoJXKYFx9hEPlCZ8kGXEQfNj-2qsKI52wW0qD7xY7zhL1FqftY9-oaXt5l9LwMtRACwm-HugSIUPQr59rDIlfJkV7Pi_eVwqxvWXi14B9mBWdmPIaq3NyhUtp0dAB-AZ91Yc_Qxsg5nPtaf_B5f6xeEu8JDe-JNFmT2mJ7YveUfOAymvHpd_kL7NKmuPTYsHh5jpVg_I6qzzNPJFjAzOCyh8w)] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    data-alt="Person holding smartphone with green screen"
                                ></div>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                                    <span className="material-symbols-outlined text-4xl text-white">
                                        play_arrow
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between py-1">
                                <div>
                                    <span className="mb-1 block text-xs font-bold text-tiktok-cyan uppercase">
                                        Beginner Guide
                                    </span>
                                    <h3 className="mb-2 text-lg leading-tight font-bold text-white">
                                        Setup Akun dari Nol
                                    </h3>
                                    <p className="line-clamp-2 text-sm text-text-muted">
                                        Langkah demi langkah mendaftar TikTok
                                        Shop Affiliate dan verifikasi data agar
                                        cepat disetujui.
                                    </p>
                                </div>
                                <div className="mt-3 flex items-center gap-3 text-sm text-text-muted">
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">
                                            schedule
                                        </span>
                                        45m
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">
                                            person
                                        </span>
                                        TutorialID
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-gray-800 bg-surface-dark p-4 transition-colors hover:border-tiktok-pink/30 hover:bg-gray-800 sm:flex-row">
                            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-gray-700 sm:aspect-auto sm:w-48">
                                <div
                                    className="h-full w-full bg-[url(https://lh3.googleusercontent.com/aida-public/AB6AXuDB16HOD8Ti_dBJTQhzsCn-3o-vEFAGXiOwyqMfhJOi9tLI-JMfMKwBC_rnYPxjFaBcihc_cAunVGoLrbiW3gfUc8xGBrUMjFUJ5aWs-iJjnsbtkdvLHEU5mnF4rB-lTFR1y6xyGBQrNxuSUMneJNkdxTqkuCxy14jUC_3OIQBlRvNy_ii-NjM4rca4h8DIVkK9l7V55Bh0dHDQqF_sMH-XbCIB9WFxzFo1-pRBVB1QDaMxJpSwCl_anWy_EQI9geikiQAm6orw3Q)] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                    data-alt="Viral content creation studio setup"
                                ></div>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                                    <span className="material-symbols-outlined text-4xl text-white">
                                        play_arrow
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between py-1">
                                <div>
                                    <span className="mb-1 block text-xs font-bold text-tiktok-pink uppercase">
                                        Content Strategy
                                    </span>
                                    <h3 className="mb-2 text-lg leading-tight font-bold text-white">
                                        Hook 3 Detik Pertama
                                    </h3>
                                    <p className="line-clamp-2 text-sm text-text-muted">
                                        Rahasia membuat audiens berhenti scroll
                                        dan menonton videomu sampai habis.
                                        Teknik storytelling simpel.
                                    </p>
                                </div>
                                <div className="mt-3 flex items-center gap-3 text-sm text-text-muted">
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">
                                            schedule
                                        </span>
                                        1h 20m
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-base">
                                            person
                                        </span>
                                        ContentKing
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </AffiliateLayoutTemplate>
    );
}
