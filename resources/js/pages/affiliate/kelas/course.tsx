import { Head, Link, usePage } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AffiliateLayoutTemplate from '@/layouts/affiliate-layout';
import kelas from '@/routes/kelas';
import type { Course, Module } from '@/types/course';

type CourseProps = {
    course_data: Course;
};

export default function KelasCourse() {
    const { course_data } = usePage<CourseProps>().props;
    return (
        <AffiliateLayoutTemplate>
            <Head title={course_data.title} />
            <main className="flex h-full flex-1 flex-col overflow-y-auto">
                <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 p-4 sm:p-6 lg:p-10">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Welcome back, Creator! 👋, to {course_data.title}{' '}
                            class
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400">
                            {course_data.description}
                        </p>
                    </div>
                    <div className="group relative w-full overflow-hidden rounded-2xl border border-[#283039] bg-[#111418] shadow-xl">
                        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
                        <img
                            alt="Background for continue learning"
                            className="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJa3hxvm6bOgSw5TxsWiAFrVLSl9DCf3oVtpN0eUZUb89VUpi3uSZR9lKukhvz3kKcDrUl0r2JBY1BHNo9BIpUi1D8lf1KlTdMoWnrtpErPMlzMfqM1ilX9Uhohf3Zm5hSAxLZdvqdxoWrlJsm7N_SsfrNIMYkilpWK44fZ-2T3wkkEgzfF3LRukJ8OVFiRxFWZF-URxAiZvOZe19NXfQHYfihqcyfiOgubMs1nKK6Y7q9iDupkS7ZdmFw0rObu6dh9UVA9vhm1w"
                        />
                        <div className="relative z-20 flex h-full flex-col items-start gap-6 p-6 md:flex-row md:items-center md:p-8 lg:p-10">
                            <div className="flex flex-1 flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="rounded bg-primary px-2 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase">
                                        Continue Watching
                                    </span>
                                    <span className="text-xs font-semibold tracking-wide text-secondary">
                                        RAHASIA KONTEN FYP
                                    </span>
                                </div>
                                <h2 className="max-w-2xl text-2xl leading-tight font-bold text-white md:text-3xl lg:text-4xl">
                                    Module 3: Hook Strategies That Stop The
                                    Scroll
                                </h2>
                                <p className="line-clamp-2 max-w-xl text-sm text-slate-300 md:text-base">
                                    Learn the psychological triggers that grab
                                    attention in the first 3 seconds of your
                                    TikTok videos.
                                </p>
                                <div className="mt-2 flex items-center gap-4">
                                    <button className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90">
                                        <span className="material-symbols-outlined text-[24px]">
                                            play_arrow
                                        </span>
                                        Resume Lesson
                                    </button>
                                    <div className="flex min-w-[140px] flex-col gap-1">
                                        <div className="flex justify-between text-xs font-medium text-slate-300">
                                            <span>Progress</span>
                                            <span>8m left</span>
                                        </div>
                                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                                            <div className="h-full w-[65%] rounded-full bg-secondary shadow-[0_0_10px_rgba(37,244,238,0.5)]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative hidden aspect-video w-64 shrink-0 overflow-hidden rounded-lg border-2 border-white/10 shadow-2xl transition-colors group-hover:border-primary/50 md:flex">
                                <img
                                    alt="Video thumbnail"
                                    className="h-full w-full object-cover"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdp_ILJxnCOHJKiRl2rc4YmiMHoWX4lsdN3Z3cLUyjZtquKKezidSUvPwNtGKetRptEu_umoCKgeQobRCxdja0arBVLCb24vZpZ6naMDGVhU-vOR9jnC802Qbcx-CHrhmXhHmBNKl4F-CM_eu8Ye08GojGAFR4ckzc8zDvCPMjZ7q2b8TjJF49asjNTyz9j9UIo1K-BpZqSl3moHblXGEEDQqbzTVC6EGhFi8-cQ5hSPw7jeogeSHyCe4gwsitjtrQIT_YNGDOBQ"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <span className="material-symbols-outlined text-[48px] text-white opacity-80">
                                        play_circle
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="flex flex-col gap-6 lg:col-span-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                    Enrolled Pathways
                                </h3>
                                <a
                                    className="text-sm font-medium text-primary hover:text-primary/80"
                                    href="#"
                                >
                                    Browse Catalog
                                </a>
                            </div>
                            {/* module list */}
                            {course_data.modules.map((module) => (
                                <ModuleListAffiliate
                                    key={module.id}
                                    module={module}
                                />
                            ))}
                        </div>
                        <div className="flex flex-col gap-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                Milestones
                            </h3>
                            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-[#283039] dark:bg-[#111418]">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="rounded-lg bg-yellow-500/10 p-2 text-yellow-500">
                                        <span className="material-symbols-outlined text-[24px]">
                                            trophy
                                        </span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 dark:text-white">
                                            Earned Certificates
                                        </h4>
                                        <p className="text-xs text-slate-500">
                                            2 of 5 collected
                                        </p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="group relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-100 p-2 transition-colors hover:border-primary/50 dark:border-[#283039] dark:bg-[#1c2127]">
                                        <span className="material-symbols-outlined text-4xl text-secondary">
                                            verified
                                        </span>
                                        <span className="text-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                                            Affiliate Starter
                                        </span>
                                        <div className="absolute top-2 right-2 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                            <span className="material-symbols-outlined text-[16px]">
                                                download
                                            </span>
                                        </div>
                                    </div>
                                    <div className="group relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-100 p-2 transition-colors hover:border-primary/50 dark:border-[#283039] dark:bg-[#1c2127]">
                                        <span className="material-symbols-outlined text-4xl text-primary">
                                            campaign
                                        </span>
                                        <span className="text-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                                            Viral Master
                                        </span>
                                        <div className="absolute top-2 right-2 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                                            <span className="material-symbols-outlined text-[16px]">
                                                download
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-100/50 p-2 opacity-60 dark:border-[#283039] dark:bg-[#1c2127]/50">
                                        <span className="material-symbols-outlined text-4xl text-slate-400">
                                            lock
                                        </span>
                                        <span className="text-center text-[10px] font-bold text-slate-500">
                                            Sales Pro
                                        </span>
                                    </div>
                                    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-200 bg-slate-100/50 p-2 opacity-60 dark:border-[#283039] dark:bg-[#1c2127]/50">
                                        <span className="material-symbols-outlined text-4xl text-slate-400">
                                            lock
                                        </span>
                                        <span className="text-center text-[10px] font-bold text-slate-500">
                                            Ads Expert
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-5 shadow-sm">
                                <div className="absolute top-0 right-0 p-3 opacity-20">
                                    <span className="material-symbols-outlined rotate-12 text-[80px] text-primary">
                                        shopping_bag
                                    </span>
                                </div>
                                <h4 className="relative z-10 mb-2 font-bold text-slate-900 dark:text-white">
                                    Sales Goal Tracker
                                </h4>
                                <p className="relative z-10 mb-4 text-xs text-slate-500 dark:text-slate-400">
                                    Apply what you learned!
                                </p>
                                <div className="relative z-10 flex flex-col gap-4">
                                    <div>
                                        <div className="mb-1 flex justify-between text-xs">
                                            <span className="font-medium text-slate-700 dark:text-slate-300">
                                                Monthly Revenue
                                            </span>
                                            <span className="font-bold text-primary">
                                                $850 / $1,000
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-black/40">
                                            <div className="h-2 rounded-full bg-primary"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-1 flex justify-between text-xs">
                                            <span className="font-medium text-slate-700 dark:text-slate-300">
                                                Items Sold
                                            </span>
                                            <span className="font-bold text-secondary">
                                                42 / 50
                                            </span>
                                        </div>
                                        <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-black/40">
                                            <div className="h-2 rounded-full bg-secondary"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-slate-200 bg-slate-100 p-4 dark:border-[#283039] dark:bg-[#1c2127]">
                                <h4 className="mb-3 text-sm font-bold text-slate-900 dark:text-white">
                                    Recommended Next Steps
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-slate-400">
                                            <span className="block size-2.5 rounded-full bg-transparent"></span>
                                        </div>
                                        <span className="text-xs text-slate-600 dark:text-slate-400">
                                            Complete "Hook Strategies" Quiz
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 border-primary">
                                            <span className="block size-2.5 animate-pulse rounded-full bg-primary"></span>
                                        </div>
                                        <span className="text-xs font-medium text-slate-900 dark:text-white">
                                            Watch "Optimasi Keranjang Kuning"
                                            Module 3
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-slate-400">
                                            <span className="block size-2.5 rounded-full bg-transparent"></span>
                                        </div>
                                        <span className="text-xs text-slate-600 dark:text-slate-400">
                                            Join the weekly Live Workshop
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AffiliateLayoutTemplate>
    );
}

function ModuleListAffiliate({ module }: { module: Module }) {
    return (
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-primary/30 sm:flex-row dark:border-[#283039] dark:bg-[#111418]">
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg sm:w-48">
                <img
                    alt="Course thumbnail"
                    className="h-full w-full object-cover"
                    src={module.videos[0].youtube_video.thumbnail_url}
                />
                <div className="absolute right-2 bottom-2 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    0/{module.videos.length} Completed
                </div>
            </div>
            <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-start justify-between">
                    <div>
                        <span className="mb-1 block text-[10px] font-bold tracking-wider text-emerald-500 uppercase">
                            Advanced
                        </span>
                        <h4 className="text-lg leading-tight font-bold text-slate-900 dark:text-white">
                            {module.title}
                        </h4>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="text-slate-400 hover:text-white">
                                <span className="material-symbols-outlined text-[20px]">
                                    more_vert
                                </span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Action</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={kelas.show.module(module.id)}>
                                        Show Module
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <p className="line-clamp-1 text-sm text-slate-500 dark:text-slate-400">
                    {module.description ?? '-'}
                </p>
                <div className="mt-auto flex flex-col gap-2">
                    <div className="flex items-end justify-between">
                        <div className="flex items-center gap-2">
                            <img
                                className="size-6 rounded-full border border-slate-700 object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDJUey9VWKKYlMwX-iv-tjxsr3Exp3cdFiE10DMUrWREbzKJZeWBePqo9DMvpupyGl_4G-r1KrRUljzVTcD_pcZt_252A-CLoPH8iXM4chxHUhit4atws_gLIRiU_KfjEwmAu3xaKo0AwxOWiQ2etCYmsD40Ab5U6dBnt1tUomBtRR_SZjkow9m3YDWFad5gRQraZrDjIIFcaOSrxQxOBIaqlwCE0SyKvauv0sQP7dEnoUKfY4YjaReq6QJGQ67ux7i0KfW8Lgyw"
                            />
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                By Juragan Live
                            </span>
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                            80%
                        </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-[#283039]">
                        <div className="h-full w-[80%] rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
