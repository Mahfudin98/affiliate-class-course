import { Head, Link, usePage } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { convertToTime } from '@/lib/utils';
import courses from '@/routes/courses';
import type { BreadcrumbItem } from '@/types';
import type { Course } from '@/types/course';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Course',
        href: courses.index(),
    },
];

type Props = {
    courses_data: Course[];
};

export default function Course() {
    const { courses_data } = usePage<Props>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Caourse" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="mb-2 text-3xl font-black text-white">
                            Katalog Kelas
                        </h1>
                        <p className="text-text-muted">
                            Temukan materi terbaik untuk meningkatkan
                            penghasilan TikTok kamu.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <InputGroup className="max-w-xs">
                            <InputGroupInput placeholder="Search..." />
                            <InputGroupAddon>
                                <Search />
                            </InputGroupAddon>
                            <InputGroupAddon align="inline-end">
                                12 results
                            </InputGroupAddon>
                        </InputGroup>
                        <Link href={courses.create()}>
                            <Button type="button">
                                <Plus className="size-5" />
                                Create
                            </Button>
                        </Link>
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-12 gap-4">
                    {courses_data.map((course) => (
                        <div className="col-span-12 md:col-span-6 lg:col-span-3">
                            <CardCourse key={course.id} course={course} />
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}

function CardCourse({ course }: { course: Course }) {
    return (
        <Card className="relative mx-auto w-full max-w-sm overflow-hidden pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src={
                    course.thumbnail_url ??
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuC0LqHjFtaPQK1efM51vMgWH_IS6fUK8S4k2c7qoUkCx-_Gh5IdBJpOkHBFOyLtrnhLyax3o2-Nt2VTdhC8SXVd1iz7b8rFCH9lkTeGgkFwowauJJYOAc_EBb4SVjzwi0mUjP-lk-OUqejkljnLVmmeO7p0uG9aPcn6_zpk75DyLcN8x0pt-lSogss9nvDBLwLqxJiyQnB4VuD30ozKMQ4piWeYQiKikuUTTR-evlRNzkex7JjLI-Nzg_kXysOnV4BDWyfd7SXy7Q'
                }
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover"
            />
            {course.is_new && (
                <Badge
                    variant={'outline'}
                    className="absolute top-3 right-3 z-30 border-green-600 text-green-400"
                >
                    New
                </Badge>
            )}

            <Badge variant="secondary" className="absolute top-3 left-3 z-30">
                {course.difficulty_level.name}
            </Badge>
            <CardHeader>
                <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>
                    {course.module_count} Module •{' '}
                    {convertToTime(course.duration_hours)}
                </CardDescription>
                <div className="mt-auto">
                    <div
                        className={`mb-1.5 flex justify-between text-[10px] font-bold`}
                    >
                        <span>PROGRESS</span>
                        <span>{course.duration_hours}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-800">
                        <Progress value={course.duration_hours} />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Link href={courses.show(course.id)} className="w-full">
                    <Button className="w-full">Mulai Belajar</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
