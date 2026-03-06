import { Head, Link, usePage } from '@inertiajs/react';
import { LibraryBig, RefreshCcwIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useFilters } from '@/hooks/use-filters';
import AffiliateLayoutTemplate from '@/layouts/affiliate-layout';
import kelas from '@/routes/kelas';
import type { Course } from '@/types/course';
import type { DifficultyLevel, Topic } from '@/types/difficulty-topic';

type Props = {
    topics: Topic[];
    difficulties: DifficultyLevel[];
    courses: Course[];
};

export default function KelasIndex() {
    const {
        topics,
        difficulties,
        courses: initialCourses,
    } = usePage<Props>().props;

    const {
        paginatedData: courses,
        toggleFilter,
        setSearch,
        search,
        page,
        totalPages,
        nextPage,
        prevPage,
        resetFilters,
        activeFilters,
    } = useFilters(initialCourses, {
        searchKey: 'title',
        pageSize: 6,
        filters: {
            difficulty: (c) => c.difficulty_level.name,
            topic: (c) => c.topic.name,
        },
    });

    return (
        <AffiliateLayoutTemplate>
            <Head title="Kelas" />
            <div className="mx-auto flex w-full max-w-8xl flex-1">
                <aside className="no-scrollbar sticky top-16.25 hidden h-[calc(100vh-65px)] w-72 flex-col overflow-y-auto border-r border-surface-dark p-8 lg:flex">
                    <h3 className="mb-8 text-xl font-bold text-white">
                        Filters
                    </h3>
                    <div className="mb-8">
                        <h4 className="mb-4 text-xs font-bold tracking-wider text-tiktok-cyan uppercase">
                            Difficulty
                        </h4>
                        <FieldGroup className="mx-auto w-56 gap-3">
                            {difficulties.map((i) => (
                                <Field
                                    key={i.id}
                                    orientation="horizontal"
                                    className="group cursor-pointer"
                                >
                                    <Checkbox
                                        id={i.name}
                                        name={i.name}
                                        checked={
                                            activeFilters.difficulty?.includes(
                                                i.name,
                                            ) ?? false
                                        }
                                        onCheckedChange={(checked) =>
                                            toggleFilter(
                                                'difficulty',
                                                i.name,
                                                !!checked,
                                            )
                                        }
                                    />
                                    <FieldLabel
                                        htmlFor={i.name}
                                        className="text-sm text-text-muted transition-colors group-hover:text-white"
                                    >
                                        {i.name}
                                    </FieldLabel>
                                </Field>
                            ))}
                        </FieldGroup>
                    </div>
                    <div className="mb-8">
                        <h4 className="mb-4 text-xs font-bold tracking-wider text-tiktok-pink uppercase">
                            Topic
                        </h4>
                        <FieldGroup className="mx-auto w-56 gap-3">
                            {topics.map((i) => (
                                <Field
                                    key={i.id}
                                    orientation="horizontal"
                                    className="group cursor-pointer"
                                >
                                    <Checkbox
                                        id={i.name}
                                        name={i.name}
                                        checked={
                                            activeFilters.topic?.includes(
                                                i.name,
                                            ) ?? false
                                        }
                                        onCheckedChange={(checked) =>
                                            toggleFilter(
                                                'topic',
                                                i.name,
                                                !!checked,
                                            )
                                        }
                                    />
                                    <FieldLabel
                                        htmlFor={i.name}
                                        className="text-sm text-text-muted transition-colors group-hover:text-white"
                                    >
                                        {i.name}
                                    </FieldLabel>
                                </Field>
                            ))}
                        </FieldGroup>
                    </div>
                    <div className="mb-8">
                        <h4 className="mb-4 text-xs font-bold tracking-wider text-gray-400 uppercase">
                            Duration
                        </h4>
                        <div className="flex flex-col gap-3">
                            <label className="group flex cursor-pointer items-center gap-3">
                                <input
                                    className="border-gray-700 bg-surface-dark text-tiktok-cyan focus:ring-tiktok-cyan"
                                    name="duration"
                                    type="radio"
                                />
                                <span className="text-sm text-text-muted transition-colors group-hover:text-white">
                                    &lt; 1 Hour
                                </span>
                            </label>
                            <label className="group flex cursor-pointer items-center gap-3">
                                <input
                                    className="border-gray-700 bg-surface-dark text-tiktok-cyan focus:ring-tiktok-cyan"
                                    name="duration"
                                    type="radio"
                                />
                                <span className="text-sm text-text-muted transition-colors group-hover:text-white">
                                    1 - 3 Hours
                                </span>
                            </label>
                            <label className="group flex cursor-pointer items-center gap-3">
                                <input
                                    className="border-gray-700 bg-surface-dark text-tiktok-cyan focus:ring-tiktok-cyan"
                                    name="duration"
                                    type="radio"
                                />
                                <span className="text-sm text-text-muted transition-colors group-hover:text-white">
                                    3+ Hours
                                </span>
                            </label>
                        </div>
                    </div>
                    <Button
                        onClick={resetFilters}
                        type="button"
                        className="w-full rounded-lg border border-gray-700 bg-surface-dark px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-700"
                    >
                        Reset Filters
                    </Button>
                </aside>
                <main className="flex-1 p-6 md:p-10">
                    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
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
                            <div className="relative flex-1 md:w-64">
                                <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-xl text-text-muted">
                                    search
                                </span>
                                <input
                                    className="w-full rounded-lg border-gray-700 bg-surface-dark py-2 pr-4 pl-10 text-sm text-white focus:border-tiktok-cyan focus:ring-tiktok-cyan"
                                    placeholder="Cari materi..."
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <CoursesCard key={course.id} course={course} />
                            ))
                        ) : (
                            <Empty className="col-span-12 h-full bg-muted/30">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <LibraryBig />
                                    </EmptyMedia>
                                    <EmptyTitle>No Notifications</EmptyTitle>
                                    <EmptyDescription className="max-w-xs text-pretty">
                                        You&apos;re all caught up. New
                                        notifications will appear here.
                                    </EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent>
                                    <Button variant="outline">
                                        <RefreshCcwIcon />
                                        Refresh
                                    </Button>
                                </EmptyContent>
                            </Empty>
                        )}
                    </div>
                    <div className="mt-16 flex items-center justify-center gap-2">
                        <button
                            disabled={page === 1}
                            onClick={prevPage}
                            className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${page === 1 ? 'cursor-not-allowed border-muted bg-muted text-text-muted' : 'cursor-pointer border-gray-700 bg-surface-dark text-text-muted hover:bg-gray-700'}`}
                        >
                            <span className="material-symbols-outlined">
                                chevron_left
                            </span>
                        </button>

                        <span className="px-3 text-white">
                            {page} / {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={nextPage}
                            className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${page === totalPages ? 'cursor-not-allowed border-muted bg-muted text-text-muted' : 'cursor-pointer border-gray-700 bg-surface-dark text-text-muted hover:bg-gray-700'}`}
                        >
                            <span className="material-symbols-outlined">
                                chevron_right
                            </span>
                        </button>
                    </div>
                </main>
            </div>
        </AffiliateLayoutTemplate>
    );
}

function CoursesCard({ course }: { course: Course }) {
    return (
        <Card className="relative mx-auto w-full max-w-sm overflow-hidden pt-0">
            <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
            <img
                src={course.thumbnail_url ?? 'https://avatar.vercel.sh/shadcn1'}
                alt="Event cover"
                className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
            />
            <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                    {course.description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Link href={kelas.show.course(course.id)} className="w-full">
                    <Button className="w-full text-white hover:text-white">
                        Mulai Belajar
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
