import { Head, Link, usePage } from '@inertiajs/react';
import { EllipsisVertical, PenIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { Progress } from '@/components/ui/progress';
import AppLayout from '@/layouts/app-layout';
import courses from '@/routes/courses';
import type { BreadcrumbItem } from '@/types';
import type { Course, Module } from '@/types/course';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Course Detail',
        href: courses.show(1),
    },
];

type Props = {
    course_data: Course;
};

export default function CourseDetail() {
    const { course_data } = usePage<Props>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Course Detail" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative max-h-44 flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
                <div className="flex w-full gap-6">
                    <div className="flex w-full flex-col gap-3">
                        <div className="flex w-full items-center justify-between">
                            <CardTitle className="text-xl">
                                Daftar Module Video
                            </CardTitle>
                            <Link href={courses.edit(course_data.id)}>
                                <Button size={'icon'}>
                                    <PenIcon className="size-5" />
                                </Button>
                            </Link>
                        </div>
                        {course_data.modules.map((module) => (
                            <CardModule key={module.id} module={module} />
                        ))}
                    </div>
                    <div className="h-full w-3/6 space-y-3">
                        <CardTitle className="text-xl">File Materi</CardTitle>
                        <div className="relative h-40 flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function CardModule({ module }: { module: Module }) {
    function getTotalVideoDuration(videos: any[]) {
        const totalSeconds = videos.reduce((total, item) => {
            return total + (item.youtube_video?.duration_seconds ?? 0);
        }, 0);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);

        if (hours && minutes) return `${hours} jam ${minutes} menit`;
        if (hours) return `${hours} jam`;
        return `${minutes} menit`;
    }
    return (
        <Card className="relative">
            <div className="absolute top-4 right-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size={'icon'} variant={'ghost'}>
                            <EllipsisVertical className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Action</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href={courses.module.show(module.id)}>
                                    Show Module
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <CardHeader>
                <div className="flex flex-col items-center gap-4 lg:flex-row">
                    <img
                        src={module.videos[0]?.youtube_video?.thumbnail_url}
                        alt=""
                        className="h-40 rounded-lg object-center"
                    />
                    <div className="space-y-1">
                        <CardTitle className="text-xl">
                            {module.title}
                        </CardTitle>
                        <CardDescription>
                            <p className="line-clamp-2">
                                {module.videos[0]?.youtube_video?.description}
                            </p>
                        </CardDescription>
                        <CardTitle className="text-xs">
                            Total Video {module.videos.length} • Durasi{' '}
                            {getTotalVideoDuration(module.videos)}
                        </CardTitle>
                        <div className="mt-auto">
                            <div
                                className={`mb-1.5 flex justify-between text-[10px] font-bold`}
                            >
                                <span>PROGRESS</span>
                                <span>{module.duration_minutes}%</span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                                <Progress value={module.duration_minutes} />
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>
        </Card>
    );
}
