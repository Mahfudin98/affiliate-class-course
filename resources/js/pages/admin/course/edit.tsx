import { Head, useForm, usePage } from '@inertiajs/react';
import { Plus, Save } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import courses from '@/routes/courses';
import type { BreadcrumbItem } from '@/types';
import type { Course } from '@/types/course';
import type { DifficultyLevel, Topic } from '@/types/difficulty-topic';
import { ModuleSection } from './create';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Course Create',
        href: courses.index(),
    },
];

type VideoForm = {
    youtube_id: string;
    order_index: number;
    is_primary: boolean;
    notes: string;
    start_time: number | null;
    end_time: number | null;
};

type VideoInfo = VideoForm & {
    title?: string;
    thumbnail_url?: string;
    channel_name?: string;
    formatted_duration?: string;
};
type ModulesForm = {
    id?: number;
    title: string;
    description?: string;
    difficulty_level_id?: number;
    duration_minutes?: number;
    videos: VideoForm[];
};

type CourseForm = {
    title: string;
    description: string;
    thumbnail_url: string;
    difficulty_level_id: string;
    topic_id: string;
    duration_hours: string;
    is_new: boolean;
    modules: ModulesForm[];
    delete_old_structure?: boolean;
    delete_old_videos?: boolean;
};

interface PageProps {
    course_data: Course;
    topics: Topic[];
    difficulties: DifficultyLevel[];
    [key: string]: unknown;
}

interface VideoSearchResult {
    success: boolean;
    data?: {
        id: number;
        youtube_id: string;
        title: string;
        duration: string;
        thumbnail_url: string;
        view_count: string;
        channel_name: string;
    };
    error?: string;
}

