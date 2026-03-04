import { Head, useForm, usePage } from '@inertiajs/react';
import { Plus, Save, Search, Trash2 } from 'lucide-react';
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
import type { DifficultyLevel, Topic } from '@/types/difficulty-topic';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Course Create',
        href: courses.create(),
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
    title: string;
    duration_minutes: number;
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
};

interface PageProps {
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
export default function CourseCreate() {
    const { topics, difficulties } = usePage<PageProps>().props;
    const { data, setData, post, processing, errors } = useForm<CourseForm>({
        title: '',
        description: '',
        thumbnail_url: '',
        difficulty_level_id: '',
        topic_id: '',
        duration_hours: '',
        is_new: true,
        modules: [
            {
                title: '',
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
        ],
    });

    const [videoInfo, setVideoInfo] = useState<
        Record<string, VideoInfo | null>
    >({});
    const [searching, setSearching] = useState<Record<string, boolean>>({});

    const submit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        post(courses.store().url);
    };

    const addModule = () => {
        setData('modules', [
            ...data.modules,
            {
                title: '',
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
            <Head title="Caourse Create" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <FieldLegend>Tambah Course Baru</FieldLegend>
                        <FieldDescription>
                            Buat course baru dengan modules, lessons, dan
                            YouTube videos
                        </FieldDescription>
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
                                        onChange={(checked) =>
                                            setData('is_new', checked)
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

type ModuleSectionProps = {
    module: ModulesForm;
    moduleIndex: number;
    onUpdateModule: (index: number, key: string, value: unknown) => void;
    onRemoveModule: (index: number) => void;
    onAddVideo: (moduleIndex: number) => void;
    onRemoveVideo: (moduleIndex: number, videoIndex: number) => void;
    onUpdateVideo: (
        moduleIndex: number,
        videoIndex: number,
        key: string,
        value: unknown,
    ) => void;
    onSearchYoutube: (moduleIndex: number, videoIndex: number) => Promise<void>;
    videoInfo: Record<string, VideoInfo | null>;
    searching: Record<string, boolean>;
    errors: Record<string, any>;
};

function ModuleSection({
    module,
    moduleIndex,
    onUpdateModule,
    onRemoveModule,
    onAddVideo,
    onRemoveVideo,
    onUpdateVideo,
    onSearchYoutube,
    videoInfo,
    searching,
    errors,
}: ModuleSectionProps) {
    return (
        <Card className="border-l-4 border-l-blue-500">
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-end gap-4">
                        <Field className="flex-1">
                            <FieldLabel htmlFor={`module-title-${moduleIndex}`}>
                                Module Title
                            </FieldLabel>
                            <Input
                                id={`module-title-${moduleIndex}`}
                                type="text"
                                value={module.title}
                                onChange={(e) =>
                                    onUpdateModule(
                                        moduleIndex,
                                        'title',
                                        e.target.value,
                                    )
                                }
                                placeholder="Module 1: Introduction"
                            />
                        </Field>
                        <Field className="w-32">
                            <FieldLabel
                                htmlFor={`module-duration-${moduleIndex}`}
                            >
                                Duration (min)
                            </FieldLabel>
                            <Input
                                id={`module-duration-${moduleIndex}`}
                                type="number"
                                min={0}
                                value={module.duration_minutes}
                                onChange={(e) =>
                                    onUpdateModule(
                                        moduleIndex,
                                        'duration_minutes',
                                        parseInt(e.target.value) || 0,
                                    )
                                }
                            />
                        </Field>
                        <div className="flex items-end">
                            <Button
                                type="button"
                                onClick={() => onRemoveModule(moduleIndex)}
                                variant="destructive"
                                size="sm"
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-3 border-t pt-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">
                                Videos
                            </Label>
                            <Button
                                type="button"
                                onClick={() => onAddVideo(moduleIndex)}
                                variant="outline"
                                size="sm"
                                className="border-amber-500 hover:border-amber-600"
                            >
                                <Plus className="size-3" />
                                Add Video
                            </Button>
                        </div>
                        {module.videos.map((video, videoIndex) => (
                            <VideoSection
                                key={videoIndex}
                                video={video}
                                moduleIndex={moduleIndex}
                                videoIndex={videoIndex}
                                onRemoveVideo={onRemoveVideo}
                                onUpdateVideo={onUpdateVideo}
                                onSearchYoutube={onSearchYoutube}
                                videoInfo={videoInfo}
                                searching={searching}
                            />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

// Video Section Component
function VideoSection({
    video,
    moduleIndex,
    videoIndex,
    onRemoveVideo,
    onUpdateVideo,
    onSearchYoutube,
    videoInfo,
    searching,
}: {
    video: VideoForm;
    moduleIndex: number;
    videoIndex: number;
    onRemoveVideo: (moduleIndex: number, videoIndex: number) => void;
    onUpdateVideo: (
        moduleIndex: number,
        videoIndex: number,
        key: string,
        value: unknown,
    ) => void;
    onSearchYoutube: (moduleIndex: number, videoIndex: number) => Promise<void>;
    videoInfo: Record<string, VideoInfo | null>;
    searching: Record<string, boolean>;
}) {
    const infoKey = `${moduleIndex}-${videoIndex}`;
    const info = videoInfo[infoKey];
    const isSearching = searching[infoKey] || false;

    return (
        <Card className="border-l-4 border-l-amber-500">
            <CardContent className="pt-4">
                <div className="space-y-3">
                    {/* YouTube Search */}
                    <Field>
                        <FieldLabel htmlFor={`video-youtube-${infoKey}`}>
                            YouTube URL or ID
                        </FieldLabel>
                        <div className="flex gap-2">
                            <Input
                                id={`video-youtube-${infoKey}`}
                                type="text"
                                value={video.youtube_id}
                                onChange={(e) =>
                                    onUpdateVideo(
                                        moduleIndex,
                                        videoIndex,
                                        'youtube_id',
                                        e.target.value,
                                    )
                                }
                                placeholder="https://youtube.com/watch?v=... or dQw4w9WgXcQ"
                            />
                            <Button
                                type="button"
                                onClick={() =>
                                    onSearchYoutube(moduleIndex, videoIndex)
                                }
                                disabled={isSearching}
                                className="gap-1"
                            >
                                <Search className="size-4" />
                                {isSearching ? 'Searching...' : 'Search'}
                            </Button>
                            <Button
                                type="button"
                                onClick={() =>
                                    onRemoveVideo(moduleIndex, videoIndex)
                                }
                                variant="destructive"
                                size="sm"
                            >
                                <Trash2 className="size-4" />
                            </Button>
                        </div>
                    </Field>

                    {/* Video Info Preview */}
                    {info && (
                        <div className="rounded-lg border border-gray-200 bg-background p-3">
                            <div className="flex gap-3">
                                {info.thumbnail_url && (
                                    <img
                                        src={info.thumbnail_url}
                                        alt={info.title}
                                        className="h-16 w-24 rounded object-cover"
                                    />
                                )}
                                <div className="flex-1">
                                    <p className="text-sm font-semibold">
                                        {info.title}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        {info.channel_name} •{' '}
                                        {info.formatted_duration}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Video Settings */}
                    <div className="grid grid-cols-2 gap-3">
                        <Field>
                            <FieldLabel htmlFor={`video-order-${infoKey}`}>
                                Order
                            </FieldLabel>
                            <Input
                                id={`video-order-${infoKey}`}
                                type="number"
                                min={1}
                                value={video.order_index}
                                onChange={(e) =>
                                    onUpdateVideo(
                                        moduleIndex,
                                        videoIndex,
                                        'order_index',
                                        parseInt(e.target.value) || 1,
                                    )
                                }
                            />
                        </Field>
                        <Field>
                            <Label
                                className="text-xs"
                                htmlFor={`video-primary-${infoKey}`}
                            >
                                Primary
                            </Label>
                            <div className="flex items-center gap-2 pt-2">
                                <Checkbox
                                    id={`video-primary-${infoKey}`}
                                    checked={video.is_primary}
                                    onChange={(checked) =>
                                        onUpdateVideo(
                                            moduleIndex,
                                            videoIndex,
                                            'is_primary',
                                            checked,
                                        )
                                    }
                                />
                                <Label
                                    htmlFor={`video-primary-${infoKey}`}
                                    className="text-xs"
                                >
                                    Mark as primary
                                </Label>
                            </div>
                        </Field>
                    </div>

                    {/* Trim Settings */}
                    <div className="grid grid-cols-2 gap-3">
                        <Field>
                            <FieldLabel htmlFor={`video-start-${infoKey}`}>
                                Start Time (sec)
                            </FieldLabel>
                            <Input
                                id={`video-start-${infoKey}`}
                                type="number"
                                min={0}
                                value={video.start_time || ''}
                                onChange={(e) =>
                                    onUpdateVideo(
                                        moduleIndex,
                                        videoIndex,
                                        'start_time',
                                        e.target.value
                                            ? parseInt(e.target.value)
                                            : null,
                                    )
                                }
                                placeholder="0"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor={`video-end-${infoKey}`}>
                                End Time (sec)
                            </FieldLabel>
                            <Input
                                id={`video-end-${infoKey}`}
                                type="number"
                                min={0}
                                value={video.end_time || ''}
                                onChange={(e) =>
                                    onUpdateVideo(
                                        moduleIndex,
                                        videoIndex,
                                        'end_time',
                                        e.target.value
                                            ? parseInt(e.target.value)
                                            : null,
                                    )
                                }
                                placeholder="Leave empty for full"
                            />
                        </Field>
                    </div>

                    {/* Notes */}
                    <Field>
                        <FieldLabel htmlFor={`video-notes-${infoKey}`}>
                            Notes
                        </FieldLabel>
                        <Textarea
                            id={`video-notes-${infoKey}`}
                            value={video.notes}
                            onChange={(e) =>
                                onUpdateVideo(
                                    moduleIndex,
                                    videoIndex,
                                    'notes',
                                    e.target.value,
                                )
                            }
                            placeholder="Notes about this video..."
                            rows={2}
                        />
                    </Field>
                </div>
            </CardContent>
        </Card>
    );
}