export default function CourseEdit() {
    const { course_data, topics, difficulties } = usePage<PageProps>().props;

    const transformedModules: ModulesForm[] = course_data.modules.map(
        (module) => ({
            id: module.id,
            title: module.title,
            description: module.description ?? '',
            difficulty_level_id: module.difficulty_level_id ?? undefined,
            duration_minutes: module.duration_minutes ?? 0,
            videos: module.videos.map((video) => ({
                youtube_id: video.youtube_video.youtube_id,
                order_index: video.order_index,
                is_primary: video.is_primary,
                notes: video.notes ?? '',
                start_time: video.start_time ?? null,
                end_time: video.end_time ?? null,
            })),
        }),
    );

    const { data, setData, put, processing, errors } = useForm<CourseForm>({
        title: course_data.title,
        description: course_data.description,
        thumbnail_url: course_data.thumbnail_url,
        difficulty_level_id: String(course_data.difficulty_level_id),
        topic_id: String(course_data.topic_id),
        duration_hours: String(course_data.duration_hours),
        is_new: course_data.is_new,
        modules: transformedModules,

        delete_old_structure: false,
        delete_old_videos: false,
    });

    const [videoInfo, setVideoInfo] = useState<
        Record<string, VideoInfo | null>
    >({});
    const [searching, setSearching] = useState<Record<string, boolean>>({});

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        put(courses.update(course_data.id).url);
    };

    const addModule = () => {
        setData('modules', [
            ...data.modules,
            {
                title: '',
                description: '',
                difficulty_level_id: 0,
                duration_minutes: 0,
                videos: [
                    {
                        youtube_id: '',
                        order_index: 1,
                        is_primary: true,
                        notes: '',
                        start_time: null,
                        end_time: null,
                    },
                ],
            },
        ]);
    };
    const removeModule = (moduleIndex: number) => {
        setData(
            'modules',
            data.modules.filter((_, i) => i !== moduleIndex),
        );
    };
    const updateModule = (moduleIndex: number, key: string, value: unknown) => {
        const newModules = [...data.modules];
        newModules[moduleIndex] = {
            ...newModules[moduleIndex],
            [key]: value,
        };
        setData('modules', newModules);
    };

    const addVideo = (moduleIndex: number) => {
        const newModules = [...data.modules];
        const nextOrder = (newModules[moduleIndex].videos.length || 0) + 1;
        newModules[moduleIndex].videos.push({
            youtube_id: '',
            order_index: nextOrder,
            is_primary: false,
            notes: '',
            start_time: null,
            end_time: null,
        });
        setData('modules', newModules);
    };
    const removeVideo = (moduleIndex: number, videoIndex: number) => {
        const newModules = [...data.modules];
        newModules[moduleIndex].videos = newModules[moduleIndex].videos.filter(
            (_, i) => i !== videoIndex,
        );
        setData('modules', newModules);
    };
    const updateVideo = (
        moduleIndex: number,
        videoIndex: number,
        key: string,
        value: unknown,
    ) => {
        const newModules = [...data.modules];
        newModules[moduleIndex].videos[videoIndex] = {
            ...newModules[moduleIndex].videos[videoIndex],
            [key]: value,
        };
        setData('modules', newModules);
    };

    const searchYoutube = async (moduleIndex: number, videoIndex: number) => {
        const youtubeId =
            data.modules[moduleIndex].videos[videoIndex].youtube_id;

        const key = `${moduleIndex}-${videoIndex}`;

        if (!youtubeId) {
            alert('Please enter YouTube URL or ID');
            return;
        }

        setSearching((prev) => ({ ...prev, [key]: true }));

        try {
            const response = await fetch(courses.searchYoutube().url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') ?? '',
                },
                body: JSON.stringify({ q: youtubeId }),
            });

            // Handle HTTP error properly
            if (!response.ok) {
                const errorBody = await response.json().catch(() => null);
                throw new Error(
                    errorBody?.message || `Request failed (${response.status})`,
                );
            }

            const result: VideoSearchResult = await response.json();

            if (result.success && result.data) {
                const video = result.data;

                setVideoInfo((prev) => ({
                    ...prev,
                    [key]: {
                        youtube_id: video.youtube_id,
                        order_index:
                            data.modules[moduleIndex].videos[videoIndex]
                                .order_index,
                        is_primary:
                            data.modules[moduleIndex].videos[videoIndex]
                                .is_primary,
                        notes: data.modules[moduleIndex].videos[videoIndex]
                            .notes,
                        start_time:
                            data.modules[moduleIndex].videos[videoIndex]
                                .start_time,
                        end_time:
                            data.modules[moduleIndex].videos[videoIndex]
                                .end_time,
                        title: video.title,
                        thumbnail_url: video.thumbnail_url,
                        channel_name: video.channel_name,
                        formatted_duration: video.duration,
                    },
                }));

                updateVideo(
                    moduleIndex,
                    videoIndex,
                    'youtube_id',
                    video.youtube_id,
                );
            } else {
                throw new Error('Video not found');
            }
        } catch (error: Error | unknown) {
            console.error('Search error:', error);
            const message =
                error instanceof Error
                    ? error.message
                    : 'Error searching video';
            alert(message);
        } finally {
            setSearching((prev) => ({ ...prev, [key]: false }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Caourse Edit" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <FieldLegend>Tambah Course Baru</FieldLegend>
                        <FieldDescription>
                            Buat course baru dengan modules, lessons, dan
                            YouTube videos
                        </FieldDescription>
                        {/* <pre className="overflow-x-auto rounded-lg bg-gray-950 p-6 font-mono text-sm whitespace-pre-wrap text-gray-100 shadow-lg">
                            {JSON.stringify(course_data, null, 2)}
                        </pre> */}
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <FieldSet>
                                {/* Course Basic Info */}
                                <Field>
                                    <FieldLabel htmlFor="title">
                                        Judul Course
                                    </FieldLabel>
                                    <Input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        placeholder="Enter course title"
                                    />
                                    {errors.title && (
                                        <FieldError>{errors.title}</FieldError>
                                    )}
                                </Field>

                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="difficulty_level_id">
                                            Difficulty Level
                                        </FieldLabel>
                                        <Select
                                            value={data.difficulty_level_id}
                                            onValueChange={(value) =>
                                                setData(
                                                    'difficulty_level_id',
                                                    value,
                                                )
                                            }
                                        >
                                            <SelectTrigger id="difficulty_level_id">
                                                <SelectValue placeholder="Pilih Difficulty Level" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {difficulties.map((i) => (
                                                        <SelectItem
                                                            key={i.id}
                                                            value={String(i.id)}
                                                        >
                                                            {i.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.difficulty_level_id && (
                                            <FieldError>
                                                {errors.difficulty_level_id}
                                            </FieldError>
                                        )}
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="topic_id">
                                            Topik
                                        </FieldLabel>
                                        <Select
                                            value={data.topic_id}
                                            onValueChange={(value) =>
                                                setData('topic_id', value)
                                            }
                                        >
                                            <SelectTrigger id="topic_id">
                                                <SelectValue placeholder="Pilih Topik" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {topics.map((i) => (
                                                        <SelectItem
                                                            key={i.id}
                                                            value={String(i.id)}
                                                        >
                                                            {i.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {errors.topic_id && (
                                            <FieldError>
                                                {errors.topic_id}
                                            </FieldError>
                                        )}
                                    </Field>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="duration_hours">
                                            Duration (Hours)
                                        </FieldLabel>
                                        <Input
                                            id="duration_hours"
                                            type="number"
                                            step={0.1}
                                            min={0.1}
                                            value={data.duration_hours}
                                            onChange={(e) =>
                                                setData(
                                                    'duration_hours',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="2.5"
                                        />
                                        {errors.duration_hours && (
                                            <FieldError>
                                                {errors.duration_hours}
                                            </FieldError>
                                        )}
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="thumbnail_url">
                                            Thumbnail URL
                                        </FieldLabel>
                                        <Input
                                            id="thumbnail_url"
                                            type="url"
                                            value={data.thumbnail_url}
                                            onChange={(e) =>
                                                setData(
                                                    'thumbnail_url',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="https://..."
                                        />
                                        {errors.thumbnail_url && (
                                            <FieldError>
                                                {errors.thumbnail_url}
                                            </FieldError>
                                        )}
                                    </Field>
                                </div>

                                <Field>
                                    <FieldLabel htmlFor="description">
                                        Deskripsi
                                    </FieldLabel>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Deskripsi course..."
                                        rows={4}
                                    />
                                    {errors.description && (
                                        <FieldError>
                                            {errors.description}
                                        </FieldError>
                                    )}
                                </Field>

                                <Field orientation="horizontal">
                                    <Checkbox
                                        id="is_new"
                                        checked={data.is_new}
                                        onCheckedChange={(checked) =>
                                            setData('is_new', !!checked)
                                        }
                                    />
                                    <Label htmlFor="is_new">
                                        Mark as New Course
                                    </Label>
                                </Field>

                                <div className="mt-8 space-y-4 border-t pt-6">
                                    <div className="flex items-center justify-between">
                                        <FieldLegend>
                                            Modules & Video
                                        </FieldLegend>
                                        <Button
                                            type="button"
                                            onClick={addModule}
                                            className="border-blue-500 hover:border-blue-600"
                                            variant="outline"
                                        >
                                            <Plus className="size-4" />
                                            Add Module
                                        </Button>
                                    </div>

                                    {data.modules.map((module, moduleIndex) => (
                                        <ModuleSection
                                            key={moduleIndex}
                                            module={module}
                                            moduleIndex={moduleIndex}
                                            onUpdateModule={updateModule}
                                            onRemoveModule={removeModule}
                                            onAddVideo={addVideo}
                                            onRemoveVideo={removeVideo}
                                            onUpdateVideo={updateVideo}
                                            onSearchYoutube={searchYoutube}
                                            videoInfo={videoInfo}
                                            searching={searching}
                                            errors={errors}
                                            difficulties={difficulties}
                                        />
                                    ))}
                                </div>

                                <div className="mt-8 flex gap-2 border-t pt-6">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="gap-2"
                                    >
                                        <Save className="size-5" />
                                        Simpan Course
                                    </Button>
                                </div>
                            </FieldSet>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
